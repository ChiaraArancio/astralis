import type { AstrologyResult, ElementBalance, PlanetPlacement } from './engine';
import type { SignData } from './data';

export interface BigThreeReading {
  key: 'sun' | 'moon' | 'rising';
  label: string;
  eyebrow: string;
  sign: SignData | null;
  title: string;
  text: string;
  strengths: string[];
  challenges: string[];
}

export function bigThreeReadings(result: AstrologyResult): BigThreeReading[] {
  const sun = result.sunSign;
  const moon = result.moonSign;
  const rising = result.risingSign;
  return [
    {
      key: 'sun',
      label: 'Soleil',
      eyebrow: 'Cœur luminaire',
      sign: sun,
      title: sun ? `Soleil en ${sun.name}` : 'Soleil indéterminé',
      text: sun
        ? `Votre Soleil en ${sun.name} décrit la qualité centrale de votre identité : ${sun.description}`
        : "Sans heure précise, le Soleil peut changer de signe au cours de la journée. Aucune conclusion fiable ne peut être tirée sur ce point.",
      strengths: sun?.strengths ?? [],
      challenges: sun?.challenges ?? [],
    },
    {
      key: 'moon',
      label: 'Lune',
      eyebrow: 'Monde intérieur',
      sign: moon,
      title: moon ? `Lune en ${moon.name}` : 'Lune indéterminée',
      text: moon
        ? `Votre Lune en ${moon.name} éclaire votre monde émotionnel et vos besoins de sécurité : ${moon.description}`
        : "La Lune se déplace rapidement : sans l’heure de naissance, son signe peut changer au cours de la journée. Nous ne l’inventons pas.",
      strengths: moon?.strengths ?? [],
      challenges: moon?.challenges ?? [],
    },
    {
      key: 'rising',
      label: 'Ascendant',
      eyebrow: 'Masque & horizon',
      sign: rising,
      title: rising ? `Ascendant ${rising.name}` : 'Ascendant non calculé',
      text: rising
        ? `Votre Ascendant ${rising.name} décrit votre manière d’entrer en relation avec le monde : ${rising.description}`
        : "L’Ascendant change environ toutes les deux heures. Il ne peut pas être calculé sans l’heure exacte de naissance. Nous préférons l’omettre plutôt que de produire une approximation présentée comme réelle.",
      strengths: rising?.strengths ?? [],
      challenges: rising?.challenges ?? [],
    },
  ];
}

export function elementReading(balance: ElementBalance[] | null): string {
  if (!balance) {
    return "La répartition des éléments n’est pas calculée lorsque l’heure de naissance est inconnue.";
  }
  const sorted = [...balance].sort((a, b) => b.count - a.count);
  const [first, second] = sorted;
  const texts: Record<string, string> = {
    Feu: 'Le Feu apporte élan, expressivité et désir d’agir. Il donne du mouvement, mais peut aussi brûler trop vite.',
    Terre: 'La Terre apporte ancrage, patience et sens du concret. Elle stabilise, mais peut parfois résister au changement.',
    Air: 'L’Air apporte recul, idées et communication. Il relie, mais peut distancer l’expérience émotionnelle.',
    Eau: 'L’Eau apporte sensibilité, imagination et mémoire. Elle relie aux profondeurs, mais peut diluer les limites.',
  };
  return `${first.element} domine votre carte (${first.percent} %), suivi de ${second.element} (${second.percent} %). ${texts[first.element]} ${texts[second.element]}`;
}

export function houseEmphasis(planets: PlanetPlacement[]): Array<{ house: number; count: number }> {
  const counts = new Map<number, number>();
  for (const planet of planets) {
    if (planet.house) counts.set(planet.house, (counts.get(planet.house) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([house, count]) => ({ house, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

export function houseReading(result: AstrologyResult): string {
  if (!result.houses) return '';
  const emphasis = houseEmphasis(result.planets);
  if (emphasis.length === 0) return '';
  const labels: Record<number, string> = {
    1: 'l’identité et la présence',
    2: 'les ressources et les valeurs',
    3: 'la communication et l’entourage',
    4: 'le foyer et les racines',
    5: 'la création et le plaisir',
    6: 'le travail quotidien et la santé',
    7: 'les relations et les alliances',
    8: 'la transformation et le partage',
    9: 'le sens et l’ouverture',
    10: 'la carrière et la vocation',
    11: 'le collectif et les projets',
    12: 'l’intériorité et l’inconscient',
  };
  const list = emphasis
    .map((entry) => `la maison ${entry.house} (${labels[entry.house]}) avec ${entry.count} planète${entry.count > 1 ? 's' : ''}`)
    .join(', puis ');
  return `Les regroupements planétaires mettent l’accent sur ${list}. Ces maisons décrivent des domaines où votre énergie se concentre et où les apprentissages sont particulièrement visibles.`;
}

export function aspectSummary(result: AstrologyResult): string {
  if (result.aspects.length === 0) return 'Aucun aspect majeur ne ressort avec les orbes retenues.';
  const harmonious = result.aspects.filter((aspect) => aspect.nature === 'Harmonie' || aspect.nature === 'Opportunité').length;
  const tense = result.aspects.filter((aspect) => aspect.nature === 'Tension').length;
  return `${result.aspects.length} aspects majeurs ont été retenus, dont ${harmonious} configurations fluides ou opportunes et ${tense} tensions fécondes. Les aspects ne sont pas bons ou mauvais : ils décrivent des dialogues entre fonctions psychiques.`;
}

export const ASTROLOGY_DISCLAIMER =
  "Cette lecture est une interprétation symbolique, pas une prédiction ni un diagnostic. Elle ne remplace aucun accompagnement médical, psychologique, juridique ou financier. Les positions calculées dépendent de la date, de l’heure et du lieu fournis.";
