import { Link } from 'react-router-dom';
import { Compass, Home, Sparkles } from 'lucide-react';
import { buttonStyles } from '../components/ui/Button';
import { usePageMeta } from '../lib/usePageMeta';

export function NotFoundPage() {
  usePageMeta('Page introuvable | Astralis', 'La page demandée n’existe pas ou a été déplacée.');
  return (
    <section className="container-astralis flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-surface-container-low text-secondary">
        <Compass className="h-7 w-7" aria-hidden="true" />
      </span>
      <p className="eyebrow mt-6 text-secondary">Erreur 404</p>
      <h1 className="mt-3 text-h2 text-primary">Cette page n’existe pas</h1>
      <p className="mt-3 max-w-lg text-body text-on-surface-variant">
        Le lien est peut-être ancien, ou l’adresse comporte une erreur. Revenez à l’accueil pour
        retrouver les trois parcours.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonStyles()}>
          <Home className="h-4 w-4" aria-hidden="true" />
          Retour à l’accueil
        </Link>
        <Link to="/#parcours" className={buttonStyles({ variant: 'secondary' })}>
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Voir les calculateurs
        </Link>
      </div>
    </section>
  );
}
