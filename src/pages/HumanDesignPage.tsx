import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Compass,
  ExternalLink,
  Info,
  Layers,
  Lock,
  Sparkles,
  UserRound,
  Zap,
} from 'lucide-react';
import { HumanDesignForm } from '../components/forms/HumanDesignForm';
import { BodyGraphArt } from '../components/art/BodyGraphArt';
import { buttonStyles } from '../components/ui/Button';
import { FaqList } from '../components/ui/FaqList';
import { ArtDecoDivider, CornerOrnament, Pill, SectionHeading } from '../components/ui/Ornaments';
import { usePageMeta } from '../lib/usePageMeta';

const PILLARS = [
  {
    number: '01',
    icon: <Zap className="h-5 w-5" />,
    title: 'Votre type énergétique',
    text: 'Générateur, Générateur Manifesteur, Manifesteur, Projecteur ou Réflecteur : votre type décrit la manière dont votre aura interagit avec le monde.',
    tag: 'Fréquence de l’aura',
  },
  {
    number: '02',
    icon: <Compass className="h-5 w-5" />,
    title: 'Votre stratégie',
    text: 'Répondre, initier puis informer, attendre l’invitation ou traverser un cycle lunaire : votre boussole pratique pour réduire la résistance.',
    tag: 'Mode d’action',
  },
  {
    number: '03',
    icon: <UserRound className="h-5 w-5" />,
    title: 'Votre autorité',
    text: 'Émotionnelle, sacrale, splénique, égoïque, auto-projetée, mentale ou lunaire : le centre de décision qui vous est propre.',
    tag: 'Décision souveraine',
  },
  {
    number: '04',
    icon: <Layers className="h-5 w-5" />,
    title: 'Centres définis & ouverts',
    text: 'Les centres colorés sont vos forces stables ; les centres blancs sont vos récepteurs empathiques, lieux de conditionnement et de sagesse.',
    tag: 'Cartographie des 9 centres',
  },
];

const FOUNDATIONS = [
  {
    icon: '☉',
    title: 'Astrologie occidentale',
    text: 'Deux empreintes planétaires : la naissance (conscient) et environ 88° de Soleil avant la naissance (inconscient).',
    tag: 'Les planètes',
  },
  {
    icon: '☰',
    title: 'I Ching chinois',
    text: 'Les 64 hexagrammes sont mis en correspondance avec les 64 portes du BodyGraph.',
    tag: '64 portes',
  },
  {
    icon: '✡',
    title: 'Arbre de Vie',
    text: 'La tradition kabbalistique inspire les 36 canaux qui relient les centres énergétiques.',
    tag: '36 canaux',
  },
  {
    icon: '◉',
    title: 'Système des chakras',
    text: 'Le modèle traditionnel à 7 centres s’est étendu à 9 centres dans le Human Design contemporain.',
    tag: '9 centres',
  },
  {
    icon: '⌁',
    title: 'Physique quantique',
    text: 'Le récit des neutrinos est utilisé comme métaphore d’une information qui traverse la matière. Ce n’est pas une preuve scientifique du système.',
    tag: 'Neutrinos',
  },
];

const FAQ = [
  {
    question: 'Que faire si je ne connais pas mon heure exacte de naissance ?',
    answer:
      'Le Human Design exige l’heure exacte : la Lune change de porte toutes les deux heures environ, et une différence de quelques minutes peut modifier une ligne de profil. Astralis ne génère pas de BodyGraph approximatif. Consultez votre acte de naissance (disponible gratuitement en mairie en France) ou votre carnet de santé. En attendant, vous pouvez utiliser le calculateur astral en mode « heure inconnue », qui indique clairement ce qui reste fiable.',
  },
  {
    question: 'Pourquoi le Human Design diffère-t-il de l’astrologie traditionnelle ?',
    answer:
      'Le Human Design combine une double empreinte temporelle (naissance et environ 88° de Soleil avant la naissance) avec une carte des centres et des canaux. Il ne propose pas un horoscope prédictif : il décrit une mécanique de décision, une stratégie et des zones de conditionnement.',
  },
  {
    question: 'Un centre non défini est-il une faiblesse ?',
    answer:
      'Non. Un centre blanc est réceptif et non fixe. Il capte l’énergie de l’environnement, ce qui peut produire du conditionnement, mais aussi devenir une zone de grande sagesse et de perception. Le langage du Human Design n’est pas un jugement de valeur.',
  },
  {
    question: 'Le BodyGraph est-il validé par la science ?',
    answer:
      'Le Human Design est un système symbolique et expérientiel, pas une théorie physique validée. Astralis le présente comme un outil de connaissance de soi et de réflexion, sans prétendre à une preuve scientifique. Le calcul astronomique, lui, est réel et reproductible.',
  },
  {
    question: 'Quelles données sont nécessaires ?',
    answer:
      'Un prénom ou une référence, la date, l’heure exacte et la ville de naissance. Le lieu sert à déterminer le fuseau horaire et les coordonnées. Aucune donnée n’est envoyée à un serveur Astralis : le calcul est exécuté dans votre navigateur.',
  },
];

