import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buttonStyles } from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('Astralis — erreur de rendu', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="container-astralis flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <p className="eyebrow text-secondary">Erreur inattendue</p>
          <h1 className="mt-3 text-h2 text-primary">Une erreur est survenue</h1>
          <p className="mt-3 max-w-lg text-body text-on-surface-variant">
            Rechargez la page ou revenez à l’accueil. Aucune donnée de naissance n’a été envoyée à un
            serveur.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={buttonStyles()}
            >
              Recharger la page
            </button>
            <Link to="/" className={buttonStyles({ variant: 'secondary' })}>
              Retour à l’accueil
            </Link>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
