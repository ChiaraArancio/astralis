import type { AstrologyResult } from '../../lib/astrology/engine';
import { ASPECTS, SIGNS } from '../../lib/astrology/data';

const SIZE = 620;
const CENTER = SIZE / 2;

function normalize(value: number) {
  return ((value % 360) + 360) % 360;
}

export function NatalWheel({ result, className }: { result: AstrologyResult; className?: string }) {
  if (!result.angles) return null;
  const asc = result.angles.ascendant.longitude;
  const offset = asc;
  const screenAngle = (longitude: number) => normalize(longitude - offset + 180);

  function point(longitude: number, radius: number) {
    const radians = (screenAngle(longitude) * Math.PI) / 180;
    return {
      x: CENTER + Math.cos(radians) * radius,
      y: CENTER - Math.sin(radians) * radius,
    };
  }

  const planets = result.planets.filter(
    (planet): planet is typeof planet & { longitude: number; sign: NonNullable<typeof planet.sign> } =>
      planet.longitude !== null && planet.sign !== null,
  );

  const sorted = [...planets].sort(
    (a, b) => screenAngle(a.longitude) - screenAngle(b.longitude),
  );
  const levels = [186, 166, 146, 126];
  const lastAngles = levels.map(() => -999);
  const placements = new Map<string, { level: number; angle: number }>();
  for (const planet of sorted) {
    const angle = screenAngle(planet.longitude);
    let level = 0;
    for (let index = 0; index < levels.length; index += 1) {
      const distance = Math.abs(((angle - lastAngles[index] + 540) % 360) - 180);
      if (distance > 12) {
        level = index;
        break;
      }
      level = Math.min(index + 1, levels.length - 1);
    }
    lastAngles[level] = angle;
    placements.set(planet.key, { level, angle });
  }

  const houseCusps = result.houses ?? [];
  const signStart = (index: number) => index * 30;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      role="img"
      aria-labelledby="natal-wheel-title natal-wheel-desc"
    >
      <title id="natal-wheel-title">Roue du thème astral de {result.input.firstName}</title>
      <desc id="natal-wheel-desc">
        Roue zodiacale avec les douze signes, les douze maisons et les positions planétaires du
        thème calculé.
      </desc>
      <defs>
        <radialGradient id="natal-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F7DECC" stopOpacity="0.36" />
          <stop offset="100%" stopColor="#FBF9F4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CENTER} cy={CENTER} r="292" fill="url(#natal-center)" />
      <circle cx={CENTER} cy={CENTER} r="278" fill="none" stroke="#E8DEC8" strokeWidth="0.8" strokeDasharray="2 5" />
      <circle cx={CENTER} cy={CENTER} r="260" fill="none" stroke="#D0C4BC" strokeWidth="1.1" />
      <circle cx={CENTER} cy={CENTER} r="216" fill="none" stroke="#D0C4BC" strokeWidth="0.9" />
      <circle cx={CENTER} cy={CENTER} r="160" fill="none" stroke="#E8DEC8" strokeWidth="0.7" />
      <circle cx={CENTER} cy={CENTER} r="92" fill="none" stroke="#DAC2B1" strokeWidth="0.9" />

      {SIGNS.map((sign, index) => {
        const start = signStart(index);
        const a = point(start, 216);
        const b = point(start, 260);
        const label = point(start + 15, 240);
        return (
          <g key={sign.slug}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#D0C4BC" strokeWidth="0.7" />
            <text
              x={label.x}
              y={label.y + 6}
              textAnchor="middle"
              fill="#5C4B3E"
              fontSize="19"
              fontFamily="'Noto Sans Symbols', Georgia, serif"
            >
              {sign.glyph}
            </text>
            <text
              x={point(start + 15, 226).x}
              y={point(start + 15, 226).y + 2}
              textAnchor="middle"
              fill="#A79C93"
              fontSize="6.5"
              letterSpacing="1"
              fontFamily="'Plus Jakarta Sans Variable', sans-serif"
            >
              {sign.name.slice(0, 3).toUpperCase()}
            </text>
          </g>
        );
      })}

      {houseCusps.map((cusp) => {
        const a = point(cusp.longitude, 92);
        const b = point(cusp.longitude, 216);
        const mid = point(cusp.longitude + 15, 205);
        return (
          <g key={cusp.number}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={cusp.number === 1 || cusp.number === 10 ? '#6D5B4D' : '#D0C4BC'}
              strokeWidth={cusp.number === 1 || cusp.number === 10 ? '1.4' : '0.7'}
              strokeDasharray={cusp.number === 1 || cusp.number === 10 ? undefined : '3 4'}
            />
            <text
              x={mid.x}
              y={mid.y + 2}
              textAnchor="middle"
              fill="#7F756F"
              fontSize="7"
              letterSpacing="0.6"
              fontFamily="'Plus Jakarta Sans Variable', sans-serif"
            >
              {cusp.number}
            </text>
          </g>
        );
      })}

      {result.aspects.map((aspect, index) => {
        const planetA = planets.find((planet) => planet.key === aspect.a);
        const planetB = planets.find((planet) => planet.key === aspect.b);
        if (!planetA || !planetB) return null;
        const a = point(planetA.longitude, 98);
        const b = point(planetB.longitude, 98);
        const definition = ASPECTS.find((entry) => entry.type === aspect.type);
        if (!definition) return null;
        const colors = {
          Fusion: '#B8A3D6',
          Tension: '#A66B5A',
          Harmonie: '#7F9A80',
          Opportunité: '#B8A3D6',
          Ajustement: '#D0C4BC',
        } as const;
        return (
          <line
            key={`${aspect.a}-${aspect.b}-${index}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={colors[definition.nature]}
            strokeWidth={definition.nature === 'Tension' ? 0.9 : 0.7}
            strokeOpacity={aspect.orb < 4 ? 0.6 : 0.35}
          />
        );
      })}

      {planets.map((planet) => {
        const placement = placements.get(planet.key);
        if (!placement) return null;
        const level = levels[placement.level] ?? 186;
        const anchor = point(planet.longitude, 216);
        const label = point(planet.longitude, level);
        return (
          <g key={planet.key}>
            <line
              x1={anchor.x}
              y1={anchor.y}
              x2={label.x}
              y2={label.y}
              stroke={planet.retrograde ? '#A66B5A' : '#D0C4BC'}
              strokeWidth="0.55"
            />
            <circle cx={label.x} cy={label.y} r="11" fill="#FBF9F4" stroke="#6D5B4D" strokeWidth="0.8" />
            <text
              x={label.x}
              y={label.y + 4}
              textAnchor="middle"
              fill="#302720"
              fontSize="11.5"
              fontFamily="'Noto Sans Symbols', Georgia, serif"
            >
              {planet.glyph}
            </text>
          </g>
        );
      })}

      {result.angles ? (
        <>
          <text
            x={point(asc, 288).x}
            y={point(asc, 288).y + 4}
            textAnchor="middle"
            fill="#5C4B3E"
            fontSize="8"
            letterSpacing="1.4"
            fontFamily="'Plus Jakarta Sans Variable', sans-serif"
          >
            ASC
          </text>
          <text
            x={point(result.angles.midheaven.longitude, 288).x}
            y={point(result.angles.midheaven.longitude, 288).y + 4}
            textAnchor="middle"
            fill="#5C4B3E"
            fontSize="8"
            letterSpacing="1.4"
            fontFamily="'Plus Jakarta Sans Variable', sans-serif"
          >
            MC
          </text>
        </>
      ) : null}

      <circle cx={CENTER} cy={CENTER} r="34" fill="#FBF9F4" fillOpacity="0.85" stroke="#DAC2B1" strokeWidth="0.8" />
      <text
        x={CENTER}
        y={CENTER + 3.5}
        textAnchor="middle"
        fill="#302720"
        fontSize="8"
        letterSpacing="2.4"
        fontFamily="'Plus Jakarta Sans Variable', sans-serif"
      >
        ASTRALIS
      </text>
    </svg>
  );
}
