export interface HdTypeInfo {
  key: string;
  name: string;
  strategy: string;
  signature: string;
  notSelf: string;
  aura: string;
  description: string;
  keywords: string[];
}

export const HD_TYPES: Record<string, HdTypeInfo> = {
  Manifestor: {
    key: 'Manifestor',
    name: 'Manifesteur',
    strategy: 'Informer avant d’agir',
    signature: 'La paix',
    notSelf: 'La colère',
    aura: 'Aura fermée et repoussante',
    description:
      "Le Manifesteur est conçu pour initier. Son énergie peut agir sans attendre de réponse extérieure, mais il a besoin d’informer son entourage pour réduire la résistance qu’il rencontre. Sa paix naît d’une action qui ne cherche ni permission ni validation.",
    keywords: ['Initiation', 'Indépendance', 'Impact'],
  },
  Generator: {
    key: 'Generator',
    name: 'Générateur',
    strategy: 'Répondre à la vie',
    signature: 'La satisfaction',
    notSelf: 'La frustration',
    aura: 'Aura ouverte et enveloppante',
    description:
      "Le Générateur dispose d’une énergie sacrale durable lorsqu’il est engagé dans ce qui suscite réellement sa réponse. Sa stratégie n’est pas d’initier pour prouver sa valeur, mais de répondre à ce qui se présente et de suivre l’élan du corps.",
    keywords: ['Énergie', 'Réponse', 'Endurance'],
  },
  'Manifesting Generator': {
    key: 'Manifesting Generator',
    name: 'Générateur Manifesteur',
    strategy: 'Répondre, puis informer',
    signature: 'La satisfaction',
    notSelf: 'La frustration et la colère',
    aura: 'Aura ouverte et enveloppante',
    description:
      "Le Générateur Manifesteur combine la réponse sacrale et une capacité d’initiative rapide. Il avance souvent par bonds, puis revient préciser son chemin. Répondre avant d’agir et informer avant d’entraîner les autres lui évite une grande partie de la résistance.",
    keywords: ['Réactivité', 'Multi-projets', 'Initiative'],
  },
  Projector: {
    key: 'Projector',
    name: 'Projecteur',
    strategy: 'Attendre l’invitation',
    signature: 'Le succès',
    notSelf: 'L’amertume',
    aura: 'Aura focalisée et pénétrante',
    description:
      "Le Projecteur voit les systèmes, les personnes et les dynamiques avec acuité. Son énergie n’est pas faite pour porter la production du monde : elle est faite pour guider lorsque son regard est reconnu et invité. Le succès vient de la justesse de la reconnaissance mutuelle.",
    keywords: ['Guidance', 'Lucidité', 'Reconnaissance'],
  },
  Reflector: {
    key: 'Reflector',
    name: 'Réflecteur',
    strategy: 'Attendre un cycle lunaire',
    signature: 'La surprise',
    notSelf: 'La déception',
    aura: 'Aura résistante et échantillonnante',
    description:
      "Le Réflecteur est un miroir du collectif. Il n’a aucun centre défini et reflète l’état énergétique de son environnement. Ses décisions demandent du temps, idéalement un cycle lunaire complet, pour distinguer ce qui lui appartient de ce qu’il perçoit autour de lui.",
    keywords: ['Miroir', 'Sensibilité', 'Cycle'],
  },
};

export interface HdAuthorityInfo {
  key: string;
  name: string;
  short: string;
  description: string;
  question: string;
}

