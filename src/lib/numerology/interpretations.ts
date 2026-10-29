import type { MasterNumber, NumerologyNumber, CoreNumber } from './core';

export interface NumberInterpretation {
  number: NumerologyNumber;
  keywords: string[];
  essence: string;
  strengths: string[];
  challenges: string[];
  advice: string;
  lifePathTitle: string;
  expressionTitle: string;
  soulUrgeTitle: string;
  personalityTitle: string;
  personalYearTitle: string;
  personalYearText: string;
}

const DATA: Record<NumerologyNumber, Omit<NumberInterpretation, 'number'>> = {
  1: {
    keywords: ['Initiative', 'Indépendance', 'Volonté'],
    essence:
      "Le 1 porte l’élan du commencement. Il représente la capacité à poser une direction, à prendre sa place et à avancer sans attendre une permission extérieure. Son apprentissage consiste à transformer la force de la volonté en projet durable, sans confondre autonomie et isolement.",
    strengths: ['Capacité à décider', 'Courage et franchise', 'Goût de l’initiative'],
    challenges: ['Impatience', 'Tendance à tout porter seul', 'Difficulté à déléguer'],
    advice:
      'Donnez un cadre concret à votre élan et laissez les autres contribuer : votre puissance grandit lorsqu’elle devient un projet partagé.',
    lifePathTitle: 'Le Pionnier',
    expressionTitle: 'L’Affirmé',
    soulUrgeTitle: 'L’Indépendant',
    personalityTitle: 'Le Décidé',
    personalYearTitle: 'Année d’initiation',
    personalYearText:
      'Un nouveau cycle s’ouvre. C’est une année pour semer, décider et poser une intention claire. Évitez de vouloir tout contrôler : choisissez une direction et faites le premier pas.',
  },
  2: {
    keywords: ['Écoute', 'Coopération', 'Sensibilité'],
    essence:
      "Le 2 est la force du lien. Il perçoit les nuances, les atmosphères et les besoins de l’autre. Son intelligence est relationnelle et diplomatique. Il apprend à coopérer sans se dissoudre, à dire oui sans trahir son propre rythme.",
    strengths: ['Écoute fine', 'Diplomatie', 'Sens du partenariat'],
    challenges: ['Indécision', 'Besoin excessif d’approbation', 'Difficulté à poser des limites'],
    advice:
      'Faites de votre sensibilité une compétence relationnelle, pas une obligation de plaire. Votre clarté intérieure vaut autant que l’harmonie extérieure.',
    lifePathTitle: 'Le Médiateur',
    expressionTitle: 'Le Diplomate',
    soulUrgeTitle: 'L’Accordé',
    personalityTitle: 'L’Attentionné',
    personalYearTitle: 'Année de coopération',
    personalYearText:
      'Les alliances et la patience sont au premier plan. C’est une année pour écouter, négocier et laisser mûrir les projets. Les résultats arrivent par le lien plutôt que par la précipitation.',
  },
  3: {
    keywords: ['Expression', 'Créativité', 'Joie'],
    essence:
      "Le 3 est le mouvement de l’expression. Il relie l’intuition à la parole, à l’image et à la création. Il possède une capacité naturelle à inspirer, à raconter et à rassembler. Son défi est de canaliser une énergie foisonnante sans se disperser.",
    strengths: ['Créativité', 'Communication', 'Optimisme communicatif'],
    challenges: ['Dispersion', 'Procrastination', 'Sensibilité à la critique'],
    advice:
      'Choisissez moins de projets, mais donnez-leur une forme aboutie. La régularité transforme le talent en œuvre.',
    lifePathTitle: 'Le Communicant',
    expressionTitle: 'L’Expressif',
    soulUrgeTitle: 'Le Créatif',
    personalityTitle: 'Le Chaleureux',
    personalYearTitle: 'Année d’expression',
    personalYearText:
      'Votre créativité et votre visibilité sont soutenues. C’est une année pour écrire, parler, rencontrer et montrer ce que vous faites. Gardez un cap pour éviter l’éparpillement.',
  },
  4: {
    keywords: ['Structure', 'Fiabilité', 'Méthode'],
    essence:
      "Le 4 construit. Il aime les fondations solides, les repères et le travail bien fait. Il transforme les idées en systèmes concrets. Son apprentissage consiste à assouplir sa rigueur et à accueillir l’imprévu sans perdre sa stabilité.",
    strengths: ['Organisation', 'Persévérance', 'Sens des responsabilités'],
    challenges: ['Rigidité', 'Perfectionnisme', 'Peur du changement'],
    advice:
      'Une structure est faite pour soutenir la vie, pas pour la figer. Laissez une marge de manœuvre à l’expérimentation.',
    lifePathTitle: 'Le Bâtisseur',
    expressionTitle: 'Le Méthodique',
    soulUrgeTitle: 'Le Stable',
    personalityTitle: 'Le Fiable',
    personalYearTitle: 'Année de fondation',
    personalYearText:
      'Le travail, la méthode et la consolidation sont favorisés. C’est une année pour structurer, réparer et poser des bases durables. Les efforts réguliers comptent plus que les coups d’éclat.',
  },
  5: {
    keywords: ['Liberté', 'Mouvement', 'Curiosité'],
    essence:
      "Le 5 incarne le mouvement et l’expérience. Il apprend par le contact avec le monde, les voyages, les rencontres et les changements de perspective. Il a besoin d’espace. Son défi est de rester engagé sans fuir dès que la routine s’installe.",
    strengths: ['Adaptabilité', 'Curiosité', 'Aisance dans le changement'],
    challenges: ['Instabilité', 'Excès', 'Difficulté à s’engager dans la durée'],
    advice:
      'La liberté véritable n’est pas l’absence de cadre : c’est la capacité à choisir ses engagements et à les habiter.',
    lifePathTitle: 'L’Explorateur',
    expressionTitle: 'Le Polyvalent',
    soulUrgeTitle: 'L’Insatiable',
    personalityTitle: 'L’Adaptable',
    personalYearTitle: 'Année de mouvement',
    personalYearText:
      'Changements, déplacements et ouvertures sont probables. C’est une année pour expérimenter et élargir le champ des possibles. Restez ancré pour ne pas confondre mouvement et fuite.',
  },
  6: {
    keywords: ['Soin', 'Responsabilité', 'Harmonie'],
    essence:
      "Le 6 est le nombre du lien affectif et de la responsabilité. Il prend soin, protège, embellit et crée des espaces où l’on se sent accueilli. Son apprentissage consiste à aimer sans se sacrifier, et à laisser l’autre responsable de son propre chemin.",
    strengths: ['Bienveillance', 'Sens du devoir', 'Sens esthétique'],
    challenges: ['Perfectionnisme', 'Contrôle', 'Oubli de soi'],
    advice:
      'Prendre soin de soi n’est pas un abandon des autres. Une juste distance rend votre soutien plus libre et plus efficace.',
    lifePathTitle: 'Le Gardien',
    expressionTitle: 'Le Responsable',
    soulUrgeTitle: 'L’Aimant',
    personalityTitle: 'Le Protecteur',
    personalYearTitle: 'Année de responsabilité',
    personalYearText:
      'La famille, les engagements et l’harmonie du quotidien sont au centre. C’est une année pour ajuster la juste place de chacun. Attention à ne pas porter ce qui ne vous appartient pas.',
  },
  7: {
    keywords: ['Introspection', 'Analyse', 'Vérité'],
    essence:
      "Le 7 cherche à comprendre. Il a besoin de silence, d’étude et de profondeur pour relier les faits à un sens plus vaste. Son intelligence est analytique et contemplative. Il apprend à faire confiance à ce qu’il ne peut pas encore prouver.",
    strengths: ['Profondeur', 'Discernement', 'Autonomie intellectuelle'],
    challenges: ['Isolement', 'Méfiance', 'Surintellectualisation'],
    advice:
      'Votre lucidité est précieuse, mais elle n’a pas besoin de tout contrôler. Revenez régulièrement au corps et à l’expérience directe.',
    lifePathTitle: 'Le Chercheur',
    expressionTitle: 'L’Analyste',
    soulUrgeTitle: 'L’Intérieur',
    personalityTitle: 'Le Réservé',
    personalYearTitle: 'Année d’introspection',
    personalYearText:
      'Le retrait, l’étude et le bilan intérieur sont favorables. C’est une année pour approfondir plutôt que multiplier. Ne forcez pas les décisions : la clarté viendra du silence.',
  },
  8: {
    keywords: ['Pouvoir', 'Réalisation', 'Justice'],
    essence:
      "Le 8 relie la vision à la matière. Il possède une aptitude à décider, organiser et faire aboutir. Il interroge la juste usage du pouvoir, de l’argent et de l’autorité. Son apprentissage consiste à réussir sans dominer, et à servir une ambition qui le dépasse.",
    strengths: ['Leadership', 'Capacité stratégique', 'Résistance'],
    challenges: ['Contrôle', 'Surmenage', 'Confusion entre valeur et réussite'],
    advice:
      'Mesurez votre réussite à la qualité de ce que vous construisez et à la manière dont les autres grandissent autour de vous.',
    lifePathTitle: 'Le Souverain',
    expressionTitle: 'Le Stratège',
    soulUrgeTitle: 'L’Accomplisseur',
    personalityTitle: 'L’Autoritaire',
    personalYearTitle: 'Année de récolte',
    personalYearText:
      'Les résultats, la reconnaissance et les questions matérielles sont au premier plan. C’est une année pour assumer votre autorité et récolter ce qui a été semé. Restez juste dans l’usage de votre pouvoir.',
  },
  9: {
    keywords: ['Humanisme', 'Compassion', 'Achèvement'],
    essence:
      "Le 9 ouvre la conscience au collectif. Il porte une aspiration à servir, à transmettre et à relier les différences. Il représente aussi la fin des cycles et la capacité à lâcher prise. Son défi est de ne pas se perdre dans le sauvetage de l’autre.",
    strengths: ['Empathie', 'Idéalisme', 'Capacité à transmettre'],
    challenges: ['Difficulté à conclure', 'Sauveur', 'Désillusion'],
    advice:
      'Servez sans vous dissoudre. Laisser partir ce qui est terminé est aussi un acte d’amour envers le vivant.',
    lifePathTitle: 'L’Humaniste',
    expressionTitle: 'Le Philanthrope',
    soulUrgeTitle: 'L’Universel',
    personalityTitle: 'Le Tolérant',
    personalYearTitle: 'Année d’achèvement',
    personalYearText:
      'Un cycle se referme. C’est une année pour clôturer, pardonner, transmettre et faire de la place. Ne retenez pas ce qui demande à partir : l’élan du renouveau viendra ensuite.',
  },
  11: {
    keywords: ['Intuition', 'Inspiration', 'Transmission'],
    essence:
      "Le 11 est un nombre maître : il amplifie la sensibilité du 2 et l’ouvre à une dimension visionnaire. Il capte des intuitions, des images et des idées qui dépassent le cadre habituel. Son défi est de canaliser cette intensité sans se laisser submerger par le doute ou la nervosité.",
    strengths: ['Intuition', 'Capacité d’inspiration', 'Vibration créative'],
    challenges: ['Hypersensibilité', 'Doute de soi', 'Surmenage nerveux'],
    advice:
      'Ancrez vos intuitions dans des gestes simples et réguliers. Vous n’avez pas à porter seul la lumière que vous percevez.',
    lifePathTitle: 'L’Inspirateur',
    expressionTitle: 'Le Visionnaire',
    soulUrgeTitle: 'L’Idéaliste',
    personalityTitle: 'L’Intuitif',
    personalYearTitle: 'Année d’inspiration',
    personalYearText:
      'Les intuitions sont vives et la visibilité peut s’accroître. C’est une année pour transmettre une idée qui vous dépasse, en acceptant de la construire pas à pas. Protégez votre énergie nerveuse.',
  },
  22: {
    keywords: ['Construction', 'Vision', 'Impact'],
    essence:
      "Le 22 est le bâtisseur de vision. Il associe l’intuition du 11 à la capacité de structuration du 4. Il est fait pour traduire une utopie en projet concret, à une échelle qui dépasse l’individu. Son défi est de ne pas se perdre dans la démesure ou la pression de résultat.",
    strengths: ['Vision structurée', 'Capacité de réalisation', 'Endurance'],
    challenges: ['Pression intérieure', 'Perfectionnisme', 'Peur de l’échec'],
    advice:
      'Découpez la vision en étapes modestes. La grandeur d’un projet se mesure à sa capacité à durer, pas à la vitesse à laquelle il impressionne.',
    lifePathTitle: 'Le Bâtisseur de vision',
    expressionTitle: 'L’Architecte',
    soulUrgeTitle: 'Le Réalisateur',
    personalityTitle: 'Le Visionnaire concret',
    personalYearTitle: 'Année de construction',
    personalYearText:
      'Un projet de grande ampleur peut prendre forme. C’est une année pour structurer, fédérer et construire dans la durée. Avancez par étapes et acceptez l’aide disponible.',
  },
  33: {
    keywords: ['Transmission', 'Soin', 'Sagesse'],
    essence:
      "Le 33 est un nombre maître d’enseignement et de soin. Il pousse le 6 vers une responsabilité plus vaste : accompagner, transmettre et créer des lieux de confiance. Son défi est de ne pas se sacrifier au nom d’un idéal, et d’incarner ce qu’il enseigne.",
    strengths: ['Bienveillance structurante', 'Pédagogie', 'Capacité de rassemblement'],
    challenges: ['Sacrifice', 'Attentes irréalistes', 'Difficulté à recevoir'],
    advice:
      'Vous n’avez pas à sauver le monde pour être utile. Commencez par incarner, dans votre entourage proche, la qualité de présence que vous souhaitez transmettre.',
    lifePathTitle: 'L’Enseignant guérisseur',
    expressionTitle: 'Le Mentor',
    soulUrgeTitle: 'Le Transmetteur',
    personalityTitle: 'Le Bienveillant',
    personalYearTitle: 'Année de transmission',
    personalYearText:
      'Une responsabilité de transmission peut s’intensifier. C’est une année pour enseigner, soutenir et créer du lien durable. Veillez à ne pas vous oublier dans le soin apporté aux autres.',
  },
};

