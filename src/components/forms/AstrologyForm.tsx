import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calculator, Clock3, Lock, Sparkles } from 'lucide-react';
import { saveAstrologyInput } from '../../lib/storage';
import { validateAstrologyForm, hasErrors, type FieldErrors } from '../../lib/validation';
import type { BirthPlace } from '../../lib/geo';
import { todayISO } from '../../lib/timezone';
import { Button } from '../ui/Button';
import { CityAutocomplete } from './CityAutocomplete';
import { TextInput, FormField, Checkbox } from './FormField';

export function AstrologyForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [timeKnown, setTimeKnown] = useState(true);
  const [place, setPlace] = useState<BirthPlace | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const summaryRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAstrologyForm({
      firstName,
      birthDate,
      birthTime,
      timeKnown,
      place,
    });
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      window.requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
      return;
    }
    saveAstrologyInput({
      firstName: firstName.trim(),
      birthDate,
      birthTime: timeKnown ? birthTime : undefined,
      timeKnown,
      place: place as BirthPlace,
    });
    navigate('/resultats/theme-astral');
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {hasErrors(errors) ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-error/25 bg-error-container px-4 py-3 text-[0.8rem] leading-relaxed text-on-error-container outline-none"
        >
          Certains champs demandent votre attention. Vérifiez les messages indiqués sous les champs.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="astro-firstname" label="Prénom" error={errors.firstName}>
          <TextInput
            id="astro-firstname"
            name="firstName"
            autoComplete="given-name"
            placeholder="Camille"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={Boolean(errors.firstName)}
          />
        </FormField>
        <FormField id="astro-birthdate" label="Date de naissance" error={errors.birthDate}>
          <TextInput
            id="astro-birthdate"
            name="birthDate"
            type="date"
            min="1900-01-01"
            max={todayISO()}
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            error={Boolean(errors.birthDate)}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="astro-birthtime"
          label="Heure de naissance"
          error={timeKnown ? errors.birthTime : undefined}
          hint={
            timeKnown
              ? 'Heure civile indiquée sur l’acte de naissance, fuseau du lieu appliqué automatiquement.'
              : 'Le calcul sera limité aux signes stables sur la journée. Aucun Ascendant ni maison ne sera produit.'
          }
        >
          <TextInput
            id="astro-birthtime"
            name="birthTime"
            type="time"
            step="60"
            value={birthTime}
            onChange={(event) => setBirthTime(event.target.value)}
            disabled={!timeKnown}
            error={timeKnown && Boolean(errors.birthTime)}
          />
        </FormField>
        <div className="flex items-end pb-1">
          <Checkbox
            id="astro-time-unknown"
            checked={!timeKnown}
            onChange={(checked) => setTimeKnown(!checked)}
            label="Je ne connais pas mon heure de naissance"
            description="Nous calculerons uniquement ce qui reste fiable sur la journée, sans inventer d’heure."
          />
        </div>
      </div>

      <CityAutocomplete
        id="astro-place"
        value={place}
        onChange={setPlace}
        error={errors.place}
        birthDate={birthDate}
        birthTime={birthTime}
        timeKnown={timeKnown}
      />

      <div className="rounded-xl border border-gold/70 bg-surface-container-low p-4">
        <div className="flex items-start gap-3">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <p className="text-[0.76rem] leading-relaxed text-on-surface-variant">
            {timeKnown
              ? 'Pour un thème complet, utilisez l’heure exacte et le lieu de naissance. Le système applique le fuseau historique et l’heure d’été du lieu.'
              : 'Sans heure, Astralis ne calcule ni Ascendant, ni Milieu du Ciel, ni maisons, ni aspects. Seuls les signes qui restent identiques toute la journée sont affichés.'}
          </p>
        </div>
      </div>

      <Button type="submit" size="lg" full>
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Calculer mon thème astral
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      <p className="flex items-start justify-center gap-2 text-center text-[0.7rem] leading-relaxed text-outline">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
        Calcul effectué dans votre navigateur. Les données sont conservées dans l’onglet le temps de
        consulter vos résultats, puis effaçables en un clic.
      </p>

      <div className="flex items-center justify-center gap-1.5 text-[0.7rem] text-secondary">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Gratuit, sans création de compte
      </div>
    </form>
  );
}