export const HD_AUTHORITIES: Record<string, HdAuthorityInfo> = {
  'Emotional (Solar Plexus)': {
    key: 'Emotional (Solar Plexus)',
    name: 'Autorité émotionnelle',
    short: 'Plexus solaire',
    description:
      "Votre autorité passe par la vague émotionnelle. Aucune décision importante ne devrait être prise à chaud : la clarté émerge après avoir traversé l’élan, le doute et le retour au calme. Le temps est votre allié.",
    question: 'Ai-je laissé passer plusieurs jours, voire plusieurs semaines, avant de décider ?',
  },
  Sacral: {
    key: 'Sacral',
    name: 'Autorité sacrale',
    short: 'Sacral',
    description:
      "Votre réponse se lit dans l’élan du corps : un « oui » qui monte, une énergie qui s’ouvre, ou un « non » viscéral qui se referme. Le mental peut ensuite raconter une histoire, mais il n’a pas le dernier mot.",
    question: 'Mon corps dit-il oui, là, maintenant, sans que j’aie besoin de me convaincre ?',
  },
  Splenic: {
    key: 'Splenic',
    name: 'Autorité splénique',
    short: 'Rate',
    description:
      "Votre intuition est immédiate, discrète et souvent unique. Elle s’exprime par une sensation fugace, une évidence calme ou un signal de danger. Elle ne se répète pas : apprendre à l’écouter dans l’instant est essentiel.",
    question: 'Quel est le premier signal, celui qui est apparu avant que je réfléchisse ?',
  },
  'Ego (Heart)': {
    key: 'Ego (Heart)',
    name: 'Autorité égoïque',
    short: 'Cœur / Ego',
    description:
      "Votre décision juste engage votre volonté et votre désir. Elle pose la question : « Est-ce que je le veux vraiment, et est-ce que j’ai l’énergie pour le soutenir ? » L’autorité du cœur ne se négocie pas par devoir.",
    question: 'Est-ce que je le veux vraiment, avec l’énergie disponible pour tenir ?',
  },
  'Self-Projected (G)': {
    key: 'Self-Projected (G)',
    name: 'Autorité auto-projetée',
    short: 'G / Identité',
    description:
      "Votre vérité se révèle en parlant. Vous n’avez pas besoin d’un conseil extérieur : vous avez besoin d’un espace pour entendre ce que vous dites. La clarté vient de la parole authentique, pas de l’analyse silencieuse.",
    question: 'Qu’est-ce que j’entends de vrai lorsque je parle à voix haute, sans chercher à convaincre ?',
  },
  'Mental (None / Environmental)': {
    key: 'Mental (None / Environmental)',
    name: 'Autorité mentale / environnementale',
    short: 'Mental & environnement',
    description:
      "Vous n’avez pas d’autorité intérieure fixe. Vos décisions se clarifient en parlant avec plusieurs personnes de confiance et en observant l’environnement. Le mental ne décide pas seul : il éclaire après coup ce que le corps et le contexte révèlent.",
    question: 'Qu’est-ce que je remarque dans mon corps et dans mon environnement lorsque j’en parle ?',
  },
  'Lunar (Reflector)': {
    key: 'Lunar (Reflector)',
    name: 'Autorité lunaire',
    short: 'Cycle lunaire',
    description:
      "Votre processus décisionnel se déploie sur environ 28 jours. Observez la même question à travers les phases du cycle lunaire : ce qui reste stable et juste à la fin du cycle mérite votre engagement.",
    question: 'La même décision est-elle encore juste après un cycle lunaire complet ?',
  },
};

export interface HdCenterInfo {
  key: string;
  name: string;
  theme: string;
  definedText: string;
  openText: string;
}

