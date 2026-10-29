import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Infinity as InfinityIcon,
  Lock,
  Sparkles,
  Sun,
} from 'lucide-react';
import { ArtDecoDivider, CornerOrnament, DiamondMark, Pill, SectionHeading, StarMark } from '../components/ui/Ornaments';
import { buttonStyles } from '../components/ui/Button';
import { ComingSoonDialog } from '../components/ui/ComingSoonDialog';
import { usePageMeta } from '../lib/usePageMeta';

const PATHS = [
  {
    number: '01',
    kicker: 'Cosmos',
    title: 'Thème Astral',
    description:
      'La disposition précise du ciel au moment de votre naissance pour éclairer vos dynamiques intérieures, vos ressources et vos cycles.',
    to: '/theme-astral',
    cta: 'Découvrir mon thème astral',
    icon: 'sun',
  },
  {
    number: '02',
    kicker: 'Nombres',
    title: 'Numérologie',
    description:
      'Les vibrations de votre nom de naissance et de votre date, lues selon la méthode pythagoricienne documentée.',
    to: '/numerologie',
    cta: 'Découvrir ma numérologie',
    icon: 'numbers',
  },
  {
    number: '03',
    kicker: 'Énergie',
    title: 'Human Design',
    description:
      'La mécanique de votre BodyGraph : type, stratégie, autorité et centres énergétiques, à partir de votre heure exacte.',
    to: '/human-design',
    cta: 'Découvrir mon Human Design',
    icon: 'body',
  },
] as const;

function PathIcon({ type }: { type: (typeof PATHS)[number]['icon'] }) {
  if (type === 'sun') {
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <circle cx="24" cy="24" r="17" strokeDasharray="2 3" />
        <circle cx="24" cy="24" r="8" />
        <path d="M24 2v6M24 40v6M2 24h6M40 24h6" />
        <path d="M24 16a8 8 0 0 1 8 8 8 8 0 0 1-8 8" fill="currentColor" fillOpacity="0.12" />
      </svg>
    );
  }
  if (type === 'numbers') {
    return (
      <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" />
        <circle cx="24" cy="24" r="10" strokeDasharray="3 3" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        <path d="M24 4v10M24 34v10M6 14l10 6M32 28l10 6" strokeOpacity="0.45" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <polygon points="24,4 31,15 17,15" />
      <polygon points="24,19 33,28 15,28" />
      <rect x="19" y="33" width="10" height="10" />
      <line x1="24" y1="15" x2="24" y2="19" />
      <line x1="24" y1="28" x2="24" y2="33" />
    </svg>
  );
}

