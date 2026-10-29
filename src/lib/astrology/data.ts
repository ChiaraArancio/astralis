export type Element = 'Feu' | 'Terre' | 'Air' | 'Eau';
export type Quality = 'Cardinal' | 'Fixe' | 'Mutable';

export interface SignData {
  index: number;
  name: string;
  slug: string;
  glyph: string;
  element: Element;
  quality: Quality;
  polarity: 'Yang' | 'Yin';
  ruler: string;
  keywords: string[];
  description: string;
  strengths: string[];
  challenges: string[];
  body: string;
}

export const SIGNS: SignData[] = [
  {
    index: 0,
    name: 'Bélier',
    slug: 'belier',
    glyph: '♈',
    element: 'Feu',
    quality: 'Cardinal',
    polarity: 'Yang',
    ruler: 'Mars',
    keywords: ['Élan', 'Courage', 'Initiative'],
    description:
      "Le Bélier ouvre le cycle zodiacal. Il incarne l’énergie du premier pas, le courage de s’affirmer et le désir d’aller de l’avant. Sa spontanéité est une force lorsqu’elle est canalisée par un projet qui mérite sa flamme.",
    strengths: ['Audace', 'Franc-parler', 'Capacité à démarrer'],
    challenges: ['Impatience', 'Impulsivité', 'Difficulté à attendre'],
    body: 'Tête, visage, regard',
  },
  {
    index: 1,
    name: 'Taureau',
    slug: 'taureau',
    glyph: '♉',
    element: 'Terre',
    quality: 'Fixe',
    polarity: 'Yin',
    ruler: 'Vénus',
    keywords: ['Stabilité', 'Sensorialité', 'Constance'],
    description:
      "Le Taureau ralentit le rythme pour goûter ce qui est tangible. Il construit patiemment, s’enracine et défend ce qui compte. Sa force est la fidélité à ses valeurs ; son apprentissage, la souplesse face au changement.",
    strengths: ['Endurance', 'Fiabilité', 'Sens de la beauté'],
    challenges: ['Entêtement', 'Peur du changement', 'Possessivité'],
    body: 'Gorge, cou, voix',
  },
  {
    index: 2,
    name: 'Gémeaux',
    slug: 'gemeaux',
    glyph: '♊',
    element: 'Air',
    quality: 'Mutable',
    polarity: 'Yang',
    ruler: 'Mercure',
    keywords: ['Curiosité', 'Parole', 'Mouvement'],
    description:
      "Les Gémeaux relient les idées, les personnes et les mondes. Ils apprennent par l’échange, la lecture et la circulation. Leur agilité mentale est précieuse lorsqu’elle est mise au service d’une parole qui relie plutôt qu’elle ne disperse.",
    strengths: ['Adaptabilité', 'Esprit vif', 'Aisance relationnelle'],
    challenges: ['Dispersion', 'Superficialité', 'Inconstance'],
    body: 'Poumons, bras, système nerveux',
  },
  {
    index: 3,
    name: 'Cancer',
    slug: 'cancer',
    glyph: '♋',
    element: 'Eau',
    quality: 'Cardinal',
    polarity: 'Yin',
    ruler: 'Lune',
    keywords: ['Mémoire', 'Protection', 'Émotion'],
    description:
      "Le Cancer relie l’intime au collectif. Il protège, se souvient et crée des espaces où l’on peut se déposer. Son intuition émotionnelle est une boussole ; son défi est de ne pas confondre sécurité et enfermement.",
    strengths: ['Empathie', 'Fidélité', 'Sens du foyer'],
    challenges: ['Hypersensibilité', 'Rétention', 'Attachement au passé'],
    body: 'Estomac, poitrine, système digestif',
  },
  {
    index: 4,
    name: 'Lion',
    slug: 'lion',
    glyph: '♌',
    element: 'Feu',
    quality: 'Fixe',
    polarity: 'Yang',
    ruler: 'Soleil',
    keywords: ['Création', 'Présence', 'Générosité'],
    description:
      "Le Lion rayonne. Il a besoin de créer, de prendre sa place et de donner de la chaleur. Son cœur est généreux lorsqu’il ne dépend pas du regard extérieur pour se sentir exister. Sa dignité est une responsabilité autant qu’une lumière.",
    strengths: ['Charisme', 'Loyauté', 'Créativité'],
    challenges: ['Orgueil', 'Besoin de reconnaissance', 'Théâtralité'],
    body: 'Cœur, dos, colonne vertébrale',
  },
  {
    index: 5,
    name: 'Vierge',
    slug: 'vierge',
    glyph: '♍',
    element: 'Terre',
    quality: 'Mutable',
    polarity: 'Yin',
    ruler: 'Mercure',
    keywords: ['Analyse', 'Service', 'Précision'],
    description:
      "La Vierge affine, trie et améliore. Elle observe les détails et cherche à rendre le réel plus juste. Son intelligence pratique est un service lorsqu’elle ne se transforme pas en exigence permanente envers elle-même ou les autres.",
    strengths: ['Rigueur', 'Sens du service', 'Discernement'],
    challenges: ['Perfectionnisme', 'Autocritique', 'Anxiété'],
    body: 'Intestins, ventre, système nerveux',
  },
  {
    index: 6,
    name: 'Balance',
    slug: 'balance',
    glyph: '♎',
    element: 'Air',
    quality: 'Cardinal',
    polarity: 'Yang',
    ruler: 'Vénus',
    keywords: ['Relation', 'Équilibre', 'Esthétique'],
    description:
      "La Balance cherche le point juste entre soi et l’autre. Elle a le sens de l’harmonie, du dialogue et de la beauté. Son apprentissage consiste à ne pas s’oublier dans la recherche d’un accord extérieur.",
    strengths: ['Diplomatie', 'Sens de la justice', 'Grâce relationnelle'],
    challenges: ['Indécision', 'Évitement du conflit', 'Dépendance au regard'],
    body: 'Reins, bassin, peau',
  },
  {
    index: 7,
    name: 'Scorpion',
    slug: 'scorpion',
    glyph: '♏',
    element: 'Eau',
    quality: 'Fixe',
    polarity: 'Yin',
    ruler: 'Pluton',
    keywords: ['Intensité', 'Transformation', 'Profondeur'],
    description:
      "Le Scorpion plonge dans ce qui n’est pas dit. Il a l’instinct de la vérité, de la traversée et de la régénération. Sa puissance vient de sa capacité à regarder l’ombre sans y rester prisonnier.",
    strengths: ['Lucidité', 'Résilience', 'Profondeur émotionnelle'],
    challenges: ['Contrôle', 'Méfiance', 'Rancune'],
    body: 'Organes reproducteurs, système immunitaire',
  },
  {
    index: 8,
    name: 'Sagittaire',
    slug: 'sagittaire',
    glyph: '♐',
    element: 'Feu',
    quality: 'Mutable',
    polarity: 'Yang',
    ruler: 'Jupiter',
    keywords: ['Expansion', 'Sens', 'Liberté'],
    description:
      "Le Sagittaire élargit l’horizon. Il cherche du sens, de la perspective et de la liberté. Son enthousiasme ouvre des portes ; son défi est d’honorer ses engagements sans fuir la nuance.",
    strengths: ['Optimisme', 'Vision large', 'Franchise'],
    challenges: ['Excès', 'Imprudence', 'Dogmatisme'],
    body: 'Hanches, cuisses, foie',
  },
  {
    index: 9,
    name: 'Capricorne',
    slug: 'capricorne',
    glyph: '♑',
    element: 'Terre',
    quality: 'Cardinal',
    polarity: 'Yin',
    ruler: 'Saturne',
    keywords: ['Structure', 'Ambition', 'Responsabilité'],
    description:
      "Le Capricorne gravit la montagne. Il sait transformer le temps en œuvre, poser des limites et assumer. Sa maturité est une force lorsqu’elle laisse aussi place à la vulnérabilité et au plaisir.",
    strengths: ['Persévérance', 'Sens des responsabilités', 'Stratégie'],
    challenges: ['Rigidité', 'Pessimisme', 'Surinvestissement du travail'],
    body: 'Genoux, os, articulations',
  },
  {
    index: 10,
    name: 'Verseau',
    slug: 'verseau',
    glyph: '♒',
    element: 'Air',
    quality: 'Fixe',
    polarity: 'Yang',
    ruler: 'Uranus',
    keywords: ['Vision', 'Altérité', 'Innovation'],
    description:
      "Le Verseau regarde le monde depuis un autre angle. Il relie les idées, les communautés et les futurs possibles. Son indépendance est précieuse lorsqu’elle s’incarne dans un collectif, sans se perdre dans l’abstraction.",
    strengths: ['Originalité', 'Ouverture', 'Sens du collectif'],
    challenges: ['Détachement', 'Entêtement intellectuel', 'Provocation'],
    body: 'Chevilles, tibias, circulation',
  },
  {
    index: 11,
    name: 'Poissons',
    slug: 'poissons',
    glyph: '♓',
    element: 'Eau',
    quality: 'Mutable',
    polarity: 'Yin',
    ruler: 'Neptune',
    keywords: ['Empathie', 'Imaginaire', 'Dissolution'],
    description:
      "Les Poissons relient le visible et l’invisible. Ils perçoivent les atmosphères, les rêves et la souffrance du monde. Leur compassion est immense lorsqu’elle est contenue par des limites claires.",
    strengths: ['Intuition', 'Créativité', 'Compassion'],
    challenges: ['Fuite', 'Confusion', 'Sacrifice de soi'],
    body: 'Pieds, système lymphatique, sommeil',
  },
];

