import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Sparkles, Star } from 'lucide-react';
import { computeNumerology, numberLabel, type NumerologyNumber } from '../lib/numerology/core';
import {
  MASTER_NUMBER_NOTE,
  PILLAR_EXPLANATIONS,
  getNumberInterpretation,
} from '../lib/numerology/interpretations';
import { loadNumerologyInput, clearDiscipline } from '../lib/storage';
import { formatDateFr } from '../lib/timezone';
import { usePageMeta } from '../lib/usePageMeta';
import { EmptyResult, ResultHero, ResultsActions, DisclosureNote } from '../components/results/ResultLayout';
import { Pill, SectionHeading } from '../components/ui/Ornaments';
import { cn } from '../lib/cn';

function NumberSeal({
  value,
  label,
  size = 'md',
}: {
  value: NumerologyNumber | 0;
  label: string;
  size?: 'md' | 'lg';
}) {
  const isMaster = value === 11 || value === 22 || value === 33;
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center justify-center rounded-full border text-center',
        isMaster ? 'border-lavender bg-tertiary-fixed/60' : 'border-gold bg-surface-container-low',
        size === 'lg' ? 'h-24 w-24' : 'h-16 w-16',
      )}
      aria-label={`${label} : ${numberLabel(value)}`}
    >
      <span className={cn('font-light leading-none text-primary', size === 'lg' ? 'text-5xl' : 'text-2xl')}>
        {value || '—'}
      </span>
      {isMaster ? <span className="mt-0.5 text-[0.55rem] uppercase tracking-[0.1em] text-secondary">maître</span> : null}
    </div>
  );
}

function PillarReading({
  title,
  subtitle,
  value,
  interpretation,
  archetype,
  trace,
  explanation,
}: {
  title: string;
  subtitle: string;
  value: NumerologyNumber | 0;
  archetype?: string;
  interpretation: ReturnType<typeof getNumberInterpretation>;
  trace: string;
  explanation: string;
}) {
  return (
    <article className="card p-6">
      <div className="flex items-start gap-4">
        <NumberSeal value={value} label={title} />
        <div className="min-w-0">
          <p className="eyebrow text-secondary">{subtitle}</p>
          <h3 className="mt-1 text-h3 text-primary">{title}</h3>
          <p className="mt-1 text-[0.82rem] font-medium text-secondary">
            {archetype ?? 'Vibration à explorer'}
          </p>
        </div>
      </div>
      <p className="mt-4 text-small text-on-surface-variant">{interpretation?.essence}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-surface-container-low p-3">
          <p className="eyebrow mb-1 text-[0.58rem] text-secondary">Forces</p>
          <p className="text-[0.76rem] text-on-surface-variant">
            {interpretation?.strengths.join(' · ')}
          </p>
        </div>
        <div className="rounded-lg bg-surface-container-low p-3">
          <p className="eyebrow mb-1 text-[0.58rem] text-secondary">Défis</p>
          <p className="text-[0.76rem] text-on-surface-variant">
            {interpretation?.challenges.join(' · ')}
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-primary/[0.07] pt-3">
        <p className="text-[0.72rem] leading-relaxed text-on-surface-variant">{explanation}</p>
        <details className="mt-2 text-[0.7rem] text-outline">
          <summary className="cursor-pointer font-medium text-secondary underline underline-offset-2">
            Voir le détail du calcul
          </summary>
          <p className="mt-1 break-words tabular">{trace}</p>
        </details>
      </div>
    </article>
  );
}

