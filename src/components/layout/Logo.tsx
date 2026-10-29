import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

export function Logo({
  className,
  tone = 'dark',
  withMark = true,
}: {
  className?: string;
  tone?: 'dark' | 'light';
  withMark?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-surface',
        className,
      )}
      aria-label="Astralis — accueil"
    >
      {withMark ? (
        <span
          aria-hidden="true"
          className={cn(
            'relative flex h-7 w-7 items-center justify-center',
            tone === 'light' ? 'text-surface' : 'text-secondary',
          )}
        >
          <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="0.9">
            <circle cx="14" cy="14" r="11.5" strokeDasharray="1 3" />
            <path d="M14 4.5l1.8 7.7 7.7 1.8-7.7 1.8-1.8 7.7-1.8-7.7L4.5 14l7.7-1.8L14 4.5z" />
            <circle cx="14" cy="14" r="1.6" fill="currentColor" stroke="none" />
          </svg>
        </span>
      ) : null}
      <span
        className={cn(
          'text-[1.02rem] font-semibold uppercase tracking-[0.3em] transition-colors',
          tone === 'light' ? 'text-surface' : 'text-primary',
          'group-hover:text-secondary',
        )}
      >
        Astralis
      </span>
    </Link>
  );
}
