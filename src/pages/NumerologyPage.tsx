import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Check,
  Compass,
  Heart,
  Info,
  Lock,
  Route,
  Sparkles,
  Star,
} from 'lucide-react';
import { NumerologyForm } from '../components/forms/NumerologyForm';
import { NumerologyMatrixArt } from '../components/art/NumerologyMatrixArt';
import { buttonStyles } from '../components/ui/Button';
import { FaqList } from '../components/ui/FaqList';
import { ArtDecoDivider, CornerOrnament, Pill, SectionHeading } from '../components/ui/Ornaments';
import { usePageMeta } from '../lib/usePageMeta';

const PILLARS = [
  {
    number: '01',
    source: 'Date de naissance',
    title: 'Le Chemin de vie',
    subtitle: 'La boussole destinationnelle',
    text: 'La somme réduite de votre date de naissance. Il décrit la direction d’ensemble, les apprentissages majeurs et le tempo de votre parcours.',
    keywords: ['Destination', 'Défis', 'Vocation'],
    icon: <Route className="h-5 w-5" />,
  },
  {
    number: '02',
    source: 'Nom & tous prénoms',
    title: 'Le Nombre d’Expression',
    subtitle: 'Le véhicule terrestre',
    text: 'La synthèse de toutes les lettres de votre nom de naissance. Il évoque vos talents visibles, votre manière d’agir et vos ressources concrètes.',
    keywords: ['Talents', 'Identité', 'Créativité'],
    icon: <Star className="h-5 w-5" />,
  },
  {
    number: '03',
    source: 'Voyelles uniquement',
    title: 'L’Élan spirituel',
    subtitle: 'Le feu intime',
    text: 'La somme des voyelles de votre nom complet. Il pointe le désir profond, ce qui motive intérieurement et ce qui nourrit le sentiment d’être à sa place.',
    keywords: ['Désir', 'Besoins', 'Moteur'],
    icon: <Heart className="h-5 w-5" />,
  },
  {
    number: '04',
    source: 'Consonnes uniquement',
    title: 'Le Nombre de Réalisation',
    subtitle: 'L’empreinte sociale',
    text: 'La somme des consonnes. Il décrit la façade sociale, la manière dont vous êtes perçu·e et votre façon de matérialiser vos intentions.',
    keywords: ['Ancrage', 'Image', 'Action'],
    icon: <Compass className="h-5 w-5" />,
  },
];

const FAQ = [
  {
    question: 'Dois-je utiliser mon nom de naissance ou mon nom d’usage ?',
    answer:
      'La méthode pythagoricienne retenue repose sur le nom de naissance complet : tous les prénoms et le nom patronymique de l’acte de naissance. Le nom d’usage ou marital ajoute une vibration sociale, mais il ne remplace pas l’empreinte de naissance. Astralis ne demande donc pas votre nom d’épouse ou d’usage.',
  },
  {
    question: 'Comment sont traités les accents, les traits d’union et les particules ?',
    answer:
      'Les accents sont normalisés : É devient E, Ç devient C. Les traits d’union, apostrophes et espaces sont ignorés ; toutes les lettres sont additionnées. Les ligatures œ et æ sont converties en OE et AE. Le détail apparaît dans la page de résultats.',
  },
  {
    question: 'Que signifient les nombres maîtres 11, 22 et 33 ?',
    answer:
      'Ce sont des nombres non réduits lorsqu’ils apparaissent dans le calcul. On les lit dans leur vibration maîtresse et dans leur réduction (11/2, 22/4, 33/6). Ils ne sont ni « supérieurs » ni « meilleurs » : ils décrivent une intensité et une exigence particulières. Astralis les conserve et affiche toujours la réduction.',
  },
  {
    question: 'Le Y est-il une voyelle ?',
    answer:
      'Astralis suit une convention explicite : le Y est compté comme voyelle pour l’Élan spirituel. Cette convention est courante mais non universelle ; elle est indiquée pour que vous puissiez comparer avec d’autres écoles. Les résultats restent cohérents avec la table pythagoricienne affichée.',
  },
  {
    question: 'La numérologie est-elle prédictive ?',
    answer:
      'Non. Astralis défend une approche laïque et introspective. Les nombres qualifient des climats et des cycles ; ils n’annoncent pas d’événements inéluctables. L’Année personnelle est un repère de tempo, pas une prévision.',
  },
];

