import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock3, Lock, Sparkles, Star } from 'lucide-react';
import { NewsletterForm } from '../components/NewsletterForm';
import { buttonStyles } from '../components/ui/Button';
import { ArtDecoDivider, CornerOrnament, Pill, SectionHeading } from '../components/ui/Ornaments';
import { usePageMeta } from '../lib/usePageMeta';

const PREVIEWS = [
  {
    discipline: 'Astrologie',
    title: 'Lire un thème natal de A à Z',
    topics: ['Les 12 signes et les éléments', 'Planètes, maisons et aspects', 'Méthode de synthèse et cas pratiques'],
    glyph: '☉',
  },
  {
    discipline: 'Numérologie',
    title: 'La numérologie sacrée en pratique',
    topics: ['Table pythagoricienne et nombres maîtres', 'Grille d’inclusion et cycles', 'Études de cas et comparatifs'],
    glyph: '✶',
  },
  {
    discipline: 'Human Design',
    title: 'Déchiffrer un BodyGraph',
    topics: ['Types, stratégies et autorités', 'Les 9 centres et 36 canaux', 'Lecture de 26 activations'],
    glyph: '◇',
  },
];

export function CoursesPage() {
  usePageMeta(
    'Les Cours — L’Académie Astralis arrive bientôt',
    'Le catalogue de cours Astralis ouvrira prochainement. Aucune inscription ni paiement ne sont disponibles dans cette version.',
  );

  return (
    <>
      <section className="relative overflow-hidden bg-grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-tertiary-fixed/20 blur-[110px]" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-secondary-container/25 blur-[90px]" />
          <CornerOrnament className="absolute left-4 top-20 hidden text-secondary/15 lg:block" />
        </div>
        <div className="container-astralis relative py-16 text-center lg:py-24">
          <Pill tone="lavender">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            Bientôt disponible
          </Pill>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance text-display text-primary">
            L’Académie Astralis —{' '}
            <span className="font-light italic text-secondary">apprendre à lire par soi-même</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-body-lg text-on-surface-variant">
            Les cours et formations ne sont pas encore ouverts. Aucune inscription, aucun paiement et
            aucun accès membre ne sont simulés dans cette version. Voici ce qui se prépare.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/#parcours" className={buttonStyles({ size: 'lg' })}>
              Explorer les calculateurs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/comprendre/astrologie" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
              Lire les bases gratuitement
              <BookOpen className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-astralis py-16 lg:py-20">
        <SectionHeading
          eyebrow="Avant-première"
          title="Trois parcours en préparation"
          intro="Les contenus seront annoncés à l’ouverture. Les intitulés et les thèmes ci-dessous sont indicatifs et ne constituent pas une offre commerciale."
          align="center"
          className="mx-auto mb-10 items-center"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {PREVIEWS.map((preview) => (
            <article key={preview.title} className="card flex flex-col p-6">
              <div className="mb-4 flex items-center justify-between">
                <Pill tone="cream">{preview.discipline}</Pill>
                <Pill tone="outline">Bientôt</Pill>
              </div>
              <span className="text-3xl text-secondary" aria-hidden="true">{preview.glyph}</span>
              <h2 className="mt-3 text-h3 text-primary">{preview.title}</h2>
              <ul className="mt-4 space-y-2 text-small text-on-surface-variant">
                {preview.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
                    {topic}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 border-t border-primary/[0.07] pt-4 text-[0.7rem] uppercase tracking-[0.1em] text-outline">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Inscriptions fermées
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Ce qui se prépare"
                title="Une académie sans précipitation"
                intro="Nous préférons ouvrir des contenus vérifiés plutôt que des modules incomplets. Voici les principes de travail."
              />
              <ul className="mt-6 space-y-3 text-small text-on-surface-variant">
                {[
                  'Des contenus relus et sourcés, avec des limites explicites.',
                  'Des parcours progressifs, accessibles sans prérequis.',
                  'Des exercices concrets et des cas d’étude.',
                  'Aucun discours anxiogène ni promesse de résultat.',
                  'Un accès pérenne, sans abonnement caché.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-gold p-6 sm:p-8">
              <Pill tone="gold">Être prévenu·e</Pill>
              <h2 className="mt-3 text-h3 text-primary">Recevoir l’annonce d’ouverture</h2>
              <p className="mt-2 text-small text-on-surface-variant">
                Laissez votre adresse pour recevoir l’information lorsque le catalogue et les
                inscriptions seront ouverts. Le service d’envoi sera activé avec Resend.
              </p>
              <div className="mt-5">
                <NewsletterForm />
              </div>
              <p className="mt-4 text-[0.68rem] leading-relaxed text-outline">
                Aucun paiement n’est demandé. Vous pourrez vous désinscrire à tout moment. Voir la
                politique de confidentialité.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-astralis py-14 text-center">
        <ArtDecoDivider className="mx-auto mb-8 max-w-md" />
        <p className="mx-auto max-w-2xl text-body text-on-surface-variant">
          En attendant l’ouverture, les trois calculateurs sont disponibles gratuitement et vos
          données restent dans votre navigateur.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/theme-astral" className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
            Thème astral
          </Link>
          <Link to="/numerologie" className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
            Numérologie
          </Link>
          <Link to="/human-design" className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
            Human Design
          </Link>
        </div>
      </section>
    </>
  );
}
