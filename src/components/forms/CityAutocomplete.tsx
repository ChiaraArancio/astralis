import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, LocateFixed, MapPin, Search, Settings2 } from 'lucide-react';
import {
  cityToPlace,
  formatCoordinates,
  placeLabel,
  searchCities,
  type BirthPlace,
  type City,
} from '../../lib/geo';
import { formatOffsetForDate } from '../../lib/timezone';
import { validatePlace } from '../../lib/validation';
import { cn } from '../../lib/cn';
import { FormField } from './FormField';
import { Button } from '../ui/Button';

interface Props {
  id: string;
  value: BirthPlace | null;
  onChange: (place: BirthPlace | null) => void;
  error?: string;
  birthDate?: string;
  birthTime?: string;
  timeKnown?: boolean;
}

export function CityAutocomplete({
  id,
  value,
  onChange,
  error,
  birthDate,
  birthTime,
  timeKnown = true,
}: Props) {
  const listId = useId();
  const [query, setQuery] = useState(value ? placeLabel(value) : '');
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [manualOpen, setManualOpen] = useState(false);
  const [remoteFailed, setRemoteFailed] = useState(false);
  const [manualError, setManualError] = useState<string | null>(null);
  const [manual, setManual] = useState({
    name: value?.name ?? '',
    latitude: value ? String(value.latitude) : '',
    longitude: value ? String(value.longitude) : '',
    timezone: value?.timezone ?? '',
  });
  const abortRef = useRef<AbortController | null>(null);
  const skipNextSearch = useRef(false);

  useEffect(() => {
    if (value) {
      const label = placeLabel(value);
      setQuery(label);
      skipNextSearch.current = true;
      setManual({
        name: value.name,
        latitude: String(value.latitude),
        longitude: String(value.longitude),
        timezone: value.timezone,
      });
    }
  }, [value]);

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    if (value && query === placeLabel(value)) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;
    setLoading(true);
    setRemoteFailed(false);
    const timer = window.setTimeout(async () => {
      try {
        const cities = await searchCities(query, controller.signal);
        setResults(cities);
        setActiveIndex(-1);
        setOpen(true);
      } catch (searchError) {
        if (searchError instanceof DOMException && searchError.name === 'AbortError') return;
        setResults([]);
        setRemoteFailed(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 320);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, value]);

  function selectCity(city: City) {
    skipNextSearch.current = true;
    setQuery(placeLabel(cityToPlace(city)));
    onChange(cityToPlace(city));
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && open && activeIndex >= 0) {
      event.preventDefault();
      const city = results[activeIndex];
      if (city) selectCity(city);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function applyManual() {
    const latitude = Number(manual.latitude.replace(',', '.'));
    const longitude = Number(manual.longitude.replace(',', '.'));
    const place: BirthPlace = {
      name: manual.name.trim() || query.trim(),
      country: '',
      latitude,
      longitude,
      timezone: manual.timezone.trim(),
    };
    const manualValidation = validatePlace(place);
    if (manualValidation) {
      setManualError(manualValidation);
      return;
    }
    setManualError(null);
    onChange(place);
    setManualOpen(false);
  }

  const offset =
    value && birthDate && (timeKnown ? birthTime : '00:00')
      ? formatOffsetForDate(birthDate, timeKnown ? birthTime ?? '00:00' : '00:00', value.timezone)
      : null;

  return (
    <div className="flex flex-col gap-2">
      <FormField
        id={id}
        label="Ville et pays de naissance"
        error={error}
        hint="Commencez à taper : la recherche locale est complétée par Open-Meteo. Seule la ville saisie est transmise."
      >
        <div className="relative">
          <MapPin
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary/70"
          />
          <input
            id={id}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
            }
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${id}-error` : `${id}-hint`}
            autoComplete="off"
            value={query}
            placeholder="Ex. Lyon, France"
            className="field-input pl-9 pr-10"
            onChange={(event) => {
              const next = event.target.value;
              setQuery(next);
              if (value) onChange(null);
              setOpen(next.trim().length >= 2);
            }}
            onFocus={() => {
              if (query.trim().length >= 2 && !value) setOpen(true);
            }}
            onBlur={() => window.setTimeout(() => setOpen(false), 150)}
            onKeyDown={handleKeyDown}
          />
          {loading ? (
            <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border border-secondary/30 border-t-secondary" aria-hidden="true" />
          ) : (
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" aria-hidden="true" />
          )}

          {open ? (
            <div
              id={listId}
              role="listbox"
              aria-label="Villes suggérées"
              className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-30 max-h-72 overflow-y-auto rounded-xl border border-primary/10 bg-white p-1.5 shadow-ethereal-lg"
            >
              {results.length === 0 && !loading ? (
                <div className="px-3 py-4 text-[0.8rem] text-on-surface-variant">
                  {remoteFailed
                    ? 'La recherche en ligne est indisponible. Essayez un grand nom de ville ou saisissez les coordonnées manuellement.'
                    : 'Aucune ville trouvée. Essayez un autre nom ou saisissez les coordonnées manuellement.'}
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setOpen(false);
                      setManualOpen(true);
                      setManual((current) => ({ ...current, name: query.trim() }));
                    }}
                    className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-semibold text-secondary underline underline-offset-2"
                  >
                    <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Saisir les coordonnées manuellement
                  </button>
                </div>
              ) : (
                results.map((city, index) => (
                  <button
                    key={city.id}
                    id={`${listId}-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectCity(city)}
                    className={cn(
                      'flex w-full items-start justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                      index === activeIndex ? 'bg-surface-container' : 'hover:bg-surface-container-low',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[0.85rem] font-medium text-primary">
                        {city.name}
                      </span>
                      <span className="block truncate text-[0.72rem] text-on-surface-variant">
                        {[city.admin1, city.country].filter(Boolean).join(', ')} · {city.timezone}
                      </span>
                    </span>
                    {city.source === 'open-meteo' ? (
                      <span className="shrink-0 rounded-full bg-tertiary-fixed px-1.5 py-0.5 text-[0.58rem] uppercase tracking-[0.08em] text-on-secondary-container">
                        en ligne
                      </span>
                    ) : null}
                    {value && placeLabel(value) === placeLabel(cityToPlace(city)) ? (
                      <Check className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                    ) : null}
                  </button>
                ))
              )}
            </div>
          ) : null}
        </div>
      </FormField>

      {value ? (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] text-on-surface-variant">
          <span className="inline-flex items-center gap-1.5">
            <LocateFixed className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
            {formatCoordinates(value)}
          </span>
          <span className="h-3 w-px bg-outline-variant" aria-hidden="true" />
          <span>
            {value.timezone}
            {offset ? ` (${offset})` : ''}
          </span>
        </p>
      ) : null}

      <div>
        <button
          type="button"
          onClick={() => setManualOpen((current) => !current)}
          className="inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-secondary underline underline-offset-2 hover:text-primary"
          aria-expanded={manualOpen}
        >
          <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
          {manualOpen ? 'Masquer la saisie manuelle' : 'Ma ville n’apparaît pas — saisir les coordonnées'}
        </button>
        {manualOpen ? (
          <div className="mt-3 rounded-xl border border-gold/70 bg-surface-container-low p-4">
            <p className="mb-3 text-[0.75rem] leading-relaxed text-on-surface-variant">
              Utilisez cette option si la recherche ne trouve pas votre commune. Vous pouvez obtenir
              les coordonnées et le fuseau sur une carte ou un atlas.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="flex flex-col gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-secondary">
                Nom du lieu
                <input
                  className="field-input"
                  value={manual.name}
                  onChange={(event) => setManual((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Ex. Saint-Rémy"
                />
              </label>
              <label className="flex flex-col gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-secondary">
                Latitude
                <input
                  className="field-input"
                  inputMode="decimal"
                  value={manual.latitude}
                  onChange={(event) => setManual((current) => ({ ...current, latitude: event.target.value }))}
                  placeholder="45.7640"
                />
              </label>
              <label className="flex flex-col gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-secondary">
                Longitude
                <input
                  className="field-input"
                  inputMode="decimal"
                  value={manual.longitude}
                  onChange={(event) => setManual((current) => ({ ...current, longitude: event.target.value }))}
                  placeholder="4.8357"
                />
              </label>
            </div>
            <label className="mt-3 flex flex-col gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-secondary">
              Fuseau horaire IANA
              <input
                className="field-input"
                value={manual.timezone}
                onChange={(event) => setManual((current) => ({ ...current, timezone: event.target.value }))}
                placeholder="Europe/Paris"
              />
            </label>
            {manualError ? (
              <p className="field-error" role="alert">
                {manualError}
              </p>
            ) : null}
            <div className="mt-3 flex justify-end">
              <Button size="sm" variant="secondary" onClick={applyManual}>
                Utiliser ces coordonnées
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