export const HD_CENTERS: HdCenterInfo[] = [
  {
    key: 'head',
    name: 'Couronne',
    theme: 'Inspiration & pression mentale',
    definedText:
      "Votre inspiration est stable : vous avez une manière constante de recevoir les questions et les idées. Vous pouvez devenir une source d’inspiration pour les autres.",
    openText:
      "Vous êtes réceptif·ve aux inspirations extérieures et au mental ambiant. Votre sagesse consiste à ne pas vous identifier à toutes les questions qui traversent votre esprit.",
  },
  {
    key: 'ajna',
    name: 'Ajna',
    theme: 'Conceptualisation & croyances',
    definedText:
      "Votre façon de penser et de structurer les concepts est fixe. Vous avez une grille de lecture stable, ce qui peut donner de la profondeur comme de l’entêtement.",
    openText:
      "Vous pouvez envisager plusieurs façons de penser et changer de point de vue. Votre sagesse est de rester curieux·se sans vous perdre dans le bruit mental.",
  },
  {
    key: 'throat',
    name: 'Gorge',
    theme: 'Expression & manifestation',
    definedText:
      "Votre parole et votre capacité à passer à l’action sont constantes. Vous êtes fait·e pour exprimer et manifester, à condition de respecter votre rythme.",
    openText:
      "Vous êtes un amplificateur de la parole et de l’action du collectif. Votre sagesse est de parler lorsque vous êtes reconnu·e et de ne pas vous presser pour combler le silence.",
  },
  {
    key: 'g',
    name: 'G — Identité',
    theme: 'Direction & sentiment de soi',
    definedText:
      "Votre identité et votre direction de vie sont stables. Vous rayonnez une présence qui peut guider les autres, même sans le chercher.",
    openText:
      "Votre identité se révèle à travers les lieux, les rencontres et les environnements. Votre sagesse est de laisser la vie vous montrer votre direction plutôt que de la forcer mentalement.",
  },
  {
    key: 'heart',
    name: 'Cœur / Ego',
    theme: 'Volonté & valeur personnelle',
    definedText:
      "Votre volonté est une ressource puissante. Vous pouvez porter des engagements exigeants, mais vous devez apprendre à ne pas confondre valeur personnelle et performance.",
    openText:
      "Vous êtes sensible à la valeur que le monde accorde au mérite. Votre sagesse est de ne pas promettre plus que ce que votre énergie peut tenir, et de ne pas confondre estime et réussite.",
  },
  {
    key: 'sacral',
    name: 'Sacral',
    theme: 'Force de vie & réponse',
    definedText:
      "Vous disposez d’une énergie de travail et de création durable lorsque vous êtes engagé·e dans ce qui suscite une réponse authentique. Votre corps sait dire oui ou non avant votre mental.",
    openText:
      "Vous ne devez pas puiser indéfiniment dans votre énergie pour répondre aux attentes. Votre sagesse est de reconnaître quand vous êtes saturé·e et de préserver votre vitalité.",
  },
  {
    key: 'solarplexus',
    name: 'Plexus solaire',
    theme: 'Émotions & conscience',
    definedText:
      "Votre vague émotionnelle est constante et fait partie de votre autorité. Vous avez besoin de temps pour ressentir le spectre complet d’une situation avant de trancher.",
    openText:
      "Vous ressentez et amplifiez les émotions de l’entourage. Votre sagesse est de ne pas prendre la température émotionnelle d’une pièce pour votre propre vérité.",
  },
  {
    key: 'spleen',
    name: 'Rate',
    theme: 'Intuition & santé',
    definedText:
      "Votre intuition est stable et immédiate. Elle vous informe sur ce qui est sain et juste pour vous, souvent par une sensation discrète qu’il faut apprendre à reconnaître.",
    openText:
      "Vous êtes sensible aux peurs et aux intuitions de votre environnement. Votre sagesse est de distinguer le signal intérieur du bruit ambiant, et de ne pas vous accrocher à ce qui n’est plus sain.",
  },
  {
    key: 'root',
    name: 'Racine',
    theme: 'Pression & carburant',
    definedText:
      "Vous produisez une pression intérieure stable qui peut devenir un moteur. Votre défi est de ne pas transformer cette pression en urgence permanente.",
    openText:
      "Vous percevez la pression du collectif et pouvez vous sentir pressé·e sans raison personnelle. Votre sagesse est de laisser passer la vague et de ne pas agir sous l’effet de l’urgence empruntée.",
  },
];

export const PROFILE_LINES: Record<string, { name: string; description: string }> = {
  '1': {
    name: 'L’Investigateur',
    description:
      "Besoin de comprendre, de vérifier et de poser des fondations solides. La sécurité naît de la connaissance et de la maîtrise du sujet.",
  },
  '2': {
    name: 'L’Ermite',
    description:
      "Besoin d’espace, de retrait et de temps pour soi. Le talent naturel se révèle lorsque la personne est appelée par la vie plutôt que poussée par le mental.",
  },
  '3': {
    name: 'Le Martyr',
    description:
      "Apprentissage par l’expérimentation, les essais et les erreurs. La résilience vient de la capacité à transformer l’expérience en sagesse pratique.",
  },
  '4': {
    name: 'L’Opportuniste',
    description:
      "Le lien, l’amitié et les réseaux sont des vecteurs d’opportunité. La stabilité relationnelle nourrit la confiance et l’élan.",
  },
  '5': {
    name: 'L’Hérétique',
    description:
      "Projection de solutions et attentes extérieures fortes. La justesse consiste à ne pas promettre ce que l’on ne peut pas tenir, et à laisser tomber les projections.",
  },
  '6': {
    name: 'Le Modèle',
    description:
      "Un parcours en trois temps : expérimentation, observation, puis transmission d’une sagesse incarnée. La crédibilité vient de l’expérience vécue.",
  },
};