export function NumerologyPage() {
  usePageMeta(
    'Numérologie pythagoricienne — Calcul réel | Astralis',
    'Calculez votre chemin de vie, votre expression, votre élan spirituel, votre personnalité et votre année personnelle. Méthode pythagoricienne documentée et testée.',
  );

  return (
    <>
      <section className="relative overflow-hidden bg-grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-secondary-container/25 blur-[110px]" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-tertiary-fixed/20 blur-[90px]" />
          <CornerOrnament className="absolute right-4 top-20 hidden rotate-90 text-secondary/15 lg:block" />
        </div>
        <div className="container-astralis relative py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <Pill tone="cream">
                <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
                Arithmancie & cycles vibratoires · science des nombres
              </Pill>
              <h1 className="mt-5 max-w-3xl text-balance text-display text-primary">
                Numérologie —{' '}
                <span className="font-light italic text-secondary">l’architecture secrète</span> de
                votre destinée
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-body-lg text-on-surface-variant">
                Découvrez comment les vibrations de votre date de naissance et de votre nom d’état
                civil éclairent votre chemin, vos forces innées et vos cycles d’évolution. Chaque
                calcul est détaillé, reproductible et testé.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#calculateur" className={buttonStyles({ size: 'lg' })}>
                  <Sparkles className="h-4 w-4 text-tertiary-fixed" aria-hidden="true" />
                  Calculer mon thème numérologique
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link to="/comprendre/numerologie" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                  Comprendre la méthode
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.72rem] text-on-surface-variant">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                  Table pythagoricienne pure
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                  Nombres maîtres conservés
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
                  Données privées
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-square w-full max-w-[420px] rounded-2xl border border-gold/70 bg-white p-4 shadow-ethereal-lg">
                <div className="absolute inset-3 rounded-xl border border-primary/[0.06]" />
                <NumerologyMatrixArt className="relative h-full w-full" />
              </div>
              <p className="mt-3 text-center text-[0.66rem] uppercase tracking-[0.18em] text-outline">
                Fig. 01 · Matrice 3 × 3
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-20 lg:py-24">
          <SectionHeading
            eyebrow="Cartographie analytique"
            title="Ce que révèle votre thème numérologique"
            intro="Quatre coordonnées fondamentales, calculées à partir de votre état civil de naissance, pour comprendre vos aspirations et vos modes d’action."
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
                <p className="eyebrow mb-1 text-[0.6rem] text-outline">{pillar.source}</p>
                <h3 className="text-h3 text-primary">{pillar.title}</h3>
                <p className="mt-0.5 text-[0.78rem] font-medium text-secondary">{pillar.subtitle}</p>
                <p className="mt-3 text-small text-on-surface-variant">{pillar.text}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pillar.keywords.map((keyword) => (
                    <Pill key={keyword} tone="cream" className="px-2 py-0.5 text-[0.58rem]">
                      {keyword}
                    </Pill>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="calculateur" className="container-astralis scroll-mt-24 py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          <div>
            <SectionHeading
              eyebrow="Calculateur Astralis"
              title="Générez votre thème numérologique en quelques secondes"
              intro="Renseignez votre état civil de naissance. Aucune heure ni aucun lieu ne sont nécessaires : la numérologie pythagoricienne travaille sur les noms et la date."
            />
            <div className="mt-7 space-y-3">
              {[
                { icon: <Check className="h-4 w-4" />, text: 'Calcul instantané, sans création de compte' },
                { icon: <Check className="h-4 w-4" />, text: 'Détail de chaque réduction affiché' },
                { icon: <Lock className="h-4 w-4" />, text: 'Aucune donnée envoyée à un serveur' },
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
                  Utilisez le nom complet de l’acte de naissance, avec tous les prénoms. Le nom
                  d’usage n’est pas demandé : il ne remplace pas la vibration de naissance.
                </p>
              </div>
            </div>
          </div>
          <div className="card-gold p-5 sm:p-7 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-primary/[0.08] pb-5">
              <div>
                <p className="eyebrow text-secondary">Formulaire sécurisé</p>
                <h2 className="mt-1 text-h3 text-primary">Calculer mes nombres</h2>
              </div>
              <span className="hidden rounded-full bg-surface-container px-3 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-on-surface-variant sm:inline-block">
                Gratuit
              </span>
            </div>
            <NumerologyForm />
          </div>
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <SectionHeading
              eyebrow="Méthode pythagoricienne"
              title="Un calcul simple, une traçabilité complète"
              intro="Chaque résultat peut être vérifié à la main. Nous affichons les sommes, les réductions et les nombres maîtres conservés."
            />
            <div className="card overflow-hidden">
              <div className="border-b border-primary/[0.08] p-5">
                <h3 className="text-title text-primary">Table de correspondance</h3>
                <p className="mt-1 text-small text-on-surface-variant">
                  Chaque lettre de A à Z correspond à un chiffre de 1 à 9.
                </p>
              </div>
              <div className="grid grid-cols-3 divide-x divide-primary/[0.08] text-center">
                {[
                  { letters: 'A B C D E F G H I', values: '1 2 3 4 5 6 7 8 9' },
                  { letters: 'J K L M N O P Q R', values: '1 2 3 4 5 6 7 8 9' },
                  { letters: 'S T U V W X Y Z', values: '1 2 3 4 5 6 7 8' },
                ].map((column) => (
                  <div key={column.letters} className="p-4">
                    <p className="text-[0.72rem] leading-relaxed tracking-[0.08em] text-on-surface-variant">
                      {column.letters}
                    </p>
                    <p className="mt-1 text-[0.8rem] font-semibold tracking-[0.12em] text-primary">
                      {column.values}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-primary/[0.08] p-5">
                <div className="flex items-start gap-2.5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  <p className="text-[0.75rem] leading-relaxed text-on-surface-variant">
                    Le Chemin de vie additionne tous les chiffres de la date. L’Expression additionne
                    toutes les lettres. L’Élan spirituel retient les voyelles (A, E, I, O, U, Y) ; la
                    Personnalité retient les consonnes. Les nombres 11, 22 et 33 ne sont pas réduits.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ArtDecoDivider className="my-12" />
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-gold/70 bg-white p-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow text-secondary">Aller plus loin</p>
              <h3 className="mt-1 text-h3 text-primary">Comprendre la symbolique des nombres</h3>
              <p className="mt-1 max-w-xl text-small text-on-surface-variant">
                Les archétypes de 1 à 9, les nombres maîtres, la grille d’inclusion et le sens des
                cycles personnels.
              </p>
            </div>
            <Link to="/comprendre/numerologie" className={buttonStyles({ variant: 'secondary' })}>
              Comprendre mon profil
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-astralis py-20 lg:py-24">
        <SectionHeading
          eyebrow="Éclairages techniques"
          title="Questions fréquentes sur l’arithmancie"
          intro="Les réponses du collège éditorial pour aborder votre thème avec justesse et sans superstition."
        />
        <FaqList items={FAQ} className="mt-8 max-w-4xl" />
      </section>
    </>
  );
}