function PathCard({ path }: { path: (typeof PATHS)[number] }) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/[0.08] bg-white p-6 text-left shadow-ethereal transition-all duration-300 hover:-translate-y-1 hover:shadow-ethereal-lg lg:p-8">
      <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/20 blur-2xl transition-colors group-hover:bg-lavender/20" />
      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-surface-container-low text-secondary transition-colors group-hover:border-secondary/30 group-hover:bg-secondary-container">
            <PathIcon type={path.icon} />
          </span>
          <span className="eyebrow text-secondary/70">
            {path.number} / {path.kicker}
          </span>
        </div>
        <h2 className="mb-2 text-h3 text-primary transition-colors group-hover:text-secondary">
          {path.title}
        </h2>
        <p className="mb-6 text-body text-on-surface-variant">{path.description}</p>
      </div>
      <div className="relative">
        <div className="mb-4 h-px w-full bg-surface-container-high" />
        <Link
          to={path.to}
          className="flex min-h-[44px] w-full items-center justify-between rounded-lg bg-surface-container px-4 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.035em] text-primary transition-all hover:bg-primary-container hover:text-surface"
        >
          {path.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

const PILLARS = [
  {
    glyph: '☉',
    title: 'Astrologie humaniste',
    text: 'Soleil, Lune, Ascendant, maisons et aspects : une lecture symbolique du ciel natal, sans fatalisme.',
    bullets: ['Soleil, Lune & Ascendant', '12 maisons & aspects majeurs', 'Calcul Placidus documenté'],
    to: '/theme-astral',
  },
  {
    glyph: '✶',
    title: 'Numérologie pythagoricienne',
    text: 'Chemin de vie, expression, élan spirituel et année personnelle, calculés à partir de votre état civil de naissance.',
    bullets: ['Méthode 1 à 9 documentée', 'Nombres maîtres 11, 22, 33', 'Grille d’inclusion & cycles'],
    to: '/numerologie',
  },
  {
    glyph: '◇',
    title: 'Human Design',
    text: 'Type, stratégie, autorité et centres définis, à partir de votre date, heure et lieu de naissance exacts.',
    bullets: ['BodyGraph & 26 activations', '9 centres, 36 canaux', 'Sans approximation de l’heure'],
    to: '/human-design',
  },
];

const COURSES = [
  {
    label: 'Astrologie',
    title: 'Lire un thème natal de A à Z',
    text: 'Signes, maisons, aspects et méthode de synthèse. Un parcours progressif pour gagner en autonomie.',
    glyph: '☉',
  },
  {
    label: 'Numérologie',
    title: 'La numérologie sacrée en pratique',
    text: 'Table pythagoricienne, nombres maîtres, grille d’inclusion et cycles personnels.',
    glyph: '✶',
  },
  {
    label: 'Human Design',
    title: 'Déchiffrer un BodyGraph',
    text: 'Types, autorités, centres et canaux : une méthode claire pour comprendre votre mécanique.',
    glyph: '◇',
  },
];

export function HomePage() {
  usePageMeta(
    'Astralis — Cartographie céleste & énergétique',
    'Découvrez votre thème astral, votre numérologie pythagoricienne et votre Human Design. Des calculs réels, une approche sereine, des données traitées dans votre navigateur.',
  );

  return (
    <>
      <section className="relative overflow-hidden bg-grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-16 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-secondary-container/25 blur-[110px]" />
          <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-tertiary-fixed/20 blur-[90px]" />
          <CornerOrnament className="absolute left-5 top-24 hidden text-secondary/15 lg:block" />
          <CornerOrnament className="absolute right-5 top-24 hidden rotate-90 text-secondary/15 lg:block" />
        </div>

        <div className="container-astralis relative pb-20 pt-16 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-5 flex items-center gap-3 opacity-80">
              <span className="h-px w-8 bg-secondary" />
              <span className="eyebrow text-secondary">Cartographie céleste & énergétique</span>
              <span className="h-px w-8 bg-secondary" />
            </div>
            <h1 className="max-w-4xl text-balance text-display text-primary">
              Et si vous appreniez à{' '}
              <span className="font-light italic text-secondary">mieux vous connaître</span> ?
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-body-lg text-on-surface-variant">
              Découvrez ce que l’astrologie, la numérologie et le Human Design peuvent vous apprendre
              sur votre personnalité, vos aspirations et votre fonctionnement — avec des calculs
              réels, des méthodes expliquées et aucune promesse de destin.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[0.72rem] text-on-surface-variant">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                Données traitées dans votre navigateur
              </span>
              <span className="h-3 w-px bg-outline-variant" />
              <span className="inline-flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                Moteurs astronomiques open source
              </span>
              <span className="h-3 w-px bg-outline-variant" />
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                Sans conservation de vos données de naissance
              </span>
            </div>
          </div>

          <div id="parcours" className="mt-14 grid scroll-mt-28 grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16">
            {PATHS.map((path) => (
              <PathCard key={path.to} path={path} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-20 lg:py-24">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Les piliers de l’exploration"
              title="Trois clés de lecture complémentaires"
              intro="Chaque système éclaire un angle différent de votre identité : temporalité, symbolique et mécanique énergétique. Aucun ne prétend tout dire."
            />
            <Link
              to="/comprendre/astrologie"
              className="inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
            >
              Comprendre les méthodes
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="card flex flex-col justify-between p-6 transition-shadow hover:shadow-ethereal-lg lg:p-8"
              >
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-xl text-secondary">
                      {pillar.glyph}
                    </span>
                    <h3 className="text-title text-primary">{pillar.title}</h3>
                  </div>
                  <p className="mb-5 text-body text-on-surface-variant">{pillar.text}</p>
                  <ul className="mb-6 flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 text-small text-on-surface-variant">
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={pillar.to} className={buttonStyles({ variant: 'secondary', size: 'sm', full: true })}>
                  Explorer
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-astralis py-20 lg:py-24">
        <SectionHeading
          eyebrow="Poursuivre la quête"
          title="Deux voies pour approfondir votre voyage intérieur"
          intro="Nos calculateurs gratuits donnent une première lecture. Les analyses éditoriales et l’Académie Astralis ouvriront prochainement."
          align="center"
          className="mx-auto mb-10 items-center"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <article className="card-gold flex flex-col justify-between overflow-hidden p-6 sm:p-8">
            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <Pill tone="gold">Offre à l’unité</Pill>
                <Pill tone="outline">Bientôt</Pill>
              </div>
              <h3 className="mb-2 text-h3 text-primary">Recevoir une analyse personnalisée</h3>
              <p className="mb-5 text-body text-on-surface-variant">
                Un rapport éditorial détaillé, rédigé à partir de vos coordonnées de naissance :
                synthèse, interprétations et repères concrets. Le format et le prix seront annoncés à
                l’ouverture, sans paiement simulé aujourd’hui.
              </p>
              <ul className="mb-7 space-y-2.5 text-small text-on-surface-variant">
                {[
                  'Analyse approfondie de votre thème',
                  'Lecture symbolique, sans fatalisme',
                  'Documents PDF et repères de mise en pratique',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <DiamondMark className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ComingSoonDialog
              eyebrow="Analyses approfondies"
              title="Les rapports personnalisés arrivent bientôt"
              description="Les analyses éditoriales ne sont pas encore commercialisées. Aucun paiement n’est ouvert et aucun rapport fictif ne sera généré. Inscrivez-vous pour être prévenu·e de l’ouverture."
              trigger={(open) => (
                <button type="button" onClick={open} className={buttonStyles({ full: true })}>
                  Découvrir les analyses
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            />
          </article>

          <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-tertiary-fixed/80 bg-surface-container p-6 shadow-ethereal sm:p-8">
            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <Pill tone="lavender">Académie Astralis</Pill>
                <Pill tone="outline">Bientôt</Pill>
              </div>
              <h3 className="mb-2 text-h3 text-primary">Apprendre à interpréter vous-même</h3>
              <p className="mb-5 text-body text-on-surface-variant">
                Des parcours structurés pour comprendre les mécanismes de chaque discipline et lire
                vos propres résultats avec méthode. Le catalogue sera accessible ici à l’ouverture.
              </p>
              <ul className="mb-7 space-y-2.5 text-small text-on-surface-variant">
                {[
                  'Modules progressifs et fiches de synthèse',
                  'Cas pratiques et repères méthodologiques',
                  'Accès au catalogue en avant-première',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <StarMark className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/les-cours" className={buttonStyles({ variant: 'secondary', full: true })}>
              Voir la page des cours
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-20 lg:py-24">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Enseignements fondamentaux"
              title="L’Académie en préparation"
              intro="Un aperçu des parcours qui seront proposés. Aucune inscription n’est ouverte pour le moment."
            />
            <Link
              to="/les-cours"
              className="inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
            >
              Découvrir le catalogue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {COURSES.map((course) => (
              <article
                key={course.title}
                className="flex flex-col justify-between rounded-2xl border border-primary/[0.08] bg-white p-6 shadow-ethereal-sm transition-shadow hover:shadow-ethereal"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <Pill tone="cream">{course.label}</Pill>
                    <Pill tone="outline">Bientôt</Pill>
                  </div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-2xl text-secondary">{course.glyph}</span>
                    <h3 className="text-title text-primary">{course.title}</h3>
                  </div>
                  <p className="text-small text-on-surface-variant">{course.text}</p>
                </div>
                <div className="mt-6 border-t border-primary/[0.07] pt-4">
                  <Link
                    to="/les-cours"
                    className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
                  >
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-astralis py-20">
        <div className="grid gap-8 rounded-2xl border border-gold/70 bg-white p-7 shadow-ethereal md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-10">
          <div>
            <Pill tone="gold">Précision & sobriété</Pill>
            <h2 className="mt-4 text-h2 text-primary">Des calculs réels, présentés avec honnêteté</h2>
            <p className="mt-3 max-w-xl text-body text-on-surface-variant">
              Les positions planétaires reposent sur Astronomy Engine (MIT), les maisons sur
              l’algorithme Placidus adapté de free-human-design (MIT), et le BodyGraph sur la matrice
              canonique du Human Design. Les calculs sont exécutés dans votre navigateur : aucune
              donnée de naissance n’est envoyée à un serveur Astralis.
            </p>
            <Link
              to="/ethique"
              className="mt-5 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
            >
              Lire notre méthodologie
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { icon: <Lock className="h-5 w-5" />, label: 'Calcul local' },
              { icon: <Sun className="h-5 w-5" />, label: 'Éphémérides' },
              { icon: <InfinityIcon className="h-5 w-5" />, label: 'Sans fatalisme' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-primary/[0.06] bg-surface-container-low px-2 py-5"
              >
                <span className="text-secondary">{item.icon}</span>
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-16 text-center">
          <ArtDecoDivider className="mx-auto mb-8 max-w-md" />
          <p className="mx-auto max-w-2xl text-balance text-h3 font-light text-primary">
            « Se connaître ne consiste pas à se figer dans une identité, mais à retrouver de la
            liberté dans la manière dont on habite sa vie. »
          </p>
          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.16em] text-secondary">
            La posture Astralis
          </p>
        </div>
      </section>
    </>
  );
}
