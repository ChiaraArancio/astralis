import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, UserRound } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button, buttonStyles } from '../ui/Button';
import { Logo } from './Logo';

const NAV = [
  { to: '/theme-astral', label: 'Thème Astral' },
  { to: '/numerologie', label: 'Numérologie' },
  { to: '/human-design', label: 'Human Design' },
  { to: '/les-cours', label: 'Les Cours' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/[0.06] bg-surface/90 backdrop-blur-xl">
      <div className="container-astralis flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-[0.84rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/mon-compte"
            className="rounded-lg px-3 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-primary transition-colors hover:bg-surface-container"
          >
            Mon compte
          </Link>
          <Link to="/#parcours" className={buttonStyles({ size: 'sm' })}>
            <Sparkles className="h-4 w-4 text-tertiary-fixed" aria-hidden="true" />
            Commencer l’expérience
          </Link>
          <Link
            to="/mon-compte"
            aria-label="Mon compte"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-surface transition-colors hover:bg-secondary"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="min-h-[44px] min-w-[44px] px-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-primary/10 bg-surface px-5 pb-8 pt-4 lg:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-3 text-[0.95rem] font-medium',
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'text-on-surface-variant hover:bg-surface-container',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/mon-compte"
            className="rounded-lg px-3 py-3 text-[0.95rem] font-medium text-on-surface-variant hover:bg-surface-container"
          >
            Mon compte
          </NavLink>
        </nav>
        <div className="mt-4 flex flex-col gap-3 border-t border-primary/10 pt-4">
          <Link to="/#parcours" className={buttonStyles({ full: true })}>
            <Sparkles className="h-4 w-4 text-tertiary-fixed" aria-hidden="true" />
            Commencer l’expérience
          </Link>
        </div>
      </div>
    </>
  );
}