export interface HdProfileInfo {
  key: string;
  linePersonality: string;
  lineDesign: string;
  title: string;
  description: string;
}

export function profileInfo(profile: string | null): HdProfileInfo | null {
  if (!profile) return null;
  const [personality, design] = profile.split('/');
  const p = PROFILE_LINES[personality];
  const d = PROFILE_LINES[design];
  if (!p || !d) return null;
  return {
    key: profile,
    linePersonality: personality,
    lineDesign: design,
    title: `${personality}/${design} — ${p.name} • ${d.name}`,
    description: `Ligne ${personality} (conscient) : ${p.description} Ligne ${design} (inconscient) : ${d.description}`,
  };
}

export const HD_CHANNEL_NAMES: Record<string, { name: string; description: string }> = {
  '1-8': { name: 'Inspiration', description: 'La créativité individuelle qui inspire et donne une direction.' },
  '2-14': { name: 'Le Rythme', description: 'La capacité de suivre son propre rythme et de nourrir le monde.' },
  '3-60': { name: 'La Mutation', description: 'Le passage de l’ordre ancien à une nouvelle forme.' },
  '4-63': { name: 'La Logique', description: 'Le doute méthodique et la vérification des concepts.' },
  '5-15': { name: 'Le Rythme', description: 'L’accord avec les cycles naturels et le flux de la vie.' },
  '6-59': { name: 'La Fécondité', description: 'La capacité de créer l’intimité et la vie.' },
  '7-31': { name: 'L’Alpha', description: 'Le leadership par la direction et l’influence.' },
  '9-52': { name: 'La Concentration', description: 'La capacité de se concentrer et de mener à terme.' },
  '10-20': { name: 'L’Éveil', description: 'L’expression authentique de soi dans l’instant.' },
  '10-34': { name: 'L’Exploration', description: 'L’autonomie et la poursuite de ses propres convictions.' },
  '10-57': { name: 'La Forme parfaite', description: 'L’intuition de ce qui est juste et la survie par la sensibilité.' },
  '11-56': { name: 'La Curiosité', description: 'La transmission d’idées et d’histoires.' },
  '12-22': { name: 'L’Ouverture', description: 'L’émotion, l’expression et la capacité de toucher les autres.' },
  '13-33': { name: 'Le Prodigue', description: 'La mémoire collective et le retour à soi.' },
  '16-48': { name: 'La Longueur d’onde', description: 'Le talent, la répétition et la maîtrise.' },
  '17-62': { name: 'L’Acceptation', description: 'La logique organisée et la démonstration.' },
  '18-58': { name: 'Le Jugement', description: 'La correction et le désir d’améliorer le monde.' },
  '19-49': { name: 'La Synthèse', description: 'La sensibilité aux besoins et la mémoire des liens.' },
  '20-34': { name: 'Le Charisme', description: 'L’action dans l’instant et la puissance du faire.' },
  '20-57': { name: 'L’Onde cérébrale', description: 'L’intuition qui traverse la parole.' },
  '21-45': { name: 'L’Argent', description: 'La gestion, la communauté et la juste répartition.' },
  '23-43': { name: 'La Structuration', description: 'L’expression de l’intuition en concepts compréhensibles.' },
  '24-61': { name: 'La Conscience', description: 'Le silence, l’inspiration et la recherche de vérité.' },
  '25-51': { name: 'L’Initiation', description: 'Le courage de l’innocence et la capacité de surprendre.' },
  '26-44': { name: 'La Reddition', description: 'La mémoire, le passé et la force de la négociation.' },
  '27-50': { name: 'La Préservation', description: 'Le soin, la responsabilité et la garde des valeurs.' },
  '28-38': { name: 'La Lutte', description: 'La ténacité et la recherche de sens à travers l’épreuve.' },
  '29-46': { name: 'La Découverte', description: 'L’engagement et la capacité de se jeter dans l’expérience.' },
  '30-41': { name: 'La Reconnaissance', description: 'Le désir, l’imagination et le cycle des émotions.' },
  '32-54': { name: 'La Transformation', description: 'L’ambition et la capacité de faire évoluer une structure.' },
  '34-57': { name: 'La Puissance', description: 'L’intuition du corps et la force vitale.' },
  '35-36': { name: 'L’Impermanence', description: 'Le goût de l’expérience et la traversée des émotions.' },
  '37-40': { name: 'La Communauté', description: 'Le lien, la générosité et le contrat du cœur.' },
  '39-55': { name: 'L’Émotivité', description: 'La mélancolie, la passion et la profondeur émotionnelle.' },
  '42-53': { name: 'La Maturation', description: 'La croissance par les cycles et l’aboutissement.' },
  '47-64': { name: 'L’Abstraction', description: 'La mémoire, les images et la recherche de sens.' },
};

