import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, ShieldCheck } from 'lucide-react';
import { NewsletterForm } from '../NewsletterForm';
import { Logo } from './Logo';
import { ArtDecoDivider } from '../ui/Ornaments';

const DISCIPLINES = [
  { to: '/theme-astral', label: 'Thème astral' },
  { to: '/numerologie', label: 'Numérologie' },
  { to: '/human-design', label: 'Human Design' },
];

const OFFERS = [
  { to: '/les-cours', label: 'Les cours & formations' },
  { to: '/les-cours', label: 'Analyses approfondies — bientôt' },
  { to: '/comprendre/astrologie', label: 'Comprendre l’astrologie' },
  { to: '/comprendre/numerologie', label: 'Comprendre la numérologie' },
  { to: '/comprendre/human-design', label: 'Comprendre le Human Design' },
];

const LEGAL = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/confidentialite', label: 'Politique de confidentialité' },
  { to: '/cgv', label: 'Conditions générales de vente' },
  { to: '/ethique', label: 'Éthique & méthodologie' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-primary/[0.07] bg-surface-container-low">
      <div className="container-astralis pb-8 pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-body text-on-surface-variant">
              La cartographie céleste et énergétique de votre être. Une approche architecturale,
              sereine et non fataliste de la connaissance de soi.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:astralis.spiritalite@gmail.com"
                aria-label="Écrire à Astralis"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/ethique"
                aria-label="Lire la charte éthique"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="text-[0.72rem] text-outline">Calculs locaux, sans base de données</span>
            </div>
            <a
              href="mailto:astralis.spiritalite@gmail.com"
              className="inline-flex items-center gap-2 text-small text-on-surface-variant transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-secondary" aria-hidden="true" />
              astralis.spiritalite@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-2">
            <h2 className="eyebrow text-primary">Disciplines</h2>
            <ul className="flex flex-col gap-2.5">
              {DISCIPLINES.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-small text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-3">
            <h2 className="eyebrow text-primary">Offres & formations</h2>
            <ul className="flex flex-col gap-2.5">
              {OFFERS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-small text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-3">
            <h2 className="eyebrow text-primary">Newsletter & réflexions</h2>
            <p className="text-small text-on-surface-variant">
              Recevez nos éclairages symboliques et nos repères de méthode, au rythme des cycles.
            </p>
            <NewsletterForm compact />
            <Link
              to="/les-cours"
              className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
            >
              L’Académie Astralis arrive bientôt
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ArtDecoDivider className="my-8" />

        <div className="flex flex-col gap-4 text-[0.72rem] text-on-surface-variant md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </div>
          <p>© {year} Astralis. Tous droits réservés.</p>
        </div>
        <p className="mt-4 max-w-3xl text-[0.68rem] leading-relaxed text-outline">
          Astralis propose des outils de connaissance de soi et de réflexion symbolique. Les
          résultats ne constituent ni un diagnostic médical ou psychologique, ni une prédiction, ni
          un conseil financier ou juridique.
        </p>
      </div>
    </footer>
  );
}
