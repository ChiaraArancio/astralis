import type { BirthPlace } from './geo';
import { isValidBirthDate, parseClock } from './timezone';

export type FieldErrors = Record<string, string>;

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;

export function isValidName(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 2 && trimmed.length <= 80 && NAME_PATTERN.test(trimmed);
}

export function validateFirstName(value: string): string | null {
  if (!value.trim()) return 'Indiquez votre prénom.';
  if (!isValidName(value)) {
    return 'Le prénom doit contenir au moins 2 lettres et ne pas comporter de chiffres.';
  }
  return null;
}

export function validateLastName(value: string): string | null {
  if (!value.trim()) return 'Indiquez votre nom de famille de naissance.';
  if (!isValidName(value)) {
    return 'Le nom doit contenir au moins 2 lettres et ne pas comporter de chiffres.';
  }
  return null;
}

export function validateBirthDate(value: string): string | null {
  if (!value) return 'Indiquez votre date de naissance.';
  if (!isValidBirthDate(value)) {
    return 'La date doit être valide, postérieure au 1er janvier 1900 et ne pas être dans le futur.';
  }
  return null;
}

export function validateTime(value: string, required = true): string | null {
  if (!value.trim()) {
    return required ? 'Indiquez votre heure de naissance.' : null;
  }
  if (!parseClock(value)) return 'Utilisez le format HH:MM (par exemple 18:42).';
  return null;
}

export function validatePlace(place: BirthPlace | null | undefined): string | null {
  if (!place) return 'Sélectionnez votre ville de naissance dans la liste.';
  if (
    !Number.isFinite(place.latitude) ||
    !Number.isFinite(place.longitude) ||
    Math.abs(place.latitude) > 90 ||
    Math.abs(place.longitude) > 180
  ) {
    return 'Les coordonnées du lieu sont invalides.';
  }
  try {
    new Intl.DateTimeFormat('fr-FR', { timeZone: place.timezone });
  } catch {
    return 'Le fuseau horaire du lieu est invalide.';
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const email = value.trim();
  if (!email) return 'Indiquez votre adresse e-mail.';
  if (email.length > 254) return 'Cette adresse e-mail est trop longue.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return 'Cette adresse e-mail ne semble pas valide.';
  }
  return null;
}

export interface NumerologyFormValues {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export function validateNumerologyForm(values: NumerologyFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const firstName = validateFirstName(values.firstName);
  if (firstName) errors.firstName = firstName;
  const lastName = validateLastName(values.lastName);
  if (lastName) errors.lastName = lastName;
  const birthDate = validateBirthDate(values.birthDate);
  if (birthDate) errors.birthDate = birthDate;
  return errors;
}

export interface AstrologyFormValues {
  firstName: string;
  birthDate: string;
  birthTime: string;
  timeKnown: boolean;
  place: BirthPlace | null;
}

export function validateAstrologyForm(values: AstrologyFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const firstName = validateFirstName(values.firstName);
  if (firstName) errors.firstName = firstName;
  const birthDate = validateBirthDate(values.birthDate);
  if (birthDate) errors.birthDate = birthDate;
  if (values.timeKnown) {
    const time = validateTime(values.birthTime, true);
    if (time) errors.birthTime = time;
  }
  const place = validatePlace(values.place);
  if (place) errors.place = place;
  return errors;
}

export interface HumanDesignFormValues {
  firstName: string;
  birthDate: string;
  birthTime: string;
  place: BirthPlace | null;
}

export function validateHumanDesignForm(values: HumanDesignFormValues): FieldErrors {
  const errors: FieldErrors = {};
  const firstName = validateFirstName(values.firstName);
  if (firstName) errors.firstName = firstName;
  const birthDate = validateBirthDate(values.birthDate);
  if (birthDate) errors.birthDate = birthDate;
  const time = validateTime(values.birthTime, true);
  if (time) errors.birthTime = time;
  const place = validatePlace(values.place);
  if (place) errors.place = place;
  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
