import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Compass,
  Info,
  Lock,
  Moon,
  Sparkles,
  Sun,
  Telescope,
} from 'lucide-react';
import { AstrologyForm } from '../components/forms/AstrologyForm';
import { ZodiacWheelArt } from '../components/art/ZodiacWheelArt';
import { buttonStyles } from '../components/ui/Button';
import { FaqList } from '../components/ui/FaqList';
import { ArtDecoDivider, CornerOrnament, Pill, SectionHeading } from '../components/ui/Ornaments';
import { usePageMeta } from '../lib/usePageMeta';

const PILLARS = [
  {
    icon: <Sun className="h-5 w-5" />,
    label: 'Cœur luminaire',
    title: 'Soleil',
    text: 'Votre identité profonde, la qualité d’énergie que vous rayonnez et la direction vers laquelle votre vie tend naturellement.',
  },
  {
    icon: <Moon className="h-5 w-5" />,
    label: 'Monde intérieur',
    title: 'Lune',
    text: 'Votre sensibilité, vos besoins affectifs, votre manière de vous réconforter et de recevoir le monde.',
  },
  {
    icon: <Compass className="h-5 w-5" />,
    label: 'Masque & horizon',
    title: 'Ascendant',
    text: 'La manière dont vous entrez en relation, votre présence spontanée et le filtre à travers lequel vous percevez la vie.',
  },
  {
    icon: <Telescope className="h-5 w-5" />,
    label: 'Tissage majeur',
    title: 'Maisons & aspects',
    text: 'Les domaines de vie où votre énergie se concentre, et les dialogues entre vos fonctions psychiques.',
  },
];

const FAQ = [
  {
    question: 'Que se passe-t-il si je ne connais pas mon heure de naissance ?',
    answer:
      'Astralis affiche alors une carte solaire simplifiée : seuls les signes qui restent identiques sur toute la journée sont retenus. Aucun Ascendant, aucun Milieu du Ciel, aucune maison et aucun aspect ne sont calculés. Les planètes rapides comme la Lune sont signalées comme indéterminées lorsqu’elles changent de signe. Nous ne choisissons jamais une heure arbitraire.',
  },
  {
    question: 'Quel système de maisons utilisez-vous ?',
    answer:
      'Le système Placidus, le plus répandu dans la tradition occidentale. Aux latitudes polaires où il n’est pas défini, le calcul bascule automatiquement en maisons par signe entier et le résultat l’indique.',
  },
  {
    question: 'Le thème astral est-il une prédiction ?',
    answer:
      'Non. Astralis propose une lecture symbolique et psychologique. Les configurations astrales décrivent des climats intérieurs, des tensions et des ressources ; elles ne déterminent pas des événements inévitables. Aucune décision importante ne devrait être prise sur la seule base d’un thème.',
  },
  {
    question: 'Mes données de naissance sont-elles conservées ?',
    answer:
      'Les calculs sont exécutés dans votre navigateur. Les informations sont stockées uniquement dans la mémoire de session de l’onglet, le temps d’afficher vos résultats, et peuvent être effacées depuis la page de résultats. Aucune base de données Astralis ne reçoit votre date, heure ou lieu de naissance.',
  },
  {
    question: 'Quelle est la précision astronomique ?',
    answer:
      'Les positions planétaires sont calculées avec Astronomy Engine, une bibliothèque open source fondée sur des théories VSOP87 et ELP2000. La précision est de l’ordre de l’arcminute pour les planètes, largement suffisante pour une lecture astrologique. Ce n’est pas Swiss Ephemeris, et nous ne le prétendons pas.',
  },
];

