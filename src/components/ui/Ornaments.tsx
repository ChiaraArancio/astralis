import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function Eyebrow({
  children,
  className,
  tone = 'secondary',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'secondary' | 'primary' | 'light';
}) {
  return (
    <span
      className={cn(
        'eyebrow inline-flex items-center gap-2',
        tone === 'secondary' && 'text-secondary',
        tone === 'primary' && 'text-primary',
        tone === 'light' && 'text-surface/70',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ArtDecoDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-gold/30" />
      <span className="flex items-center gap-1.5">
        <span className="h-1 w-1 rotate-45 bg-secondary/50" />
        <span className="h-1.5 w-1.5 rotate-45 border border-secondary/60" />
        <span className="h-1 w-1 rotate-45 bg-secondary/50" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold to-gold/30" />
    </div>
  );
}

export function DiamondMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-4 w-4', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M12 2l10 10-10 10L2 12 12 2z" />
      <path d="M12 7l5 5-5 5-5-5 5-5z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function StarMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-4 w-4', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function Sunburst({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('h-16 w-16', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="22" />
      <circle cx="60" cy="60" r="30" strokeDasharray="1 4" />
      <circle cx="60" cy="60" r="44" strokeDasharray="1 5" />
      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const inner = index % 3 === 0 ? 32 : 38;
        const outer = 50;
        return (
          <line
            key={index}
            x1={60 + Math.cos(angle) * inner}
            y1={60 + Math.sin(angle) * inner}
            x2={60 + Math.cos(angle) * outer}
            y2={60 + Math.sin(angle) * outer}
          />
        );
      })}
    </svg>
  );
}

export function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn('h-16 w-16', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M2 50V2h48" />
      <path d="M10 42V10h32" strokeOpacity="0.6" />
      <path d="M18 34V18h16" strokeOpacity="0.35" />
      <circle cx="2" cy="50" r="1.5" fill="currentColor" />
      <circle cx="50" cy="2" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone === 'light' ? 'light' : 'secondary'}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          'max-w-3xl text-balance text-h2',
          tone === 'light' ? 'text-surface' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {intro ? (
        <div
          className={cn(
            'max-w-2xl text-pretty text-body',
            tone === 'light' ? 'text-surface/70' : 'text-on-surface-variant',
          )}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}

export function Pill({
  children,
  tone = 'cream',
  className,
}: {
  children: ReactNode;
  tone?: 'cream' | 'dark' | 'lavender' | 'gold' | 'outline';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em]',
        tone === 'cream' && 'bg-surface-container text-on-surface-variant',
        tone === 'dark' && 'bg-primary-container text-surface',
        tone === 'lavender' && 'bg-tertiary-fixed text-on-secondary-container',
        tone === 'gold' && 'bg-gold/50 text-secondary',
        tone === 'outline' && 'border border-outline-variant text-on-surface-variant',
        className,
      )}
    >
      {children}
    </span>
  );
}
