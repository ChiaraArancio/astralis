import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Info, Layers, Sparkles, Zap } from 'lucide-react';
import { HumanDesignError, computeHumanDesign } from '../lib/humandesign/engine';
import { HD_CENTERS } from '../lib/humandesign/labels';
import { loadHumanDesignInput, clearDiscipline } from '../lib/storage';
import { formatClockFr, formatDateFr } from '../lib/timezone';
import { placeLabel } from '../lib/geo';
import { usePageMeta } from '../lib/usePageMeta';
import { BodyGraph } from '../components/charts/BodyGraph';
import { EmptyResult, ResultHero, ResultsActions, DisclosureNote } from '../components/results/ResultLayout';
import { Pill, SectionHeading } from '../components/ui/Ornaments';
import { cn } from '../lib/cn';

export function HumanDesignResultPage() {
  const navigate = useNavigate();
  const input = useMemo(() => loadHumanDesignInput(), []);
  usePageMeta(
    input ? `Human Design de ${input.firstName} | Astralis` : 'Résultat Human Design | Astralis',
    'Votre BodyGraph calculé localement : type, stratégie, autorité, profil, centres, canaux et activations.',
  );

  if (!input) {
    return <EmptyResult discipline="Human Design" formPath="/human-design" label="Générer mon BodyGraph" />;
  }

  let result: ReturnType<typeof computeHumanDesign> | null = null;
  let error: string | null = null;
  let errorCode: string | null = null;
  try {
    result = computeHumanDesign(input);
  } catch (calculationError) {
    error =
      calculationError instanceof Error
        ? calculationError.message
        : 'Le calcul du BodyGraph a échoué.';
    errorCode = calculationError instanceof HumanDesignError ? calculationError.code : null;
  }

  function clearAndReturn() {
    clearDiscipline('humanDesign');
    navigate('/human-design');
  }

  if (error || !result) {
    return (
      <section className="container-astralis py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-error/20 bg-white p-8 shadow-ethereal">
          <AlertTriangle className="mb-4 h-6 w-6 text-error" aria-hidden="true" />
          <h1 className="text-h3 text-primary">
            {errorCode === 'TIME_REQUIRED' ? 'L’heure exacte est indispensable' : 'Le calcul n’a pas pu aboutir'}
          </h1>
          <p className="mt-3 text-body text-on-surface-variant">{error}</p>
          {errorCode === 'TIME_REQUIRED' ? (
            <p className="mt-3 text-small text-on-surface-variant">
              Consultez votre acte de naissance ou votre carnet de santé. En France, une copie
              intégrale est disponible gratuitement en mairie. Vous pouvez aussi utiliser le
              calculateur astral en mode « heure inconnue », qui signale clairement ses limites.
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearAndReturn}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-surface"
            >
              Revenir au formulaire
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            {errorCode === 'TIME_REQUIRED' ? (
              <button
                type="button"
                onClick={() => navigate('/theme-astral')}
                className="inline-flex items-center gap-2 rounded-lg border border-secondary/35 px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-primary"
              >
                Calcul astral sans heure
              </button>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <ResultHero
        eyebrow="Étape 2 · BodyGraph & mécanique énergétique"
        title={`Votre BodyGraph, ${result.input.firstName}`}
        summary={`${result.typeInfo.name} · Profil ${result.profile ?? '—'} · ${result.authorityInfo.name}. ${result.typeInfo.description.split('.')[0]}.`}
        onClear={clearAndReturn}
        formPath="/human-design"
        meta={
          <>
            <Pill tone="lavender">
              <Zap className="h-3 w-3" aria-hidden="true" />
              {result.typeInfo.name}
            </Pill>
            <Pill tone="gold">Profil {result.profile ?? '—'}</Pill>
            <Pill tone="cream">{result.definitionLabel}</Pill>
            <Pill tone="outline">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Calcul local
            </Pill>
          </>
        }
      >
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.76rem] text-on-surface-variant">
          <span>{formatDateFr(result.input.birthDate)} à {formatClockFr(result.input.birthTime)}</span>
          <span className="h-3 w-px bg-outline-variant" aria-hidden="true" />
          <span>{placeLabel(result.input.place)}</span>
          <span className="h-3 w-px bg-outline-variant" aria-hidden="true" />
          <span>{result.input.place.timezone}</span>
        </div>
      </ResultHero>

      <section className="container-astralis py-12 lg:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Type', value: result.typeInfo.name, detail: result.aura },
            { label: 'Stratégie', value: result.strategy, detail: 'Votre mode d’action naturel' },
            { label: 'Autorité', value: result.authorityInfo.name, detail: result.authorityInfo.short },
            { label: 'Profil', value: result.profile ?? '—', detail: result.profileInfo?.title ?? '—' },
          ].map((item) => (
            <article key={item.label} className="card p-5">
              <p className="eyebrow text-secondary">{item.label}</p>
              <p className="mt-2 text-[1rem] font-medium leading-snug text-primary">{item.value}</p>
              <p className="mt-1 text-[0.72rem] text-on-surface-variant">{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="card-gold overflow-hidden p-3 sm:p-5">
            <BodyGraph result={result} className="mx-auto h-auto w-full max-w-[560px]" />
          </div>
          <div className="flex flex-col gap-4">
            <article className="card p-6">
              <p className="eyebrow text-secondary">Signature</p>
              <p className="mt-2 text-h3 text-primary">{result.signature}</p>
              <p className="mt-2 text-small text-on-surface-variant">
                La signature est l’indicateur d’un fonctionnement aligné. Elle n’est pas une
                récompense à mériter : elle émerge lorsque la stratégie et l’autorité sont respectées.
              </p>
            </article>
            <article className="card p-6">
              <p className="eyebrow text-secondary">Non-soi</p>
              <p className="mt-2 text-h3 text-primary">{result.notSelf}</p>
              <p className="mt-2 text-small text-on-surface-variant">
                Le non-soi signale que vous agissez contre votre mécanique, souvent pour répondre à
                une attente extérieure. Il indique un ajustement, pas une faute.
              </p>
            </article>
            <article className="card p-6">
              <p className="eyebrow text-secondary">Définition</p>
              <p className="mt-2 text-[1rem] font-medium text-primary">{result.definitionLabel}</p>
              <p className="mt-2 text-small text-on-surface-variant">
                {result.definedCenters.length} centre{result.definedCenters.length > 1 ? 's' : ''} défini
                {result.definedCenters.length > 1 ? 's' : ''} · {result.channels.length} canal
                {result.channels.length > 1 ? 'aux' : ''} activé{result.channels.length > 1 ? 's' : ''}.
                Une définition multiple décrit plusieurs groupes de centres qui ne se parlent pas
                directement.
              </p>
            </article>
          </div>
        </div>

        <div className="mt-12">
          <SectionHeading
            eyebrow="Autorité & stratégie"
            title="Comment prendre une décision qui vous ressemble"
            intro="Le mental peut analyser, comparer et raconter. Votre autorité indique le lieu du corps ou de l’expérience qui tranche réellement."
          />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="card p-6">
              <p className="eyebrow text-secondary">{result.authorityInfo.name}</p>
              <p className="mt-3 text-body text-on-surface-variant">{result.authorityInfo.description}</p>
              {result.authorityInfo.question ? (
                <p className="mt-4 rounded-lg bg-surface-container-low p-3 text-[0.78rem] italic leading-relaxed text-secondary">
                  « {result.authorityInfo.question} »
                </p>
              ) : null}
            </article>
            <article className="card p-6">
              <p className="eyebrow text-secondary">Stratégie {result.typeInfo.name.toLowerCase()}</p>
              <p className="mt-2 text-h3 text-primary">{result.strategy}</p>
              <p className="mt-3 text-body text-on-surface-variant">{result.typeInfo.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {result.typeInfo.keywords.map((keyword) => (
                  <Pill key={keyword} tone="cream" className="px-2 py-0.5 text-[0.58rem]">
                    {keyword}
                  </Pill>
                ))}
              </div>
            </article>
          </div>
          {result.profileInfo ? (
            <article className="card mt-5 p-6">
              <p className="eyebrow text-secondary">Profil d’incarnation</p>
              <h3 className="mt-2 text-h3 text-primary">{result.profileInfo.title}</h3>
              <p className="mt-3 text-body text-on-surface-variant">{result.profileInfo.description}</p>
            </article>
          ) : null}
        </div>

        <div className="mt-12">
          <SectionHeading
            eyebrow="Cartographie des 9 centres"
            title="Vos forces stables, vos zones de réceptivité"
            intro="Les centres définis sont des sources constantes. Les centres ouverts sont des récepteurs : ils peuvent être conditionnés, mais aussi devenir des lieux de grande sagesse."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.centers.map((center) => {
              const info = HD_CENTERS.find((entry) => entry.key === center.key);
              return (
                <article
                  key={center.key}
                  className={cn(
                    'rounded-2xl border p-5',
                    center.defined ? 'border-primary/20 bg-primary-container text-surface' : 'border-primary/[0.08] bg-white',
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={cn('text-title', center.defined ? 'text-surface' : 'text-primary')}>
                      {center.name}
                    </h3>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em]',
                        center.defined ? 'bg-surface/15 text-surface' : 'bg-surface-container text-on-surface-variant',
                      )}
                    >
                      {center.defined ? 'Défini' : 'Ouvert'}
                    </span>
                  </div>
                  <p className={cn('mt-1 text-[0.66rem] uppercase tracking-[0.1em]', center.defined ? 'text-surface/60' : 'text-secondary')}>
                    {info?.theme}
                  </p>
                  <p className={cn('mt-3 text-[0.76rem] leading-relaxed', center.defined ? 'text-surface/80' : 'text-on-surface-variant')}>
                    {center.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Canaux activés"
              title="Les circuits qui vous définissent"
              intro="Un canal est actif lorsque ses deux portes sont activées, consciemment ou inconsciemment."
            />
            {result.channels.length > 0 ? (
              <div className="mt-5 divide-y divide-primary/[0.07] rounded-2xl border border-primary/[0.08] bg-white">
                {result.channels.map((channel) => (
                  <article key={channel.key} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[0.85rem] font-medium text-primary">
                        Canal {channel.key} · {channel.name}
                      </p>
                      <Pill tone="gold" className="shrink-0 px-2 py-0.5 text-[0.56rem]">
                        {channel.gates.join(' – ')}
                      </Pill>
                    </div>
                    <p className="mt-1 text-[0.74rem] leading-relaxed text-on-surface-variant">
                      {channel.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <DisclosureNote className="mt-5">
                Aucun canal n’est défini dans ce BodyGraph. Cela ne signifie pas qu’il n’y a pas de
                ressources : les portes activées et les centres ouverts décrivent une autre manière de
                circuler l’énergie.
              </DisclosureNote>
            )}
          </div>

          <div>
            <SectionHeading
              eyebrow="26 activations"
              title="Vos portes conscientes & inconscientes"
              intro="La colonne Personnalité correspond à la naissance. La colonne Design correspond à l’empreinte environ 88° de Soleil avant la naissance."
            />
            <div className="mt-5 overflow-hidden rounded-2xl border border-primary/[0.08] bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">Portes activées par planète, en conscient et inconscient</caption>
                <thead className="bg-surface-container-low text-[0.6rem] uppercase tracking-[0.1em] text-secondary">
                  <tr>
                    <th scope="col" className="px-3 py-3 font-semibold">Planète</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Personnalité</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Design</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/[0.06]">
                  {result.activations.personality.map((activation) => {
                    const design = result.activations.design.find((entry) => entry.body === activation.body);
                    return (
                      <tr key={activation.body}>
                        <th scope="row" className="px-3 py-2.5 text-[0.78rem] font-medium text-primary">
                          <span className="mr-1.5 font-symbol text-secondary">{activation.glyph}</span>
                          {activation.planetName}
                        </th>
                        <td className="px-3 py-2.5 text-[0.76rem] text-on-surface-variant">
                          Porte {activation.gate} · {activation.line}
                          <span className="ml-1 text-outline">({activation.gateName})</span>
                        </td>
                        <td className="px-3 py-2.5 text-[0.76rem] text-on-surface-variant">
                          {design ? `Porte ${design.gate} · ${design.line}` : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[0.68rem] text-outline">
              Le chiffre après la porte correspond à la ligne (1 à 6). Les couleurs et tonalités ne
              sont pas détaillées dans cette version.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="card p-6">
            <div className="flex items-start gap-3">
              <Layers className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
              <div>
                <p className="eyebrow text-secondary">Lecture des centres ouverts</p>
                <p className="mt-2 text-small leading-relaxed text-on-surface-variant">
                  Vos centres ouverts ({result.openCenters.length}) sont des zones d’apprentissage par
                  l’environnement. Ils ne sont pas des faiblesses : ce sont des espaces de perception
                  fine, à condition de ne pas s’y perdre. Le conditionnement devient une information,
                  pas une identité.
                </p>
              </div>
            </div>
          </article>
          <article className="card p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
              <div>
                <p className="eyebrow text-secondary">Note de méthode</p>
                <p className="mt-2 text-small leading-relaxed text-on-surface-variant">
                  Le BodyGraph est calculé avec la matrice canonique du Human Design : 64 portes,
                  36 canaux, 9 centres et 26 activations. Les positions astronomiques proviennent
                  d’Astronomy Engine (MIT). Le Human Design reste un modèle symbolique, non une
                  théorie physique validée.
                </p>
              </div>
            </div>
          </article>
        </div>

        <DisclosureNote className="mt-8">
          Ce résultat est un outil de connaissance de soi. Il ne constitue ni un diagnostic médical
          ou psychologique, ni une prédiction, ni une injonction à suivre une stratégie. Vous restez
          libre de votre interprétation.
        </DisclosureNote>
      </section>

      <ResultsActions
        discipline="humanDesign"
        disciplineLabel="Human Design"
        formPath="/human-design"
        premiumTitle="L’analyse approfondie du BodyGraph arrive bientôt"
        premiumContent={[
          'Décryptage détaillé des 9 centres et des canaux activés',
          'Lecture de la croix d’incarnation et des portes conscientes/inconscientes',
          'Guide pratique de déconditionnement, sans injonction',
        ]}
      />
    </>
  );
}
