import { RAW_CITIES } from './cities';

export interface City {
  id: string;
  name: string;
  admin1: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population: number;
  source: 'local' | 'open-meteo';
}

export interface BirthPlace {
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

const countryNames = (() => {
  try {
    const display = new Intl.DisplayNames(['fr'], { type: 'region' });
    return (code: string) => {
      try {
        return display.of(code) || code;
      } catch {
        return code;
      }
    };
  } catch {
    return (code: string) => code;
  }
})();

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export const LOCAL_CITIES: City[] = RAW_CITIES.map(
  ([name, countryCode, admin1, latitude, longitude, timezone, population]) => ({
    id: `${name}-${countryCode}-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
    name,
    admin1,
    country: countryNames(countryCode),
    countryCode,
    latitude,
    longitude,
    timezone,
    population,
    source: 'local',
  }),
);

function score(city: City, query: string): number {
  const name = normalize(city.name);
  const country = normalize(city.country);
  const admin = normalize(city.admin1);
  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (name.split(' ').some((part) => part.startsWith(query))) return 2;
  if (country.startsWith(query) || admin.startsWith(query)) return 3;
  if (name.includes(query)) return 4;
  if (`${name} ${country}`.includes(query)) return 5;
  return 99;
}

export function searchLocalCities(query: string, limit = 8): City[] {
  const normalized = normalize(query);
  if (normalized.length < 2) return [];
  return LOCAL_CITIES.map((city) => ({ city, score: score(city, normalized) }))
    .filter((entry) => entry.score < 99)
    .sort((a, b) => a.score - b.score || b.city.population - a.city.population)
    .slice(0, limit)
    .map((entry) => entry.city);
}

interface OpenMeteoResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
  population?: number;
  id?: number;
}

interface OpenMeteoResponse {
  results?: OpenMeteoResult[];
}

/**
 * Complète la liste locale par l'API de géocodage Open-Meteo (gratuite, sans
 * clé). Seule la requête de ville est transmise : aucune donnée de naissance
 * n'est envoyée à ce service.
 */
export async function searchRemoteCities(
  query: string,
  signal?: AbortSignal,
): Promise<City[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.searchParams.set('name', trimmed);
  url.searchParams.set('count', '8');
  url.searchParams.set('language', 'fr');
  url.searchParams.set('format', 'json');

  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Géocodage indisponible (${response.status})`);
  const data = (await response.json()) as OpenMeteoResponse;
  return (data.results ?? [])
    .filter((result) => Number.isFinite(result.latitude) && Number.isFinite(result.longitude))
    .map((result) => {
      const code = result.country_code ?? '';
      return {
        id: `om-${result.id ?? `${result.latitude}-${result.longitude}`}`,
        name: result.name,
        admin1: result.admin1 ?? '',
        country: result.country || countryNames(code) || code,
        countryCode: code,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone || 'UTC',
        population: result.population ?? 0,
        source: 'open-meteo' as const,
      };
    });
}

export async function searchCities(query: string, signal?: AbortSignal): Promise<City[]> {
  const local = searchLocalCities(query, 6);
  if (local.length >= 4) return local;
  try {
    const remote = await searchRemoteCities(query, signal);
    const seen = new Set(local.map((city) => `${city.name}|${city.countryCode}`.toLowerCase()));
    return [...local, ...remote.filter((city) => !seen.has(`${city.name}|${city.countryCode}`.toLowerCase()))].slice(
      0,
      8,
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    return local;
  }
}

export function cityToPlace(city: City): BirthPlace {
  return {
    name: city.name,
    admin1: city.admin1 || undefined,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone,
  };
}

export function placeLabel(place: BirthPlace): string {
  return [place.name, place.admin1, place.country].filter(Boolean).join(', ');
}

export function formatCoordinates(place: BirthPlace): string {
  const lat = `${Math.abs(place.latitude).toFixed(4)}° ${place.latitude >= 0 ? 'N' : 'S'}`;
  const lng = `${Math.abs(place.longitude).toFixed(4)}° ${place.longitude >= 0 ? 'E' : 'O'}`;
  return `${lat}, ${lng}`;
}
