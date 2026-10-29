import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Calculator, Clock3, Lock, Sparkles } from 'lucide-react';
import { saveHumanDesignInput } from '../../lib/storage';
import { hasErrors, validateHumanDesignForm, type FieldErrors } from '../../lib/validation';
import type { BirthPlace } from '../../lib/geo';
import { todayISO } from '../../lib/timezone';
import { Button } from '../ui/Button';
import { CityAutocomplete } from './CityAutocomplete';
import { FormField, TextInput } from './FormField';

export function HumanDesignForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [place, setPlace] = useState<BirthPlace | null>(null);
  const [unknownTime, setUnknownTime] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const summaryRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (unknownTime) {
      setUnknownTime(true);
      return;
    }
    const nextErrors = validateHumanDesignForm({ firstName, birthDate, birthTime, place });
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    saveHumanDesignInput({
      firstName: firstName.trim(),
      birthDate,
      birthTime,
      place: place as BirthPlace,
    });
    navigate('/resultats/human-design');
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
        <FormField id="hd-firstname" label="Prénom ou référence" error={errors.firstName}>
          <TextInput
            id="hd-firstname"
            name="firstName"
            autoComplete="given-name"
            placeholder="Camille"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={Boolean(errors.firstName)}
          />
        </FormField>
        <FormField id="hd-birthdate" label="Date de naissance" error={errors.birthDate}>
          <TextInput
            id="hd-birthdate"
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

      <FormField
        id="hd-birthtime"
        label="Heure précise de naissance"
        error={errors.birthTime}
        hint="Heure civile de l’acte de naissance. Le calcul applique le fuseau historique du lieu."
      >
        <TextInput
          id="hd-birthtime"
          name="birthTime"
          type="time"
          step="60"
          value={birthTime}
          onChange={(event) => setBirthTime(event.target.value)}
          error={Boolean(errors.birthTime)}
        />
      </FormField>

      <CityAutocomplete
        id="hd-place"
        value={place}
        onChange={setPlace}
        error={errors.place}
        birthDate={birthDate}
        birthTime={birthTime}
      />

      <div className="rounded-xl border border-gold/70 bg-surface-container-low p-4">
        <div className="flex items-start gap-3">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <div className="text-[0.76rem] leading-relaxed text-on-surface-variant">
            <p>
              Le Human Design dépend de l’heure exacte : la Lune change de porte environ toutes les
              deux heures et les lignes de profil peuvent basculer.
            </p>
            <button
              type="button"
              onClick={() => setUnknownTime((value) => !value)}
              className="mt-2 inline-flex items-center gap-1.5 font-semibold text-secondary underline underline-offset-2 hover:text-primary"
              aria-expanded={unknownTime}
            >
              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Mon heure de naissance est inconnue
            </button>
            {unknownTime ? (
              <div className="mt-3 rounded-lg border border-secondary/20 bg-white p-3">
                <p>
                  Nous ne générons pas de BodyGraph approximatif : ce serait un résultat fictif.
                  Consultez votre acte de naissance (gratuit en mairie) ou votre carnet de santé. En
                  attendant, vous pouvez calculer un thème astral simplifié, qui indiquera clairement
                  ce qui reste fiable sans l’heure.
                </p>
                <Link
                  to="/theme-astral"
                  className="mt-2 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-secondary underline underline-offset-2 hover:text-primary"
                >
                  Calculer mon thème astral sans heure
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" full disabled={unknownTime}>
        <Calculator className="h-4 w-4" aria-hidden="true" />
        Révéler mon schéma corporel
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      <p className="flex items-start justify-center gap-2 text-center text-[0.7rem] leading-relaxed text-outline">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
        Calcul local, sans conservation de vos coordonnées de naissance.
      </p>
      <div className="flex items-center justify-center gap-1.5 text-[0.7rem] text-secondary">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Gratuit, sans création de compte
      </div>
    </form>
  );
}
