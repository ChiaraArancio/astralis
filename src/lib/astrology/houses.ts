import { MakeTime, SiderealTime, e_tilt } from 'astronomy-engine';

/**
 * Calcul des angles et des maisons astrologiques.
 *
 * Formules classiques de trigonométrie sphérique. Le temps sidéral apparent
 * de Greenwich et l'obliquité vraie sont fournis par Astronomy Engine (MIT).
 * L'algorithme Placidus est adapté de free-human-design (MIT) et vérifié par
 * des tests de non-régression.
 */

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

export const SIGN_NAMES_EN = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const;

export function normalizeAngle(value: number): number {
  return ((value % 360) + 360) % 360;
}

export interface SignPosition {
  longitude: number;
  sign: string;
  signIndex: number;
  degInSign: number;
}

export function signOf(longitude: number): SignPosition {
  const lon = normalizeAngle(longitude);
  const index = Math.floor(lon / 30) % 12;
  return {
    longitude: lon,
    sign: SIGN_NAMES_EN[index],
    signIndex: index,
    degInSign: lon - index * 30,
  };
}

export interface ChartAngles {
  ascendant: SignPosition;
  descendant: SignPosition;
  mc: SignPosition;
  ic: SignPosition;
  ramc: number;
  obliquity: number;
}

function gastDegrees(date: Date): number {
  return normalizeAngle(SiderealTime(date) * 15);
}

function trueObliquity(date: Date): number {
  return e_tilt(MakeTime(date)).tobl;
}

function eclipticLonFromRA(raDeg: number, epsDeg: number): number {
  const ra = raDeg * D2R;
  const eps = epsDeg * D2R;
  return normalizeAngle(Math.atan2(Math.sin(ra), Math.cos(ra) * Math.cos(eps)) * R2D);
}

function declinationOfEclipticPoint(lonDeg: number, epsDeg: number): number {
  return Math.asin(Math.sin(epsDeg * D2R) * Math.sin(lonDeg * D2R)) * R2D;
}

export function computeAngles(date: Date, lat: number, lng: number): ChartAngles {
  const eps = trueObliquity(date);
  const ramc = normalizeAngle(gastDegrees(date) + lng);
  const ramcR = ramc * D2R;
  const epsR = eps * D2R;
  const phiR = lat * D2R;

  const mc = normalizeAngle(
    Math.atan2(Math.sin(ramcR), Math.cos(ramcR) * Math.cos(epsR)) * R2D,
  );

  let asc = normalizeAngle(
    Math.atan2(
      Math.cos(ramcR),
      -(Math.sin(ramcR) * Math.cos(epsR) + Math.tan(phiR) * Math.sin(epsR)),
    ) * R2D,
  );

  if (normalizeAngle(asc - mc) > 180) asc = normalizeAngle(asc + 180);

  return {
    ascendant: signOf(asc),
    descendant: signOf(asc + 180),
    mc: signOf(mc),
    ic: signOf(mc + 180),
    ramc,
    obliquity: eps,
  };
}

function placidusIntermediate(
  ramc: number,
  eps: number,
  lat: number,
  which: '11' | '12' | '2' | '3',
): number | null {
  const phiR = lat * D2R;

  function targetRA(semiArc: number): number {
    const nightArc = 180 - semiArc;
    switch (which) {
      case '11':
        return ramc + (1 / 3) * semiArc;
      case '12':
        return ramc + (2 / 3) * semiArc;
      case '2':
        return ramc + semiArc + (1 / 3) * nightArc;
      case '3':
        return ramc + semiArc + (2 / 3) * nightArc;
    }
  }

  const initialOffset = { 11: 30, 12: 60, 2: 120, 3: 150 }[which];
  let ra = ramc + initialOffset;

  for (let iteration = 0; iteration < 100; iteration += 1) {
    const lon = eclipticLonFromRA(ra, eps);
    const declination = declinationOfEclipticPoint(lon, eps);
    const cosSA = -Math.tan(phiR) * Math.tan(declination * D2R);
    if (cosSA <= -1 || cosSA >= 1) return null;
    const semiArc = Math.acos(cosSA) * R2D;
    const next = targetRA(semiArc);
    if (Math.abs(normalizeAngle(next - ra + 180) - 180) < 1e-9) {
      ra = next;
      break;
    }
    ra = next;
  }
  return eclipticLonFromRA(ra, eps);
}

export interface HouseCusp {
  house: number;
  longitude: number;
  sign: string;
  signIndex: number;
  degInSign: number;
}

export interface HouseCalculation {
  system: 'placidus' | 'whole';
  requestedSystem: 'placidus';
  fallback: string | null;
  cusps: HouseCusp[];
  angles: ChartAngles;
}

export function computePlacidusHouses(
  date: Date,
  lat: number,
  lng: number,
): HouseCalculation {
  const angles = computeAngles(date, lat, lng);
  const asc = angles.ascendant.longitude;
  const mc = angles.mc.longitude;
  const eps = angles.obliquity;
  const ramc = angles.ramc;

  const c11 = placidusIntermediate(ramc, eps, lat, '11');
  const c12 = placidusIntermediate(ramc, eps, lat, '12');
  const c2 = placidusIntermediate(ramc, eps, lat, '2');
  const c3 = placidusIntermediate(ramc, eps, lat, '3');

  let cuspLongitudes: number[];
  let system: 'placidus' | 'whole' = 'placidus';
  let fallback: string | null = null;

  if ([c11, c12, c2, c3].some((value) => value === null)) {
    system = 'whole';
    fallback =
      'Le système Placidus n’est pas défini à cette latitude polaire ; le calcul bascule en maisons par signe entier.';
    const base = Math.floor(normalizeAngle(asc) / 30) * 30;
    cuspLongitudes = Array.from({ length: 12 }, (_, index) => normalizeAngle(base + index * 30));
  } else {
    cuspLongitudes = [
      asc,
      c2 as number,
      c3 as number,
      normalizeAngle(mc + 180),
      normalizeAngle((c11 as number) + 180),
      normalizeAngle((c12 as number) + 180),
      normalizeAngle(asc + 180),
      normalizeAngle((c2 as number) + 180),
      normalizeAngle((c3 as number) + 180),
      mc,
      c11 as number,
      c12 as number,
    ];
  }

  return {
    system,
    requestedSystem: 'placidus',
    fallback,
    cusps: cuspLongitudes.map((longitude, index) => ({
      house: index + 1,
      ...signOf(longitude),
    })),
    angles,
  };
}
