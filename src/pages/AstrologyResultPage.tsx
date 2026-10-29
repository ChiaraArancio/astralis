import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Info,
  Sparkles,
  Telescope,
} from 'lucide-react';
import { computeAstrology } from '../lib/astrology/engine';
import { HOUSES } from '../lib/astrology/data';
import {
  ASTROLOGY_DISCLAIMER,
  aspectSummary,
  bigThreeReadings,
  elementReading,
  houseEmphasis,
  houseReading,
} from '../lib/astrology/reading';
import { loadAstrologyInput, clearDiscipline } from '../lib/storage';
import { usePageMeta } from '../lib/usePageMeta';
import { NatalWheel } from '../components/charts/NatalWheel';
import { DisclosureNote, EmptyResult, ResultHero, ResultsActions } from '../components/results/ResultLayout';
import { Pill, SectionHeading } from '../components/ui/Ornaments';
import { cn } from '../lib/cn';

function SignGlyph({ glyph, className }: { glyph: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex items-center justify-center font-symbol leading-none', className)}
    >
      {glyph}
    </span>
  );
}

export function AstrologyResultPage() {
  const navigate = useNavigate();
  const input = useMemo(() => loadAstrologyInput(), []);
  usePageMeta(
    input ? `Thème astral de ${input.firstName} | Astralis` : 'Résultat du thème astral | Astralis',
    'Résultat de votre thème astral calculé localement : Soleil, Lune, Ascendant, planètes, maisons et aspects.',
  );

  if (!input) {
    return (
      <EmptyResult
        discipline="astral"
        formPath="/theme-astral"
        label="Calculer mon thème astral"
      />
    );
  }

  let result: ReturnType<typeof computeAstrology> | null = null;
  let error: string | null = null;
  try {
    result = computeAstrology(input);
  } catch (calculationError) {
    error =
      calculationError instanceof Error
        ? calculationError.message
        : 'Le calcul du thème a échoué. Vérifiez vos données.';
  }

  function clearAndReturn() {
    clearDiscipline('astrology');
    navigate('/theme-astral');
  }

  if (error || !result) {
    return (
      <>
        <section className="container-astralis py-20">
          <div className="mx-auto max-w-2xl rounded-2xl border border-error/20 bg-white p-8 shadow-ethereal">
            <AlertTriangle className="mb-4 h-6 w-6 text-error" aria-hidden="true" />
            <h1 className="text-h3 text-primary">Le calcul n’a pas pu aboutir</h1>
            <p className="mt-3 text-body text-on-surface-variant">{error}</p>
            <button
              type="button"
              onClick={clearAndReturn}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-container px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-surface"
            >
              Revenir au formulaire
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      </>
    );
  }

  const readings = bigThreeReadings(result);
  const dominantHouses = houseEmphasis(result.planets);
  const houseMap = new Map<number, (typeof HOUSES)[number]>(HOUSES.map((house) => [house.number, house]));

  return (
    <>
      <ResultHero
        eyebrow={result.unknownTime ? 'Étape 2 · Carte solaire simplifiée' : 'Étape 2 · Synthèse thématique'}
        title={`Cartographie céleste de ${result.input.firstName}`}
        summary={result.localSummary}
        onClear={clearAndReturn}
        formPath="/theme-astral"
        meta={
          <>
            <Pill tone="cream">
              <Telescope className="h-3 w-3" aria-hidden="true" />
              {result.unknownTime ? 'Heure inconnue' : 'Thème complet'}
            </Pill>
            <Pill tone="gold">
              {result.unknownTime ? 'Signes stables uniquement' : 'Maisons Placidus'}
            </Pill>
            <Pill tone="outline">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Calcul local
            </Pill>
          </>
        }
      >
        {result.unknownTime ? (
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-secondary/25 bg-secondary-container/40 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
            <div className="text-[0.8rem] leading-relaxed text-on-secondary-container">
              <p className="font-semibold">Votre heure de naissance n’a pas été renseignée.</p>
              <p className="mt-1">
                Astralis ne fabrique pas d’heure. Le Soleil, la Lune et les planètes sont indiqués
                uniquement lorsqu’ils restent dans le même signe sur toute la journée. L’Ascendant,
                le Milieu du Ciel, les maisons et les aspects ne sont pas calculés, car ils en
                dépendent directement.
              </p>
            </div>
          </div>
        ) : null}
      </ResultHero>

      <section className="container-astralis py-12 lg:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {readings.map((reading) => (
            <article
              key={reading.key}
              className={cn(
                'card-gold relative flex flex-col overflow-hidden p-6',
                reading.key === 'rising' && 'bg-surface-container-low',
              )}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow text-secondary">{reading.eyebrow}</p>
                  <h2 className="mt-1 text-title text-primary">{reading.label}</h2>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/80 bg-white text-2xl text-secondary">
                  {reading.sign ? <SignGlyph glyph={reading.sign.glyph} /> : '—'}
                </span>
              </div>
              <p className="text-[1.05rem] font-medium text-primary">{reading.title}</p>
              <p className="mt-2 text-small text-on-surface-variant">{reading.text}</p>
              {reading.sign ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {reading.strengths.slice(0, 3).map((strength) => (
                    <Pill key={strength} tone="cream" className="px-2 py-0.5 text-[0.58rem]">
                      {strength}
                    </Pill>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {result.unknownTime ? (
          <div className="mt-10">
            <SectionHeading
              eyebrow="Lecture prudente"
              title="Ce qui reste fiable sans l’heure"
              intro="Les signes ci-dessous ont été vérifiés à plusieurs moments de la journée. Lorsqu’un astre change de signe, nous l’indiquons au lieu de choisir une position arbitraire."
            />
            <div className="mt-6 overflow-hidden rounded-2xl border border-primary/[0.08] bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Signes stables sur la journée de naissance, sans heure connue
                </caption>
                <thead className="bg-surface-container-low text-[0.66rem] uppercase tracking-[0.12em] text-secondary">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Astre</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Signe</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Fiabilité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/[0.06]">
                  {result.planets.map((planet) => (
                    <tr key={planet.key}>
                      <th scope="row" className="px-4 py-3 text-[0.82rem] font-medium text-primary">
                        <span className="mr-2 font-symbol text-secondary">{planet.glyph}</span>
                        {planet.name}
                      </th>
                      <td className="px-4 py-3 text-[0.82rem] text-on-surface-variant">
                        {planet.sign ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="font-symbol text-base text-secondary">{planet.sign.glyph}</span>
                            {planet.sign.name}
                          </span>
                        ) : (
                          <span className="text-[#93000a]">Indéterminé ce jour-là</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[0.74rem] text-on-surface-variant">
                        {planet.stable ? 'Stable sur la journée' : 'Change de signe'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <DisclosureNote className="mt-4">
              Pour obtenir un thème complet, renseignez l’heure exacte sur votre acte de naissance.
              En France, une copie intégrale peut être demandée gratuitement en mairie.
            </DisclosureNote>
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="card-gold overflow-hidden p-3 sm:p-5">
                <NatalWheel result={result} className="mx-auto h-auto w-full max-w-[640px]" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="card p-6">
                  <p className="eyebrow text-secondary">Repères angulaires</p>
                  <div className="mt-4 space-y-3">
                    {result.angles
                      ? [
                          ['Ascendant', result.angles.ascendant.formatted],
                          ['Milieu du Ciel', result.angles.midheaven.formatted],
                          ['Descendant', result.angles.descendant.formatted],
                          ['Fond du Ciel', result.angles.imumCoeli.formatted],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between gap-4 border-b border-primary/[0.06] pb-2 last:border-0 last:pb-0">
                            <span className="text-[0.74rem] uppercase tracking-[0.09em] text-secondary">{label}</span>
                            <span className="text-[0.85rem] font-medium text-primary">{value}</span>
                          </div>
                        ))
                      : null}
                  </div>
                </div>

                <div className="card p-6">
                  <p className="eyebrow text-secondary">Gouverneur du thème</p>
                  <p className="mt-2 text-[1.05rem] font-medium text-primary">{result.chartRuler}</p>
                  <p className="mt-1 text-small text-on-surface-variant">
                    Planète maîtresse du signe ascendant. Elle nuance la manière dont le thème
                    s’exprime au quotidien.
                  </p>
                </div>

                <div className="card p-6">
                  <p className="eyebrow text-secondary">Répartition des éléments</p>
                  <div className="mt-4 space-y-3">
                    {result.elementBalance?.map((element) => (
                      <div key={element.element}>
                        <div className="mb-1 flex items-center justify-between text-[0.74rem] text-on-surface-variant">
                          <span>{element.element}</span>
                          <span>{element.count} planète{element.count > 1 ? 's' : ''}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-surface-container">
                          <div
                            className="h-full rounded-full bg-secondary"
                            style={{ width: `${element.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <SectionHeading
                eyebrow="Positions planétaires"
                title="Votre ciel, planète par planète"
                intro="Les positions sont calculées en tropical, à l’instant exact de votre naissance, puis situées dans les maisons Placidus."
              />
              <div className="mt-6 overflow-x-auto rounded-2xl border border-primary/[0.08] bg-white">
                <table className="w-full min-w-[680px] text-left">
                  <caption className="sr-only">Positions des planètes, maisons et rétrogradations</caption>
                  <thead className="bg-surface-container-low text-[0.64rem] uppercase tracking-[0.12em] text-secondary">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Planète</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Position</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Signe</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Maison</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Mouvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/[0.06]">
                    {result.planets.map((planet) => (
                      <tr key={planet.key}>
                        <th scope="row" className="px-4 py-3 text-[0.82rem] font-medium text-primary">
                          <span className="mr-2 font-symbol text-base text-secondary">{planet.glyph}</span>
                          {planet.name}
                        </th>
                        <td className="px-4 py-3 text-[0.8rem] tabular text-on-surface-variant">{planet.formatted}</td>
                        <td className="px-4 py-3 text-[0.8rem] text-on-surface-variant">
                          <span className="mr-1.5 font-symbol text-base text-secondary">{planet.sign?.glyph}</span>
                          {planet.sign?.name}
                        </td>
                        <td className="px-4 py-3 text-[0.8rem] text-on-surface-variant">
                          {planet.house ? `Maison ${planet.house}` : '—'}
                        </td>
                        <td className="px-4 py-3 text-[0.74rem] text-on-surface-variant">
                          {planet.retrograde ? (
                            <span className="rounded-full bg-secondary-container px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.08em] text-on-secondary-container">
                              Rétrograde
                            </span>
                          ) : (
                            'Direct'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[0.68rem] text-outline">
                Le Nœud Nord est calculé en nœud moyen. La position de Pluton et des planètes lentes
                varie peu dans une journée ; celle de la Lune est la plus sensible à l’heure.
              </p>
              {result.houseSystemNote ? (
                <DisclosureNote className="mt-3">{result.houseSystemNote}</DisclosureNote>
              ) : null}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div>
                <SectionHeading eyebrow="Maisons" title="Les domaines de vie activés" />
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {result.houses?.map((house) => {
                    const info = houseMap.get(house.number);
                    return (
                      <article key={house.number} className="card p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[0.66rem] uppercase tracking-[0.12em] text-secondary">
                            Maison {house.number}
                          </span>
                          <span className="font-symbol text-lg text-secondary">{house.sign.glyph}</span>
                        </div>
                        <h3 className="mt-1 text-[0.85rem] font-medium text-primary">{info?.title}</h3>
                        <p className="mt-1 text-[0.72rem] text-on-surface-variant">{house.formatted}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
              <div>
                <SectionHeading eyebrow="Aspects" title="Les dialogues planétaires" />
                <p className="mt-3 text-small text-on-surface-variant">{aspectSummary(result)}</p>
                <div className="mt-5 divide-y divide-primary/[0.07] rounded-2xl border border-primary/[0.08] bg-white">
                  {result.aspects.slice(0, 14).map((aspect) => (
                    <article key={`${aspect.a}-${aspect.b}-${aspect.type}`} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.82rem] font-medium text-primary">
                          {aspect.aName} <span className="text-secondary">{aspect.symbol} {aspect.name}</span>{' '}
                          {aspect.bName}
                        </p>
                        <span className="shrink-0 text-[0.66rem] uppercase tracking-[0.08em] text-outline">
                          orbe {aspect.orb}°
                        </span>
                      </div>
                      <p className="mt-1 text-[0.74rem] leading-relaxed text-on-surface-variant">
                        {aspect.description}
                      </p>
                    </article>
                  ))}
                  {result.aspects.length > 14 ? (
                    <p className="p-4 text-[0.72rem] text-outline">
                      {result.aspects.length - 14} autres aspects mineurs sont calculés dans votre
                      thème ; les plus serrés sont affichés en priorité.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <article className="card p-6">
                <p className="eyebrow text-secondary">Lecture élémentaire</p>
                <p className="mt-3 text-body text-on-surface-variant">{elementReading(result.elementBalance)}</p>
              </article>
              <article className="card p-6">
                <p className="eyebrow text-secondary">Domaines dominants</p>
                <p className="mt-3 text-body text-on-surface-variant">{houseReading(result)}</p>
                {dominantHouses.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {dominantHouses.map((entry) => (
                      <Pill key={entry.house} tone="gold">
                        Maison {entry.house} · {entry.count} planète{entry.count > 1 ? 's' : ''}
                      </Pill>
                    ))}
                  </div>
                ) : null}
              </article>
            </div>

            <DisclosureNote className="mt-8 flex items-start gap-2.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
              <span>{ASTROLOGY_DISCLAIMER}</span>
            </DisclosureNote>
          </>
        )}
      </section>

      <ResultsActions
        discipline="astrology"
        disciplineLabel="astrologie"
        formPath="/theme-astral"
        premiumTitle="L’analyse astrologique approfondie arrive bientôt"
        premiumContent={[
          'Décodage exhaustif des 12 maisons et des aspects majeurs',
          'Synthèse des cycles planétaires et des transits à venir',
          'Document PDF relié, conçu pour être imprimé et annoté',
        ]}
      />
    </>
  );
}
