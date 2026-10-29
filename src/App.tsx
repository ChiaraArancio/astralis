import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './pages/HomePage';

const AstrologyPage = lazy(() => import('./pages/AstrologyPage').then((module) => ({ default: module.AstrologyPage })));
const NumerologyPage = lazy(() => import('./pages/NumerologyPage').then((module) => ({ default: module.NumerologyPage })));
const HumanDesignPage = lazy(() => import('./pages/HumanDesignPage').then((module) => ({ default: module.HumanDesignPage })));
const AstrologyResultPage = lazy(() =>
  import('./pages/AstrologyResultPage').then((module) => ({ default: module.AstrologyResultPage })),
);
const NumerologyResultPage = lazy(() =>
  import('./pages/NumerologyResultPage').then((module) => ({ default: module.NumerologyResultPage })),
);
const HumanDesignResultPage = lazy(() =>
  import('./pages/HumanDesignResultPage').then((module) => ({ default: module.HumanDesignResultPage })),
);
const LearnPage = lazy(() => import('./pages/LearnPage').then((module) => ({ default: module.LearnPage })));
const CoursesPage = lazy(() => import('./pages/CoursesPage').then((module) => ({ default: module.CoursesPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then((module) => ({ default: module.AccountPage })));
const MentionsPage = lazy(() => import('./pages/LegalPages').then((module) => ({ default: module.MentionsPage })));
const PrivacyPage = lazy(() => import('./pages/LegalPages').then((module) => ({ default: module.PrivacyPage })));
const CgvPage = lazy(() => import('./pages/LegalPages').then((module) => ({ default: module.CgvPage })));
const EthicsPage = lazy(() => import('./pages/LegalPages').then((module) => ({ default: module.EthicsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function PageLoader() {
  return (
    <div className="container-astralis flex min-h-[55vh] items-center justify-center py-20" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border border-secondary/25 border-t-secondary" aria-hidden="true" />
        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-secondary">Chargement</span>
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theme-astral" element={<AstrologyPage />} />
        <Route path="/numerologie" element={<NumerologyPage />} />
        <Route path="/human-design" element={<HumanDesignPage />} />
        <Route path="/resultats/theme-astral" element={<AstrologyResultPage />} />
        <Route path="/resultats/numerologie" element={<NumerologyResultPage />} />
        <Route path="/resultats/human-design" element={<HumanDesignResultPage />} />
        <Route path="/comprendre/:discipline" element={<LearnPage />} />
        <Route path="/les-cours" element={<CoursesPage />} />
        <Route path="/mon-compte" element={<AccountPage />} />
        <Route path="/mentions-legales" element={<MentionsPage />} />
        <Route path="/confidentialite" element={<PrivacyPage />} />
        <Route path="/cgv" element={<CgvPage />} />
        <Route path="/ethique" element={<EthicsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <Layout>
          <AppRoutes />
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
