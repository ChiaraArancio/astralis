import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function FormField({
  id,
  label,
  error,
  hint,
  children,
  className,
  optional,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
  optional?: boolean;
}) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? <span className="ml-1 font-normal normal-case tracking-normal text-outline">(facultatif)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.72rem] leading-relaxed text-outline">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn('field-input', className)}
      aria-invalid={error || undefined}
      aria-describedby={error ? `${props.id}-error` : undefined}
      {...props}
    />
  );
}

export function Checkbox({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 text-left">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-[1.5px] border-secondary bg-transparent transition-colors peer-checked:border-primary-container peer-checked:bg-primary-container peer-focus-visible:ring-2 peer-focus-visible:ring-lavender peer-focus-visible:ring-offset-2"
      >
        <svg viewBox="0 0 12 12" className={`h-3 w-3 text-lavender transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6.2 4.7 9 10 3.3" />
        </svg>
      </span>
      <span>
        <span className="block text-[0.85rem] font-medium leading-relaxed text-primary">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-[0.74rem] leading-relaxed text-on-surface-variant">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