export function HumanDesignPage() {
  usePageMeta(
    'Human Design — Calculer son BodyGraph | Astralis',
    'Calculez votre BodyGraph réel : type, stratégie, autorité, profil, centres, canaux et 26 activations. Heure exacte requise, aucune approximation inventée.',
  );

  return (
    <>
      <section className="relative overflow-hidden bg-grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-tertiary-fixed/20 blur-[110px]" />
          <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-secondary-container/20 blur-[90px]" />
          <CornerOrnament className="absolute left-4 top-20 hidden text-secondary/15 lg:block" />
        </div>
        <div className="container-astralis relative py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Pill tone="cream">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                Architecture énergétique · révélation de soi
              </Pill>
              <h1 className="mt-5 max-w-3xl text-balance text-display text-primary">
                Le Human Design —{' '}
                <span className="font-light italic text-secondary">la science de la différenciation</span>
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-body-lg text-on-surface-variant">
                Comprenez votre mécanique énergétique, prenez des décisions alignées et repérez les
                zones où vous absorbez le conditionnement du monde. Un outil de lucidité, pas une
                étiquette de plus.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#calculateur" className={buttonStyles({ size: 'lg' })}>
                  <Sparkles className="h-4 w-4 text-tertiary-fixed" aria-hidden="true" />
                  Générer mon BodyGraph
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link to="/comprendre/human-design" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                  Comprendre les fondements
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                {[
                  { value: '5', label: 'types' },
                  { value: '9', label: 'centres' },
                  { value: '64', label: 'portes' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-gold/60 bg-white/70 px-3 py-3 text-center">
                    <p className="text-h3 text-primary">{item.value}</p>
                    <p className="eyebrow mt-1 text-[0.58rem] text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[420/460] w-full max-w-[400px] rounded-2xl border border-gold/70 bg-white p-4 shadow-ethereal-lg">
                <div className="absolute inset-3 rounded-xl border border-primary/[0.06]" />
                <BodyGraphArt className="relative h-full w-full" />
              </div>
              <p className="mt-3 text-center text-[0.66rem] uppercase tracking-[0.18em] text-outline">
                Fig. 01 · Matrice corporelle
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-20 lg:py-24">
          <SectionHeading
            eyebrow="Les piliers de votre être"
            title="Ce que révèle votre schéma corporel"
            intro="Quatre composantes pour cesser d’évoluer à contre-courant et commencer à observer votre fonctionnement sans jugement."
            align="center"
            className="mx-auto mb-10 items-center"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <article key={pillar.title} className="card flex flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-secondary">
                    {pillar.icon}
                  </span>
                  <span className="eyebrow text-secondary/70">Pilier {pillar.number}</span>
                </div>
                <h3 className="text-h3 text-primary">{pillar.title}</h3>
                <p className="mt-3 text-small text-on-surface-variant">{pillar.text}</p>
                <p className="mt-4 border-t border-primary/[0.07] pt-3 text-[0.62rem] uppercase tracking-[0.14em] text-outline">
                  {pillar.tag}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="calculateur" className="container-astralis scroll-mt-24 py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Calcul immédiat · données précises"
              title="Générez votre schéma corporel en quelques secondes"
              intro="Pour une justesse réelle des canaux et des portes, renseignez votre heure civile exacte et votre lieu de naissance. Le système recalcule le décalage historique du fuseau."
            />
            <div className="mt-7 space-y-3">
              {[
                { icon: <Check className="h-4 w-4" />, text: '26 activations : 13 corps, conscient et inconscient' },
                { icon: <Clock3 className="h-4 w-4" />, text: 'Double empreinte planétaire à 88° de Soleil' },
                { icon: <Lock className="h-4 w-4" />, text: 'Calcul local, sans base de données' },
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
                  Si l’heure vous manque, nous vous expliquons comment l’obtenir et proposons un
                  calcul astral simplifié. Nous ne fabriquons pas une heure de naissance.
                </p>
              </div>
            </div>
          </div>
          <div className="card-gold p-5 sm:p-7 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-primary/[0.08] pb-5">
              <div>
                <p className="eyebrow text-secondary">Formulaire sécurisé</p>
                <h2 className="mt-1 text-h3 text-primary">Révéler mon BodyGraph</h2>
              </div>
              <span className="hidden rounded-full bg-surface-container px-3 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-on-surface-variant sm:inline-block">
                Gratuit
              </span>
            </div>
            <HumanDesignForm />
          </div>
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-20 lg:py-24">
          <SectionHeading
            eyebrow="Fondements théoriques & synthèse"
            title="Une alchimie de traditions, présentée avec recul"
            intro="Le Human Design se présente comme une synthèse de plusieurs courants. Nous distinguons le récit symbolique de ce qui est scientifiquement établi."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {FOUNDATIONS.map((foundation) => (
              <article key={foundation.title} className="card p-5">
                <p className="mb-3 text-2xl text-secondary">{foundation.icon}</p>
                <h3 className="text-title text-primary">{foundation.title}</h3>
                <p className="mt-2 text-small text-on-surface-variant">{foundation.text}</p>
                <p className="mt-4 text-[0.6rem] uppercase tracking-[0.14em] text-outline">{foundation.tag}</p>
              </article>
            ))}
          </div>
          <ArtDecoDivider className="my-12" />
          <div className="grid gap-6 rounded-2xl border border-gold/70 bg-white p-6 md:grid-cols-2 md:p-8">
            <div>
              <p className="eyebrow text-secondary">Pourquoi l’heure exacte ?</p>
              <h3 className="mt-2 text-h3 text-primary">Un déplacement de quelques minutes peut changer une ligne</h3>
              <p className="mt-3 text-body text-on-surface-variant">
                La Lune parcourt environ 13° par jour et change de porte toutes les deux heures. Les
                lignes de profil dépendent de la position du Soleil conscient et inconscient. C’est
                pourquoi nous refusons de « compléter » une heure manquante.
              </p>
              <Link
                to="/comprendre/human-design"
                className="mt-5 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
              >
                Comprendre mon profil
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-xl bg-surface-container-low p-5">
              <h4 className="text-title text-primary">Ce que vous recevrez</h4>
              <ul className="mt-3 space-y-2.5 text-small text-on-surface-variant">
                {[
                  'Type, stratégie, signature et non-soi',
                  'Autorité intérieure et clé de décision',
                  'Profil conscient / inconscient',
                  'BodyGraph avec centres définis et ouverts',
                  'Canaux activés et 26 activations planétaires',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container-astralis py-20 lg:py-24">
        <SectionHeading
          eyebrow="Éclairages essentiels"
          title="Foire aux questions"
          intro="Tout ce qu’il faut savoir pour aborder votre BodyGraph avec lucidité et sérénité."
        />
        <FaqList items={FAQ} className="mt-8 max-w-4xl" />
        <div className="mt-10 flex flex-wrap items-center gap-4 text-[0.72rem] text-on-surface-variant">
          <Link to="/ethique" className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary">
            Lire notre charte de méthode
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <span className="h-3 w-px bg-outline-variant" />
          <span>Le Human Design est un outil symbolique, pas un diagnostic.</span>
        </div>
      </section>
    </>
  );
}
