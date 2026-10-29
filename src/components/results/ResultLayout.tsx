import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock, Sparkles, Trash2 } from 'lucide-react';
import { buttonStyles } from '../ui/Button';
import { ComingSoonDialog } from '../ui/ComingSoonDialog';
import { type StoredDiscipline } from '../../lib/storage';
import { cn } from '../../lib/cn';

export function EmptyResult({
  discipline,
  formPath,
  label,
}: {
  discipline: string;
  formPath: string;
  label: string;
}) {
  return (
    <section className="container-astralis py-20 lg:py-28">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gold/70 bg-white p-8 text-center shadow-ethereal">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container text-secondary">
          <Sparkles className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="eyebrow text-secondary">Aucun calcul en mémoire</p>
        <h1 className="mt-3 text-h2 text-primary">Votre résultat {discipline} n’est pas disponible</h1>
        <p className="mt-3 text-body text-on-surface-variant">
          Pour des raisons de confidentialité, les données de naissance ne sont conservées que dans
          l’onglet courant, le temps d’afficher vos résultats. Commencez par remplir le formulaire.
        </p>
        <Link to={formPath} className={cn(buttonStyles({ size: 'lg' }), 'mt-6')}>
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ResultHero({
  eyebrow,
  title,
  summary,
  meta,
  onClear,
  formPath,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  meta?: ReactNode;
  onClear: () => void;
  formPath: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-primary/[0.06] bg-grain">
      <div className="container-astralis py-10 lg:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to={formPath}
            className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Modifier mes données
          </Link>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            Effacer mes données
          </button>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="eyebrow text-secondary">{eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-balance text-display text-primary">{title}</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">{summary}</p>
            {meta ? <div className="mt-5 flex flex-wrap items-center gap-2">{meta}</div> : null}
          </div>
          <div className="rounded-xl border border-gold/70 bg-white/75 p-4">
            <div className="flex items-start gap-2.5">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <p className="text-[0.72rem] leading-relaxed text-on-surface-variant">
                Ce résultat a été calculé localement dans votre navigateur. Il n’a pas été envoyé à
                Astralis. Fermer l’onglet efface les données de session.
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

export function learnPath(discipline: StoredDiscipline): string {
  if (discipline === 'astrology') return '/comprendre/astrologie';
  if (discipline === 'numerology') return '/comprendre/numerologie';
  return '/comprendre/human-design';
}

export function ResultsActions({
  discipline,
  disciplineLabel,
  formPath,
  premiumTitle,
  premiumContent,
}: {
  discipline: StoredDiscipline;
  disciplineLabel: string;
  formPath: string;
  premiumTitle: string;
  premiumContent: string[];
}) {
  return (
    <section className="border-t border-primary/[0.06] bg-surface-container-low">
      <div className="container-astralis py-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-secondary">Poursuivre la lecture</p>
          <h2 className="mt-3 text-h2 text-primary">Deux façons d’aller plus loin</h2>
          <p className="mx-auto mt-3 max-w-2xl text-body text-on-surface-variant">
            Comprenez les notions utilisées dans votre résultat, ou découvrez les analyses
            approfondies qui ouvriront prochainement — sans paiement simulé.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={learnPath(discipline)}
              className={buttonStyles({ size: 'lg' })}
            >
              <Sparkles className="h-4 w-4 text-tertiary-fixed" aria-hidden="true" />
              Comprendre mon profil
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <ComingSoonDialog
              eyebrow="Analyse approfondie"
              title={premiumTitle}
              description="Les analyses approfondies ne sont pas encore disponibles à la vente. Aucun paiement n’est ouvert et aucun document fictif n’est généré."
              trigger={(open) => (
                <button type="button" onClick={open} className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                  Approfondir mon analyse
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            >
              <ul className="space-y-2 text-small text-on-surface-variant">
                {premiumContent.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </ComingSoonDialog>
          </div>
          <p className="mt-5 text-[0.7rem] text-outline">
            Résultat {disciplineLabel} · outil de connaissance de soi, sans valeur prédictive.
          </p>
          <Link
            to={formPath}
            className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-secondary hover:text-primary"
          >
            Refaire un calcul
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function DisclosureNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-lg border border-gold/70 bg-surface-container-low p-4 text-[0.76rem] leading-relaxed text-on-surface-variant', className)}>
      {children}
    </div>
  );
}