export type PlanetKey =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto'
  | 'northNode';

export interface PlanetData {
  key: PlanetKey;
  name: string;
  glyph: string;
  short: string;
  theme: string;
  description: string;
}

export const PLANETS: PlanetData[] = [
  {
    key: 'sun',
    name: 'Soleil',
    glyph: '☉',
    short: 'Soleil',
    theme: 'la volonté, l’identité et la direction de vie',
    description:
      "Le Soleil représente le cœur de votre identité, votre manière de rayonner et la direction vers laquelle votre énergie se tourne naturellement.",
  },
  {
    key: 'moon',
    name: 'Lune',
    glyph: '☽',
    short: 'Lune',
    theme: 'la sensibilité, les besoins affectifs et la sécurité intérieure',
    description:
      "La Lune décrit votre monde émotionnel, vos besoins de sécurité, vos réflexes de réconfort et la manière dont vous recevez le monde.",
  },
  {
    key: 'mercury',
    name: 'Mercure',
    glyph: '☿',
    short: 'Mercure',
    theme: 'la pensée, la parole et les apprentissages',
    description:
      "Mercure éclaire votre façon de penser, d’apprendre, de communiquer et de relier les informations.",
  },
  {
    key: 'venus',
    name: 'Vénus',
    glyph: '♀',
    short: 'Vénus',
    theme: 'l’amour, les valeurs et le rapport à la beauté',
    description:
      "Vénus indique ce que vous aimez, ce que vous valorisez, votre manière de créer du lien affectif et votre rapport au plaisir.",
  },
  {
    key: 'mars',
    name: 'Mars',
    glyph: '♂',
    short: 'Mars',
    theme: 'l’élan, le désir et la manière d’agir',
    description:
      "Mars décrit votre énergie d’action, votre capacité à défendre vos besoins et la manière dont vous transformez le désir en mouvement.",
  },
  {
    key: 'jupiter',
    name: 'Jupiter',
    glyph: '♃',
    short: 'Jupiter',
    theme: 'l’expansion, la confiance et le sens',
    description:
      "Jupiter montre où vous avez tendance à vous ouvrir, à faire confiance, à apprendre et à chercher une perspective plus large.",
  },
  {
    key: 'saturn',
    name: 'Saturne',
    glyph: '♄',
    short: 'Saturne',
    theme: 'la structure, les limites et la maturation',
    description:
      "Saturne indique les domaines où l’exigence, le temps et la responsabilité vous invitent à construire quelque chose de durable.",
  },
  {
    key: 'uranus',
    name: 'Uranus',
    glyph: '♅',
    short: 'Uranus',
    theme: 'l’innovation, la liberté et les ruptures',
    description:
      "Uranus pointe les zones d’éveil, d’originalité et de changement où vous êtes appelé·e à sortir des automatismes.",
  },
  {
    key: 'neptune',
    name: 'Neptune',
    glyph: '♆',
    short: 'Neptune',
    theme: 'l’imaginaire, la compassion et la spiritualité',
    description:
      "Neptune relie votre sensibilité à l’invisible, à la rêverie, à la compassion et aux formes de dissolution des frontières.",
  },
  {
    key: 'pluto',
    name: 'Pluton',
    glyph: '♇',
    short: 'Pluton',
    theme: 'la transformation, le pouvoir et la régénération',
    description:
      "Pluton signale les processus profonds de transformation, de remise en question et de reconstruction.",
  },
  {
    key: 'northNode',
    name: 'Nœud Nord',
    glyph: '☊',
    short: 'Nœud Nord',
    theme: 'la direction d’évolution et les apprentissages à intégrer',
    description:
      "Le Nœud Nord est un point symbolique : il indique la direction de croissance vers laquelle tendre, sans promesse de destin.",
  },
];

