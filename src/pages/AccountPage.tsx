import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Lock, Sparkles, UserRound } from 'lucide-react';
import { NewsletterForm } from '../components/NewsletterForm';
import { buttonStyles } from '../components/ui/Button';
import { CornerOrnament, Pill, SectionHeading } from '../components/ui/Ornaments';
import { usePageMeta } from '../lib/usePageMeta';

export function AccountPage() {
  usePageMeta(
    'Mon compte — Bientôt disponible | Astralis',
    'L’espace membre Astralis ouvrira prochainement. Aucun compte, aucune donnée de naissance et aucun accès simulé dans cette version.',
  );

  return (
    <>
      <section className="relative overflow-hidden bg-grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-secondary-container/25 blur-[110px]" />
          <CornerOrnament className="absolute right-4 top-20 hidden rotate-90 text-secondary/15 lg:block" />
        </div>
        <div className="container-astralis relative py-16 text-center lg:py-24">
          <Pill tone="lavender">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Bientôt disponible
          </Pill>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-display text-primary">
            Mon compte —{' '}
            <span className="font-light italic text-secondary">un espace qui reste à construire</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-body-lg text-on-surface-variant">
            Il n’y a pas encore de compte utilisateur, d’espace membre ni de données enregistrées.
            Nous n’affichons pas de faux profil et nous ne simulons pas de connexion.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/#parcours" className={buttonStyles({ size: 'lg' })}>
              Utiliser les calculateurs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/les-cours" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
              Voir la page des cours
              <BookOpen className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-astralis py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Ce qui viendra"
              title="À quoi servira l’espace membre"
              intro="L’objectif est de permettre de retrouver ses analyses et ses cours sans reconstruire le site. Pour l’instant, le calcul reste volontairement local et sans conservation."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: <UserRound className="h-5 w-5" />,
                  title: 'Vos analyses',
                  text: 'Retrouver vos thèmes et vos rapports achetés, avec un accès sécurisé.',
                },
                {
                  icon: <BookOpen className="h-5 w-5" />,
                  title: 'Vos formations',
                  text: 'Suivre la progression de vos cours et télécharger vos supports.',
                },
                {
                  icon: <Lock className="h-5 w-5" />,
                  title: 'Vos préférences',
                  text: 'Choisir ce que vous souhaitez conserver, exporter ou supprimer.',
                },
                {
                  icon: <Sparkles className="h-5 w-5" />,
                  title: 'Sans obligation',
                  text: 'Les calculateurs gratuits resteront utilisables sans compte.',
                },
              ].map((item) => (
                <article key={item.title} className="card p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-secondary">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-title text-primary">{item.title}</h3>
                  <p className="mt-1 text-small text-on-surface-variant">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="card-gold p-6 sm:p-8">
            <Pill tone="gold">Rester informé·e</Pill>
            <h2 className="mt-3 text-h3 text-primary">Recevoir l’ouverture de l’espace membre</h2>
            <p className="mt-2 text-small text-on-surface-variant">
              Inscrivez-vous à la lettre d’information. Aucun compte n’est créé à cette étape.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
            <div className="mt-5 rounded-lg bg-surface-container-low p-3 text-[0.7rem] leading-relaxed text-on-surface-variant">
              <p className="font-semibold text-primary">Pourquoi pas maintenant ?</p>
              <p className="mt-1">
                Un compte implique une base de données, une authentification et une politique de
                conservation. Nous préférons livrer d’abord des calculs fiables et une expérience
                sans collecte inutile.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