export function AstrologyPage() {
  usePageMeta(
    'Thème astral — Calculer sa carte du ciel | Astralis',
    'Calculez votre thème astral réel : Soleil, Lune, Ascendant, planètes, maisons Placidus et aspects. Traitement local, gestion honnête de l’heure inconnue.',
  );

  return (
    <>
      <section className="relative overflow-hidden bg-grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-8 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-secondary-container/25 blur-[110px]" />
          <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-tertiary-fixed/20 blur-[90px]" />
          <CornerOrnament className="absolute left-4 top-20 hidden text-secondary/15 lg:block" />
        </div>
        <div className="container-astralis relative py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Pill tone="cream">
                <Telescope className="h-3.5 w-3.5" aria-hidden="true" />
                Matrice de précision · éphémérides astronomiques
              </Pill>
              <h1 className="mt-5 max-w-3xl text-balance text-display text-primary">
                Le thème astral —{' '}
                <span className="font-light italic text-secondary">la carte du ciel</span> de votre
                naissance
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-body-lg text-on-surface-variant">
                Date, heure et lieu : nous calculons les positions réelles du ciel au moment de votre
                premier souffle. Puis nous les traduisons en une lecture symbolique claire, sans
                fatalisme et sans données inventées.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#calculateur" className={buttonStyles({ size: 'lg' })}>
                  <Sparkles className="h-4 w-4 text-tertiary-fixed" aria-hidden="true" />
                  Calculer mon thème astral
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link to="/comprendre/astrologie" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                  Comprendre la méthode
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.72rem] text-on-surface-variant">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                  Soleil, Lune & Ascendant
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                  12 maisons & aspects
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                  Calcul local
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-square w-full max-w-[420px] rounded-2xl border border-gold/70 bg-white p-4 shadow-ethereal-lg">
                <div className="absolute inset-3 rounded-xl border border-primary/[0.06]" />
                <ZodiacWheelArt className="relative h-full w-full" />
              </div>
              <p className="mt-3 text-center text-[0.66rem] uppercase tracking-[0.18em] text-outline">
                Fig. 01 · Roue natale
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-20 lg:py-24">
          <SectionHeading
            eyebrow="Ce que révèle votre thème"
            title="Quatre coordonnées pour commencer à lire votre carte"
            intro="Un thème astral est un ensemble. Ces quatre entrées donnent une première lecture, puis les planètes, les maisons et les aspects viennent nuancer le tableau."
            align="center"
            className="mx-auto mb-10 items-center"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <article key={pillar.title} className="card flex flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-secondary">
                    {pillar.icon}
                  </span>
                  <span className="eyebrow text-secondary/70">{pillar.label}</span>
                </div>
                <h3 className="mb-2 text-h3 text-primary">{pillar.title}</h3>
                <p className="text-small text-on-surface-variant">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="calculateur" className="container-astralis scroll-mt-24 py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Calculateur instantané"
              title="Votre carte du ciel en quelques secondes"
              intro="Renseignez uniquement ce qui est nécessaire au calcul. La date et le lieu sont toujours requis ; l’heure est indispensable pour un thème complet."
            />
            <div className="mt-7 space-y-3">
              {[
                { icon: <Check className="h-4 w-4" />, text: 'Calcul géocentrique tropical, système Placidus' },
                { icon: <Clock3 className="h-4 w-4" />, text: 'Fuseau historique et heure d’été appliqués au lieu' },
                { icon: <Lock className="h-4 w-4" />, text: 'Données conservées uniquement dans l’onglet' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-2.5 text-small text-on-surface-variant">
                  <span className="mt-0.5 text-secondary">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-xl border border-gold/70 bg-surface-container-low p-4">
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <p className="text-[0.75rem] leading-relaxed text-on-surface-variant">
                  Astralis ne remplit jamais une heure manquante. En l’absence d’heure, le résultat
                  devient une carte solaire simplifiée, explicitement signalée.
                </p>
              </div>
            </div>
          </div>
          <div className="card-gold p-5 sm:p-7 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-primary/[0.08] pb-5">
              <div>
                <p className="eyebrow text-secondary">Formulaire sécurisé</p>
                <h2 className="mt-1 text-h3 text-primary">Calculer mon thème astral</h2>
              </div>
              <span className="hidden rounded-full bg-surface-container px-3 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-on-surface-variant sm:inline-block">
                Gratuit
              </span>
            </div>
            <AstrologyForm />
          </div>
        </div>
      </section>

      <section id="methode" className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis scroll-mt-24 py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="Méthode & limites"
              title="Ce que le calcul fait — et ce qu’il ne fait pas"
              intro="La rigueur astronomique n’exige pas de prétendre à une exactitude métaphysique. Nous séparons clairement le calcul, l’interprétation et nos limites."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Éphémérides calculées',
                  text: 'Positions géocentriques tropicales du Soleil, de la Lune, des planètes et du Nœud Nord moyen. Rétrogradations détectées par variation de longitude.',
                },
                {
                  title: 'Maisons Placidus',
                  text: 'Calcul des 12 pointes de maisons à partir du temps sidéral et de l’obliquité. Bascule en signes entiers aux latitudes où Placidus n’est pas défini.',
                },
                {
                  title: 'Heure inconnue',
                  text: 'Aucune heure arbitraire. Nous testons plusieurs moments de la journée et ne conservons que les signes stables. Ascendant et maisons sont alors absents.',
                },
                {
                  title: 'Interprétation prudente',
                  text: 'Les textes sont symboliques et non prédictifs. Ils ne remplacent pas un accompagnement médical, psychologique, juridique ou financier.',
                },
              ].map((item) => (
                <article key={item.title} className="card p-5">
                  <h3 className="mb-2 text-title text-primary">{item.title}</h3>
                  <p className="text-small text-on-surface-variant">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <ArtDecoDivider className="my-12" />
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-gold/70 bg-white p-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-secondary">Aller plus loin</p>
              <h3 className="mt-1 text-h3 text-primary">Apprendre à lire votre carte</h3>
              <p className="mt-1 max-w-xl text-small text-on-surface-variant">
                Signes, planètes, maisons et aspects : les repères essentiels, sans jargon inutile.
              </p>
            </div>
            <Link to="/comprendre/astrologie" className={buttonStyles({ variant: 'secondary' })}>
              Comprendre mon profil
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-astralis py-20 lg:py-24">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Avant de calculer"
          intro="Les réponses aux questions qui reviennent le plus souvent sur la méthode, la confidentialité et les limites."
        />
        <FaqList items={FAQ} className="mt-8 max-w-4xl" />
      </section>
    </>
  );
}
