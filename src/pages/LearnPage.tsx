import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Info,
  Sparkles,
} from 'lucide-react';
import { SIGNS, PLANETS, HOUSES, ASPECTS } from '../lib/astrology/data';
import { PILLAR_EXPLANATIONS, MASTER_NUMBER_NOTE, NUMBER_INTERPRETATIONS } from '../lib/numerology/interpretations';
import { HD_TYPES, HD_AUTHORITIES, HD_CENTERS, PROFILE_LINES, HD_CHANNEL_NAMES } from '../lib/humandesign/labels';
import { buttonStyles } from '../components/ui/Button';
import { ArtDecoDivider, Pill, SectionHeading } from '../components/ui/Ornaments';
import { usePageMeta } from '../lib/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

const DISCIPLINES = {
  astrologie: {
    label: 'Astrologie',
    title: 'Comprendre un thème astral',
    intro: 'Les signes, les planètes, les maisons et les aspects : les repères essentiels pour lire une carte du ciel sans jargon.',
    formPath: '/theme-astral',
    resultPath: '/resultats/theme-astral',
    formLabel: 'Calculer mon thème astral',
  },
  numerologie: {
    label: 'Numérologie',
    title: 'Comprendre la numérologie pythagoricienne',
    intro: 'Une méthode de calcul vérifiable, des archétypes de 1 à 9, des nombres maîtres et des cycles. Voici comment lire votre résultat.',
    formPath: '/numerologie',
    resultPath: '/resultats/numerologie',
    formLabel: 'Calculer ma numérologie',
  },
  'human-design': {
    label: 'Human Design',
    title: 'Comprendre son BodyGraph',
    intro: 'Types, stratégies, autorités, centres et canaux : une grille de lecture pour observer votre mécanique sans vous y enfermer.',
    formPath: '/human-design',
    resultPath: '/resultats/human-design',
    formLabel: 'Générer mon BodyGraph',
  },
} as const;

type DisciplineSlug = keyof typeof DISCIPLINES;