export interface HouseData {
  number: number;
  title: string;
  theme: string;
}

export const HOUSES: HouseData[] = [
  { number: 1, title: 'Identité & apparence', theme: 'la manière d’être au monde, le corps et l’élan personnel' },
  { number: 2, title: 'Ressources & valeurs', theme: 'les ressources, la sécurité matérielle et les valeurs' },
  { number: 3, title: 'Communication & entourage', theme: 'la parole, les apprentissages et le quotidien relationnel' },
  { number: 4, title: 'Foyer & racines', theme: 'la famille, les racines et le sentiment d’appartenance' },
  { number: 5, title: 'Création & plaisir', theme: 'la création, le jeu, le plaisir et l’expression de soi' },
  { number: 6, title: 'Travail & santé', theme: 'le quotidien, le service, les routines et l’équilibre vital' },
  { number: 7, title: 'Relations & alliances', theme: 'les relations intimes, les partenariats et le miroir de l’autre' },
  { number: 8, title: 'Transformation & partage', theme: 'les ressources partagées, la profondeur et les transitions' },
  { number: 9, title: 'Sens, voyage & foi', theme: 'la quête de sens, les voyages, les croyances et l’ouverture' },
  { number: 10, title: 'Carrière & vocation', theme: 'la place sociale, l’ambition et la contribution visible' },
  { number: 11, title: 'Collectif & projets', theme: 'les amitiés, les réseaux, les idéaux et les projets collectifs' },
  { number: 12, title: 'Intériorité & inconscient', theme: 'le retrait, les rêves, la vie intérieure et ce qui se libère' },
];

