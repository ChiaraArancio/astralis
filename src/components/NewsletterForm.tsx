import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, Mail } from 'lucide-react';
import { subscribeToNewsletter } from '../lib/services/newsletter';
import { validateEmail } from '../lib/validation';
import { cn } from '../lib/cn';
import { Button } from './ui/Button';

export function NewsletterForm({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const statusId = useId();
  const liveRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      liveRef.current?.focus?.();
    }
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateEmail(email);
    if (validation) {
      setError(validation);
      setStatus('error');
      setMessage(validation);
      return;
    }
    setError(null);
    setStatus('loading');
    const result = await subscribeToNewsletter(email.trim());
    setStatus(result.ok ? 'success' : 'error');
    setMessage(result.message);
    if (result.ok) setEmail('');
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-2', className)} noValidate>
      <label htmlFor={compact ? 'newsletter-footer' : 'newsletter-page'} className="sr-only">
        Votre adresse e-mail
      </label>
      <div className="relative flex items-center">
        <Mail
          aria-hidden="true"
          className="pointer-events-none absolute left-3 h-4 w-4 text-secondary/70"
        />
        <input
          id={compact ? 'newsletter-footer' : 'newsletter-page'}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Votre adresse e-mail"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={message ? statusId : undefined}
          className="field-input min-h-[48px] pl-9 pr-[7.4rem]"
          disabled={status === 'loading'}
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1.5 top-1/2 min-h-[38px] -translate-y-1/2 px-3"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : status === 'success' ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            'Adhérer'
          )}
          <span className="sr-only">S’inscrire à la lettre d’information</span>
        </Button>
      </div>
      {message ? (
        <p
          ref={liveRef}
          id={statusId}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={cn(
            'text-[0.76rem] leading-relaxed outline-none',
            status === 'success' ? 'text-secondary' : 'text-[#93000a]',
          )}
        >
          {message}
        </p>
      ) : (
        <p className="text-[0.68rem] leading-relaxed text-outline">
          Lettre occasionnelle. Désabonnement en un clic. En vous inscrivant, vous acceptez la{' '}
          <Link to="/confidentialite" className="underline underline-offset-2 hover:text-secondary">
            politique de confidentialité
          </Link>
          .
        </p>
      )}
    </form>
  );
}
