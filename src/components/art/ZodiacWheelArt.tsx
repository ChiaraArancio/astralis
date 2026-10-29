import { SIGNS } from '../../lib/astrology/data';

const CX = 210;
const CY = 210;

function point(longitude: number, radius: number) {
  const radians = ((longitude + 180) * Math.PI) / 180;
  return { x: CX + Math.cos(radians) * radius, y: CY - Math.sin(radians) * radius };
}

export function ZodiacWheelArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      className={className}
      role="img"
      aria-label="Roue zodiacale décorative à douze secteurs"
    >
      <defs>
        <radialGradient id="wheel-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F7DECC" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FBF9F4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r="202" fill="url(#wheel-glow)" />
      <circle cx={CX} cy={CY} r="191" fill="none" stroke="#E8DEC8" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx={CX} cy={CY} r="166" fill="none" stroke="#D0C4BC" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="128" fill="none" stroke="#E8DEC8" strokeWidth="0.8" />
      <circle cx={CX} cy={CY} r="76" fill="none" stroke="#DAC2B1" strokeWidth="1" />
      <circle cx={CX} cy={CY} r="34" fill="#F7DECC" fillOpacity="0.35" stroke="#6D5B4D" strokeWidth="1" />

      {SIGNS.map((sign, index) => {
        const start = index * 30;
        const inner = point(start, 128);
        const outer = point(start, 191);
        const label = point(start + 15, 149);
        return (
          <g key={sign.slug}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#D0C4BC" strokeWidth="0.7" />
            <text
              x={label.x}
              y={label.y + 5}
              textAnchor="middle"
              fill="#5C4B3E"
              fontSize="16"
              fontFamily="'Noto Sans Symbols', serif"
            >
              {sign.glyph}
            </text>
            <text
              x={point(start + 15, 107).x}
              y={point(start + 15, 107).y + 3}
              textAnchor="middle"
              fill="#A79C93"
              fontSize="6.5"
              letterSpacing="1.2"
              fontFamily="'Plus Jakarta Sans Variable', sans-serif"
            >
              {String(start).padStart(2, '0')}°
            </text>
          </g>
        );
      })}

      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const a = point(angle, 30);
        const b = point(angle, 191);
        return <line key={angle} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#E8DEC8" strokeWidth="0.6" />;
      })}

      <polygon
        points={`${point(0, 76).x},${point(0, 76).y} ${point(120, 76).x},${point(120, 76).y} ${point(240, 76).x},${point(240, 76).y}`}
        fill="none"
        stroke="#302720"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <polygon
        points={`${point(60, 76).x},${point(60, 76).y} ${point(180, 76).x},${point(180, 76).y} ${point(300, 76).x},${point(300, 76).y}`}
        fill="none"
        stroke="#302720"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {[
        { lon: 8, glyph: '☉', r: 174 },
        { lon: 72, glyph: '☽', r: 174 },
        { lon: 136, glyph: '☿', r: 174 },
        { lon: 200, glyph: '♀', r: 174 },
        { lon: 264, glyph: '♂', r: 174 },
        { lon: 328, glyph: '♃', r: 174 },
      ].map((planet) => {
        const p = point(planet.lon, planet.r);
        return (
          <g key={planet.glyph}>
            <circle cx={p.x} cy={p.y} r="10" fill="#FBF9F4" stroke="#6D5B4D" strokeWidth="0.8" />
            <text
              x={p.x}
              y={p.y + 3.5}
              textAnchor="middle"
              fill="#302720"
              fontSize="10"
              fontFamily="'Noto Sans Symbols', serif"
            >
              {planet.glyph}
            </text>
          </g>
        );
      })}

      <text
        x={CX}
        y={CY + 4}
        textAnchor="middle"
        fill="#302720"
        fontSize="11"
        letterSpacing="3"
        fontFamily="'Plus Jakarta Sans Variable', sans-serif"
      >
        ASTRALIS
      </text>
    </svg>
  );
}