function AstrologieContent() {
  return (
    <div className="space-y-14">
      <section>
        <SectionHeading
          eyebrow="Les 12 archétypes"
          title="Les signes du zodiaque"
          intro="Un signe n’est pas une personnalité figée : il décrit une qualité d’énergie, un élément et un mode d’expression."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((sign) => (
            <article key={sign.slug} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow text-[0.58rem] text-secondary">
                    {sign.element} · {sign.quality}
                  </p>
                  <h3 className="mt-1 text-title text-primary">{sign.name}</h3>
                </div>
                <span className="font-symbol text-3xl text-secondary">{sign.glyph}</span>
              </div>
              <p className="mt-2 text-small text-on-surface-variant">{sign.description}</p>
              <p className="mt-3 text-[0.66rem] uppercase tracking-[0.1em] text-outline">
                Maître : {sign.ruler}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Les acteurs" title="Les planètes" />
          <div className="mt-5 divide-y divide-primary/[0.07] rounded-2xl border border-primary/[0.08] bg-white">
            {PLANETS.map((planet) => (
              <div key={planet.key} className="flex items-start gap-3 p-4">
                <span className="w-6 shrink-0 pt-0.5 text-center font-symbol text-xl text-secondary">
                  {planet.glyph}
                </span>
                <div>
                  <p className="text-[0.85rem] font-medium text-primary">{planet.name}</p>
                  <p className="mt-0.5 text-[0.74rem] leading-relaxed text-on-surface-variant">
                    {planet.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Les domaines" title="Les 12 maisons" />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {HOUSES.map((house) => (
              <div key={house.number} className="rounded-xl border border-primary/[0.07] bg-white p-3">
                <p className="text-[0.62rem] uppercase tracking-[0.1em] text-secondary">
                  Maison {house.number}
                </p>
                <p className="mt-0.5 text-[0.8rem] font-medium text-primary">{house.title}</p>
                <p className="mt-0.5 text-[0.7rem] leading-relaxed text-on-surface-variant">{house.theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="La grammaire"
          title="Les aspects planétaires"
          intro="Un aspect est un angle entre deux planètes. Il décrit un dialogue, une tension ou une ressource entre deux fonctions psychiques."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ASPECTS.map((aspect) => (
            <article key={aspect.type} className="card p-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-secondary">{aspect.symbol}</span>
                <div>
                  <h3 className="text-title text-primary">{aspect.name}</h3>
                  <p className="text-[0.62rem] uppercase tracking-[0.1em] text-outline">
                    {aspect.angle}° · orbe ±{aspect.orb}°
                  </p>
                </div>
              </div>
              <p className="mt-2 text-small text-on-surface-variant">{aspect.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card p-6 sm:p-8">
        <SectionHeading eyebrow="Lire son résultat" title="Dans quel ordre regarder ?" />
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            'Commencez par les trois luminaires : Soleil, Lune, Ascendant. Ils donnent le ton général.',
            'Regardez les planètes personnelles (Mercure, Vénus, Mars) et leur maison pour comprendre le quotidien.',
            'Repérez les regroupements de planètes : les maisons concernées sont des zones d’intensité.',
            'Lisez ensuite les aspects les plus serrés : ce sont les dialogues les plus conscients.',
            'Terminez par les planètes lentes et les angles : elles donnent le contexte de fond.',
            'Rappelez-vous qu’un thème est un ensemble : aucune planète ne se lit isolément.',
          ].map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold bg-surface-container-low text-[0.7rem] text-secondary">
                {index + 1}
              </span>
              <span className="text-small text-on-surface-variant">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function NumerologieContent() {
  return (
    <div className="space-y-14">
      <section>
        <SectionHeading
          eyebrow="La méthode"
          title="Comment se calcule un thème numérologique"
          intro="La numérologie pythagoricienne convertit les lettres en chiffres de 1 à 9, puis réduit les sommes. Les nombres 11, 22 et 33 sont conservés."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="card overflow-hidden">
            <div className="border-b border-primary/[0.08] p-5">
              <h3 className="text-title text-primary">Table de correspondance</h3>
            </div>
            <div className="p-5 text-[0.8rem] leading-relaxed text-on-surface-variant">
              <p>A B C D E F G H I → 1 2 3 4 5 6 7 8 9</p>
              <p className="mt-1">J K L M N O P Q R → 1 2 3 4 5 6 7 8 9</p>
              <p className="mt-1">S T U V W X Y Z → 1 2 3 4 5 6 7 8</p>
              <p className="mt-3 text-[0.72rem] text-outline">
                Accents normalisés, ligatures œ/æ converties, traits d’union ignorés.
              </p>
            </div>
          </article>
          <article className="card p-5">
            <h3 className="text-title text-primary">Réduction théosophique</h3>
            <p className="mt-2 text-small text-on-surface-variant">
              Une somme supérieure à 9 est additionnée chiffre par chiffre. Exemple : 29 → 2 + 9 = 11.
              Le 11 est un nombre maître : on ne le réduit pas à 2, mais on lit aussi sa réduction 2.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="lavender">11 / 2</Pill>
              <Pill tone="lavender">22 / 4</Pill>
              <Pill tone="lavender">33 / 6</Pill>
            </div>
            <p className="mt-3 text-[0.72rem] leading-relaxed text-on-surface-variant">{MASTER_NUMBER_NOTE}</p>
          </article>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Les piliers" title="Les nombres et leur fonction" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Object.entries(PILLAR_EXPLANATIONS).map(([key, explanation]) => (
            <article key={key} className="card p-5">
              <h3 className="text-title capitalize text-primary">{key.replace('personalYear', 'année personnelle')}</h3>
              <p className="mt-2 text-small text-on-surface-variant">{explanation}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Les archétypes" title="De 1 à 9, et les maîtres" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(NUMBER_INTERPRETATIONS).map((interpretation) => (
            <article key={interpretation.number} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="font-light text-3xl text-primary">{interpretation.number}</span>
                <Pill tone="cream">{interpretation.keywords[0]}</Pill>
              </div>
              <h3 className="mt-2 text-title text-primary">{interpretation.lifePathTitle}</h3>
              <p className="mt-1 text-[0.74rem] leading-relaxed text-on-surface-variant">
                {interpretation.essence.split('.')[0]}.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="card p-6 sm:p-8">
        <SectionHeading eyebrow="Limites" title="Ce que la numérologie ne dit pas" />
        <ul className="mt-4 space-y-3 text-small text-on-surface-variant">
          {[
            'Elle n’annonce pas d’événements futurs et ne remplace pas une décision médicale, juridique ou financière.',
            'Elle dépend de l’orthographe exacte du nom de naissance et de conventions (comme le traitement du Y).',
            'Les interprétations sont symboliques : elles proposent des hypothèses de réflexion, pas des vérités sur votre personne.',
            'Un nombre maître n’est pas « supérieur » : il décrit une intensité et une responsabilité particulières.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function HumanDesignContent() {
  return (
    <div className="space-y-14">
      <section>
        <SectionHeading
          eyebrow="Les 5 types"
          title="Cinq manières d’interagir avec le monde"
          intro="Le type décrit une fréquence d’aura et une stratégie. Il ne hiérarchise pas les personnes."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(HD_TYPES).map((type) => (
            <article key={type.key} className="card p-5">
              <Pill tone="lavender">{type.name}</Pill>
              <h3 className="mt-3 text-title text-primary">{type.strategy}</h3>
              <p className="mt-2 text-small text-on-surface-variant">{type.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[0.62rem] uppercase tracking-[0.08em] text-outline">
                <span>Signature : {type.signature}</span>
                <span>·</span>
                <span>Non-soi : {type.notSelf}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Les autorités" title="Où se prend la décision" />
          <div className="mt-5 divide-y divide-primary/[0.07] rounded-2xl border border-primary/[0.08] bg-white">
            {Object.values(HD_AUTHORITIES).map((authority) => (
              <article key={authority.key} className="p-4">
                <h3 className="text-[0.85rem] font-medium text-primary">{authority.name}</h3>
                <p className="mt-1 text-[0.74rem] leading-relaxed text-on-surface-variant">{authority.description}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Les 9 centres" title="Forces stables et récepteurs" />
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {HD_CENTERS.map((center) => (
              <article key={center.key} className="rounded-xl border border-primary/[0.07] bg-white p-3">
                <h3 className="text-[0.82rem] font-medium text-primary">{center.name}</h3>
                <p className="mt-0.5 text-[0.7rem] text-on-surface-variant">{center.theme}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Les lignes" title="Les 6 profils d’incarnation" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(PROFILE_LINES).map(([line, info]) => (
            <article key={line} className="card p-5">
              <span className="font-light text-2xl text-primary">{line}</span>
              <h3 className="mt-1 text-title text-primary">{info.name}</h3>
              <p className="mt-2 text-small text-on-surface-variant">{info.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Les canaux" title="36 circuits énergétiques" />
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(HD_CHANNEL_NAMES).map(([key, channel]) => (
            <div key={key} className="rounded-xl border border-primary/[0.07] bg-white p-3">
              <p className="text-[0.62rem] uppercase tracking-[0.1em] text-secondary">Canal {key}</p>
              <p className="mt-0.5 text-[0.8rem] font-medium text-primary">{channel.name}</p>
              <p className="mt-0.5 text-[0.7rem] leading-relaxed text-on-surface-variant">{channel.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6 sm:p-8">
        <SectionHeading eyebrow="Posture" title="Comment utiliser votre BodyGraph" />
        <ol className="mt-4 space-y-3 text-small text-on-surface-variant">
          {[
            'Observez votre stratégie dans le quotidien avant de vouloir la « réussir ».',
            'Testez votre autorité sur de petites décisions, pas seulement sur les grandes.',
            'Considérez les centres ouverts comme des récepteurs, jamais comme des défauts.',
            'Ne transformez pas votre type en excuse ou en étiquette : c’est une hypothèse d’observation.',
            'Le Human Design est un modèle symbolique ; il ne remplace pas un accompagnement médical ou psychologique.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export function LearnPage() {
  const { discipline } = useParams<{ discipline: string }>();
  const config = discipline ? DISCIPLINES[discipline as DisciplineSlug] : undefined;

  usePageMeta(
    config ? `${config.title} | Astralis` : 'Comprendre | Astralis',
    config?.intro,
  );

  if (!config) return <NotFoundPage />;

  return (
    <>
      <section className="border-b border-primary/[0.06] bg-grain">
        <div className="container-astralis py-14 lg:py-20">
          <Link
            to={config.formPath}
            className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Retour au calculateur
          </Link>
          <div className="mt-7 max-w-3xl">
            <Pill tone="cream">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {config.label} · Comprendre
            </Pill>
            <h1 className="mt-4 text-balance text-display text-primary">{config.title}</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-on-surface-variant">{config.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={config.formPath} className={buttonStyles()}>
                {config.formLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={config.resultPath} className={buttonStyles({ variant: 'secondary' })}>
                Revenir à mes résultats
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-astralis py-14 lg:py-20">
        {discipline === 'astrologie' ? <AstrologieContent /> : null}
        {discipline === 'numerologie' ? <NumerologieContent /> : null}
        {discipline === 'human-design' ? <HumanDesignContent /> : null}
        <ArtDecoDivider className="my-14" />
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-gold/70 bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-secondary">Passer à la pratique</p>
            <h2 className="mt-1 text-h3 text-primary">Calculer votre propre profil</h2>
            <p className="mt-1 max-w-xl text-small text-on-surface-variant">
              Les calculateurs sont gratuits, sans compte, et vos données restent dans votre navigateur.
            </p>
          </div>
          <Link to={config.formPath} className={buttonStyles({ variant: 'secondary' })}>
            <Compass className="h-4 w-4" aria-hidden="true" />
            {config.formLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