export const GATE_NAMES: Record<number, string> = {
  1: 'Le Créatif',
  2: 'Le Réceptif',
  3: 'La Difficulté initiale',
  4: 'La Folie juvénile',
  5: 'L’Attente',
  6: 'Le Conflit',
  7: 'L’Armée',
  8: 'L’Union',
  9: 'Le Petit Pouvoir',
  10: 'La Marche',
  11: 'La Paix',
  12: 'La Stagnation',
  13: 'La Communauté',
  14: 'La Possession',
  15: 'La Modestie',
  16: 'L’Enthousiasme',
  17: 'Le Suivi',
  18: 'La Correction',
  19: 'L’Approche',
  20: 'La Contemplation',
  21: 'La Morsure',
  22: 'La Grâce',
  23: 'La Dispersion',
  24: 'Le Retour',
  25: 'L’Innocence',
  26: 'La Puissance domptée',
  27: 'La Nourriture',
  28: 'Le Grand Excès',
  29: 'L’Abîme',
  30: 'Le Feu',
  31: 'L’Influence',
  32: 'La Durée',
  33: 'La Retraite',
  34: 'La Puissance du Grand',
  35: 'Le Progrès',
  36: 'L’Obscurcissement de la lumière',
  37: 'La Famille',
  38: 'L’Opposition',
  39: 'L’Obstruction',
  40: 'La Délivrance',
  41: 'La Diminution',
  42: 'L’Accroissement',
  43: 'La Résolution',
  44: 'La Rencontre',
  45: 'Le Rassemblement',
  46: 'La Montée',
  47: 'L’Épuisement',
  48: 'Le Puits',
  49: 'La Révolution',
  50: 'Le Chaudron',
  51: 'Le Tonnerre',
  52: 'Le Repos',
  53: 'Le Développement',
  54: 'La Fille qui se marie',
  55: 'L’Abondance',
  56: 'Le Voyageur',
  57: 'Le Doux',
  58: 'La Joie',
  59: 'La Dispersion',
  60: 'La Limitation',
  61: 'La Vérité intérieure',
  62: 'La Prépondérance du petit',
  63: 'Après l’accomplissement',
  64: 'Avant l’accomplissement',
};

export const HD_BODY_LABELS: Record<string, { name: string; glyph: string }> = {
  sun: { name: 'Soleil', glyph: '☉' },
  earth: { name: 'Terre', glyph: '⊕' },
  moon: { name: 'Lune', glyph: '☽' },
  north_node: { name: 'Nœud Nord', glyph: '☊' },
  south_node: { name: 'Nœud Sud', glyph: '☋' },
  mercury: { name: 'Mercure', glyph: '☿' },
  venus: { name: 'Vénus', glyph: '♀' },
  mars: { name: 'Mars', glyph: '♂' },
  jupiter: { name: 'Jupiter', glyph: '♃' },
  saturn: { name: 'Saturne', glyph: '♄' },
  uranus: { name: 'Uranus', glyph: '♅' },
  neptune: { name: 'Neptune', glyph: '♆' },
  pluto: { name: 'Pluton', glyph: '♇' },
};

export function definitionLabel(count: number): string {
  if (count === 0) return 'Aucune définition';
  if (count === 1) return 'Définition simple';
  if (count === 2) return 'Définition double';
  if (count === 3) return 'Définition triple';
  return 'Définition quadruple';
}