export const NUMBER_INTERPRETATIONS: Record<NumerologyNumber, NumberInterpretation> = Object.fromEntries(
  Object.entries(DATA).map(([key, value]) => [Number(key), { number: Number(key) as NumerologyNumber, ...value }]),
) as Record<NumerologyNumber, NumberInterpretation>;

export function getNumberInterpretation(value: NumerologyNumber | 0): NumberInterpretation | null {
  if (value === 0) return null;
  return NUMBER_INTERPRETATIONS[value] ?? null;
}

export const PILLAR_EXPLANATIONS: Record<string, string> = {
  lifePath:
    "Le Chemin de vie est calculé à partir de tous les chiffres de votre date de naissance. Il décrit la direction d’ensemble, les apprentissages majeurs et la manière dont vous êtes invité·e à traverser vos cycles.",
  expression:
    "Le Nombre d’Expression additionne toutes les lettres de votre nom de naissance. Il évoque vos talents visibles, votre manière d’agir dans le monde et les ressources dont vous disposez pour réaliser votre chemin.",
  soulUrge:
    "L’Élan spirituel additionne les voyelles du nom complet. Il pointe le désir profond, ce qui motive intérieurement et ce qui nourrit le sentiment d’être à sa place.",
  personality:
    "Le Nombre de Personnalité additionne les consonnes. Il décrit la façade sociale, la manière dont vous êtes perçu·e au premier contact et votre façon de matérialiser vos intentions.",
  maturity:
    "Le Nombre de Maturité s’obtient en additionnant le Chemin de vie et le Nombre d’Expression. Il évoque une qualité à intégrer au fil des années, souvent plus sensible après la quarantaine.",
  personalYear:
    "L’Année personnelle se calcule à partir du jour et du mois de naissance, additionnés à l’année civile en cours. Elle donne le tempo symbolique des douze prochains mois. Il s’agit d’un climat, jamais d’une prédiction d’événements.",
};

export const MASTER_NUMBER_NOTE =
  "Les nombres 11, 22 et 33 sont conservés lorsqu’ils apparaissent. On les lit à la fois dans leur vibration maîtresse et dans leur réduction (11/2, 22/4, 33/6). Aucun nombre n’est « meilleur » qu’un autre : les maîtres nombres décrivent une intensité et une exigence particulières.";

export function isMaster(value: NumerologyNumber | 0): value is MasterNumber {
  return value === 11 || value === 22 || value === 33;
}

export function coreOf(value: NumerologyNumber | 0): CoreNumber | 0 {
  if (value === 0) return 0;
  if (value === 11) return 2;
  if (value === 22) return 4;
  if (value === 33) return 6;
  return value;
}