export type AspectType = 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx';

export interface AspectDefinition {
  type: AspectType;
  name: string;
  symbol: string;
  angle: number;
  orb: number;
  nature: 'Fusion' | 'Tension' | 'Harmonie' | 'Opportunité' | 'Ajustement';
  verb: string;
  description: string;
}

export const ASPECTS: AspectDefinition[] = [
  {
    type: 'conjunction',
    name: 'Conjonction',
    symbol: '☌',
    angle: 0,
    orb: 8,
    nature: 'Fusion',
    verb: 'fusionne avec',
    description:
      'Les deux énergies se renforcent et agissent ensemble. La qualité dépend des planètes concernées.',
  },
  {
    type: 'opposition',
    name: 'Opposition',
    symbol: '☍',
    angle: 180,
    orb: 8,
    nature: 'Tension',
    verb: 'cherche à s’équilibrer avec',
    description:
      'Deux pôles se font face et demandent une intégration consciente plutôt qu’un choix exclusif.',
  },
  {
    type: 'trine',
    name: 'Trigone',
    symbol: '△',
    angle: 120,
    orb: 7,
    nature: 'Harmonie',
    verb: 'soutient',
    description:
      'Les énergies circulent avec fluidité. C’est un talent naturel, qui demande parfois d’être activé consciemment.',
  },
  {
    type: 'square',
    name: 'Carré',
    symbol: '□',
    angle: 90,
    orb: 7,
    nature: 'Tension',
    verb: 'entre en tension avec',
    description:
      'Une friction féconde : elle pousse à agir, à ajuster et à trouver une troisième voie.',
  },
  {
    type: 'sextile',
    name: 'Sextile',
    symbol: '⚹',
    angle: 60,
    orb: 5,
    nature: 'Opportunité',
    verb: 'offre une ouverture à',
    description:
      'Une possibilité de coopération entre deux fonctions. Elle se saisit par l’initiative.',
  },
  {
    type: 'quincunx',
    name: 'Quinconce',
    symbol: '⚻',
    angle: 150,
    orb: 3,
    nature: 'Ajustement',
    verb: 'demande un ajustement avec',
    description:
      'Deux énergies peu compatibles demandent une adaptation fine et une écoute particulière.',
  },
];

export const ELEMENTS: Element[] = ['Feu', 'Terre', 'Air', 'Eau'];

export function signFromLongitude(longitude: number): SignData {
  const normalized = ((longitude % 360) + 360) % 360;
  return SIGNS[Math.floor(normalized / 30) % 12];
}

export function signByIndex(index: number): SignData {
  return SIGNS[((index % 12) + 12) % 12];
}

export function planetByKey(key: PlanetKey): PlanetData {
  return PLANETS.find((planet) => planet.key === key) ?? PLANETS[0];
}
