import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calculator, Lock, Sparkles } from 'lucide-react';
import { saveNumerologyInput } from '../../lib/storage';
import { hasErrors, validateNumerologyForm, type FieldErrors } from '../../lib/validation';
import { todayISO } from '../../lib/timezone';
import { Button } from '../ui/Button';
import { FormField, TextInput } from './FormField';

export function NumerologyForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const summaryRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateNumerologyForm({ firstName, lastName, birthDate });
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    saveNumerologyInput({ firstName: firstName.trim(), lastName: lastName.trim(), birthDate });
    navigate('/resultats/numerologie');
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
        <FormField
          id="num-firstname"
          label="Prénom(s) de naissance"
          error={errors.firstName}
          hint="Indiquez tous les prénoms de l’acte de naissance, dans l’ordre."
        >
          <TextInput
            id="num-firstname"
            name="firstName"
            autoComplete="given-name"
            placeholder="Camille Marie"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={Boolean(errors.firstName)}
          />
        </FormField>
        <FormField
          id="num-lastname"
          label="Nom de famille de naissance"
          error={errors.lastName}
          hint="Nom de jeune fille ou premier patronyme légal, sans nom d’usage."
        >
          <TextInput
            id="num-lastname"
            name="lastName"
            autoComplete="family-name"
            placeholder="Dupont"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            error={Boolean(errors.lastName)}
          />
        </FormField>
      </div>

      <FormField
        id="num-birthdate"
        label="Date de naissance"
        error={errors.birthDate}
        hint="Jour, mois et année grégoriens. L’heure et le lieu ne sont pas nécessaires."
      >
        <TextInput
          id="num-birthdate"
          name="birthDate"
          type="date"
          min="1900-01-01"
          max={todayISO()}
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          error={Boolean(errors.birthDate)}
        />
      </FormField>

      <div className="rounded-xl border border-gold/70 bg-surface-container-low p-4 text-[0.76rem] leading-relaxed text-on-surface-variant">
        La méthode retenue est la numérologie pythagoricienne : A=1 à I=9, J=1 à R=9, S=1 à Z=8.
        Les nombres maîtres 11, 22 et 33 sont conservés. Le détail des calculs est affiché dans vos
        résultats.
      </div>

      <Button type="submit" size="lg" full>
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Calculer mes nombres
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      <p className="flex items-start justify-center gap-2 text-center text-[0.7rem] leading-relaxed text-outline">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
        Aucune base de données : vos nom, prénoms et date restent dans votre navigateur.
      </p>
      <div className="flex items-center justify-center gap-1.5 text-[0.7rem] text-secondary">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Gratuit, sans création de compte
      </div>
    </form>
  );
}
