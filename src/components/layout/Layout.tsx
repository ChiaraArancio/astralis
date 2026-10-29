import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <a href="#main" className="skip-link">
        Aller au contenu principal
      </a>
      <Header />
      <main id="main" className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