export function NumerologyResultPage() {
  const navigate = useNavigate();
  const input = useMemo(() => loadNumerologyInput(), []);
  usePageMeta(
    input ? `Numérologie de ${input.firstName} | Astralis` : 'Résultat numérologique | Astralis',
    'Votre synthèse numérologique pythagoricienne : chemin de vie, expression, élan spirituel, personnalité, année personnelle et grille d’inclusion.',
  );

  if (!input) {
    return <EmptyResult discipline="numérologique" formPath="/numerologie" label="Calculer ma numérologie" />;
  }

  const result = computeNumerology(input);
  const life = getNumberInterpretation(result.lifePath.number);
  const expression = getNumberInterpretation(result.expression.number);
  const soul = getNumberInterpretation(result.soulUrge.number);
  const personality = getNumberInterpretation(result.personality.number);
  const maturity = getNumberInterpretation(result.maturity.number);
  const year = getNumberInterpretation(result.personalYear.number);

  function clearAndReturn() {
    clearDiscipline('numerology');
    navigate('/numerologie');
  }

  return (
    <>
      <ResultHero
        eyebrow="Étape 2 · Synthèse numérologique"
        title={`Votre architecture numérologique, ${result.firstName}`}
        summary={`Profil établi pour ${result.fullName}, né·e le ${formatDateFr(result.birthDate)}. Les calculs suivent la table pythagoricienne et conservent les nombres maîtres.`}
        onClear={clearAndReturn}
        formPath="/numerologie"
        meta={
          <>
            <Pill tone="gold">
              <Star className="h-3 w-3" aria-hidden="true" />
              Année personnelle {result.personalYear.year}
            </Pill>
            <Pill tone="cream">Méthode 1 à 9</Pill>
            {result.hasMasterNumber ? <Pill tone="lavender">Nombre maître présent</Pill> : null}
            <Pill tone="outline">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Calcul local
            </Pill>
          </>
        }
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
          <NumberSeal value={result.lifePath.number} label="Chemin de vie" size="lg" />
          <div>
            <p className="eyebrow text-secondary">Pilier majeur · Chemin de vie</p>
            <h2 className="mt-1 text-h2 text-primary">
              {numberLabel(result.lifePath.number)} — {life?.lifePathTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-body text-on-surface-variant">{life?.essence}</p>
          </div>
        </div>
      </ResultHero>

      <section className="container-astralis py-12 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              key: 'expression',
              title: 'Expression',
              value: result.expression.number,
              interpretation: expression,
              archetype: expression?.expressionTitle,
              trace: result.expression.trace.expression,
            },
            {
              key: 'soulUrge',
              title: 'Élan spirituel',
              value: result.soulUrge.number,
              interpretation: soul,
              archetype: soul?.soulUrgeTitle,
              trace: result.soulUrge.trace.expression,
            },
            {
              key: 'personality',
              title: 'Personnalité',
              value: result.personality.number,
              interpretation: personality,
              archetype: personality?.personalityTitle,
              trace: result.personality.trace.expression,
            },
            {
              key: 'maturity',
              title: 'Maturité',
              value: result.maturity.number,
              interpretation: maturity,
              archetype: maturity?.lifePathTitle,
              trace: result.maturity.trace.expression,
            },
          ].map((pillar) => (
            <article key={pillar.key} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="eyebrow text-secondary">{pillar.title}</p>
                <span className="font-light text-3xl text-primary">{pillar.value || '—'}</span>
              </div>
              <p className="mt-2 text-[0.82rem] font-medium text-primary">
                {pillar.archetype}
              </p>
              <p className="mt-1 text-[0.72rem] leading-relaxed text-on-surface-variant">
                {pillar.interpretation?.essence.split('.')[0]}.
              </p>
              <details className="mt-3 text-[0.66rem] text-outline">
                <summary className="cursor-pointer text-secondary underline underline-offset-2">
                  Calcul
                </summary>
                <p className="mt-1 break-words tabular">{pillar.trace}</p>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-primary/[0.06] bg-surface-container-low">
        <div className="container-astralis py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Cycles & inclusion"
                title={`Année personnelle ${result.personalYear.year}`}
                intro={PILLAR_EXPLANATIONS.personalYear}
              />
              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-gold/70 bg-white p-5">
                <NumberSeal value={result.personalYear.number} label="Année personnelle" />
                <div>
                  <p className="text-[0.9rem] font-medium text-primary">{year?.personalYearTitle}</p>
                  <p className="mt-1 text-small text-on-surface-variant">{year?.personalYearText}</p>
                </div>
              </div>
              <details className="mt-3 text-[0.7rem] text-outline">
                <summary className="cursor-pointer text-secondary underline underline-offset-2">
                  Voir le calcul de l’année personnelle
                </summary>
                <p className="mt-1 tabular">{result.personalYear.trace.expression}</p>
              </details>
            </div>

            <div>
              <SectionHeading
                eyebrow="Grille d’inclusion"
                title="Vos nombres, vos absences"
                intro="La grille compte les chiffres présents dans votre nom complet et votre date de naissance. Les nombres absents sont des « leçons karmiques » : des qualités à développer, jamais des manques définitifs."
              />
              <div className="mt-5 rounded-2xl border border-primary/[0.08] bg-white p-4">
                <div className="grid grid-cols-3 gap-2">
                  {result.inclusionGrid.map((count, index) => {
                    const number = index + 1;
                    const missing = count === 0;
                    return (
                      <div
                        key={number}
                        className={cn(
                          'flex flex-col items-center justify-center rounded-lg border py-3',
                          missing
                            ? 'border-dashed border-outline-variant bg-surface-container-low'
                            : 'border-gold/70 bg-surface',
                        )}
                      >
                        <span className={cn('text-lg font-medium', missing ? 'text-outline' : 'text-primary')}>
                          {number}
                        </span>
                        <span className="text-[0.58rem] uppercase tracking-[0.1em] text-outline">
                          {missing ? 'absent' : `${count}×`}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill tone="gold">
                    {result.missingNumbers.length > 0
                      ? `Leçons karmiques : ${result.missingNumbers.join(', ')}`
                      : 'Tous les nombres sont présents'}
                  </Pill>
                  {result.dominantNumbers.length > 0 ? (
                    <Pill tone="lavender">
                      Dominantes : {result.dominantNumbers.join(', ')}
                    </Pill>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-astralis py-14 lg:py-20">
        <SectionHeading
          eyebrow="Lecture détaillée"
          title="Quatre piliers, quatre nuances"
          intro="Chaque nombre éclaire une facette différente. Lisez-les comme des hypothèses de travail, pas comme des étiquettes définitives."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <PillarReading
            title="Chemin de vie"
            subtitle={`${numberLabel(result.lifePath.number)} · boussole de vie`}
            value={result.lifePath.number}
            interpretation={life}
            archetype={life?.lifePathTitle}
            trace={result.lifePath.trace.expression}
            explanation={PILLAR_EXPLANATIONS.lifePath}
          />
          <PillarReading
            title="Expression"
            subtitle={`${numberLabel(result.expression.number)} · talents visibles`}
            value={result.expression.number}
            interpretation={expression}
            archetype={expression?.expressionTitle}
            trace={result.expression.trace.expression}
            explanation={PILLAR_EXPLANATIONS.expression}
          />
          <PillarReading
            title="Élan spirituel"
            subtitle={`${numberLabel(result.soulUrge.number)} · désir profond`}
            value={result.soulUrge.number}
            interpretation={soul}
            archetype={soul?.soulUrgeTitle}
            trace={result.soulUrge.trace.expression}
            explanation={PILLAR_EXPLANATIONS.soulUrge}
          />
          <PillarReading
            title="Personnalité"
            subtitle={`${numberLabel(result.personality.number)} · empreinte sociale`}
            value={result.personality.number}
            interpretation={personality}
            archetype={personality?.personalityTitle}
            trace={result.personality.trace.expression}
            explanation={PILLAR_EXPLANATIONS.personality}
          />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="card p-6">
            <p className="eyebrow text-secondary">Nombre de maturité</p>
            <div className="mt-3 flex items-center gap-4">
              <NumberSeal value={result.maturity.number} label="Maturité" />
              <div>
                <p className="text-[0.95rem] font-medium text-primary">
                  {numberLabel(result.maturity.number)} — {maturity?.lifePathTitle}
                </p>
                <p className="mt-1 text-small text-on-surface-variant">{maturity?.advice}</p>
              </div>
            </div>
          </article>
          <article className="card p-6">
            <p className="eyebrow text-secondary">Note sur les nombres maîtres</p>
            <p className="mt-2 text-small leading-relaxed text-on-surface-variant">{MASTER_NUMBER_NOTE}</p>
            {result.hasMasterNumber ? (
              <p className="mt-3 text-[0.78rem] font-medium text-secondary">
                Nombres maîtres détectés : {result.masterNumbers.join(', ')}.
              </p>
            ) : null}
          </article>
        </div>

        <DisclosureNote className="mt-8 flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <span>
            La numérologie est une lecture symbolique, pas une science prédictive ni un diagnostic.
            Les résultats dépendent de l’orthographe exacte de votre nom de naissance et de la
            convention retenue pour le Y. Aucun événement futur n’est annoncé.
          </span>
        </DisclosureNote>
      </section>

      <ResultsActions
        discipline="numerology"
        disciplineLabel="numérologie"
        formPath="/numerologie"
        premiumTitle="L’analyse numérologique intégrale arrive bientôt"
        premiumContent={[
          'Étude détaillée de la grille d’inclusion et des dettes karmiques',
          'Calendrier personnel mois par mois',
          'Lecture des cycles et des apogées',
        ]}
      />
    </>
  );
}
