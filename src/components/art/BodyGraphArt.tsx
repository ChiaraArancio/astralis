const CENTERS = [
  { key: 'head', points: '210,26 246,78 174,78', defined: true },
  { key: 'ajna', points: '174,90 246,90 210,142', defined: true },
  { key: 'throat', points: '188,154 232,154 232,198 188,198', defined: true },
  { key: 'g', points: '210,216 248,254 210,292 172,254', defined: false },
  { key: 'heart', points: '276,228 306,278 246,278', defined: false },
  { key: 'spleen', points: '88,292 136,292 112,344', defined: true },
  { key: 'sacral', points: '188,320 232,320 232,364 188,364', defined: true },
  { key: 'solar', points: '284,292 332,292 308,344', defined: false },
  { key: 'root', points: '188,384 232,384 232,424 188,424', defined: true },
];

const CHANNELS = [
  ['210,78', '210,90'],
  ['210,142', '210,154'],
  ['210,198', '210,216'],
  ['210,292', '210,320'],
  ['210,364', '210,384'],
  ['188,176', '112,292'],
  ['232,176', '308,292'],
  ['188,342', '112,318'],
  ['232,342', '308,318'],
  ['172,254', '112,292'],
  ['248,254', '308,292'],
  ['248,254', '276,278'],
];

export function BodyGraphArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 460"
      className={className}
      role="img"
      aria-label="BodyGraph décoratif à neuf centres"
    >
      <defs>
        <radialGradient id="bodygraph-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ECDCFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FBF9F4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="230" r="200" fill="url(#bodygraph-glow)" />
      <circle cx="210" cy="230" r="188" fill="none" stroke="#E8DEC8" strokeWidth="0.8" strokeDasharray="2 5" />

      {CHANNELS.map(([from, to], index) => {
        const [x1, y1] = from.split(',').map(Number);
        const [x2, y2] = to.split(',').map(Number);
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={index < 5 ? '#6D5B4D' : '#D0C4BC'}
            strokeWidth={index < 5 ? 1.6 : 0.9}
            strokeDasharray={index < 5 ? undefined : '3 3'}
          />
        );
      })}

      {CENTERS.map((center) => (
        <g key={center.key}>
          <polygon
            points={center.points}
            fill={center.defined ? '#302720' : '#FFFFFF'}
            stroke={center.defined ? '#302720' : '#D0C4BC'}
            strokeWidth="1.2"
          />
        </g>
      ))}

      {[
        { x: 210, y: 55, label: 'Tête' },
        { x: 210, y: 118, label: 'Ajna' },
        { x: 210, y: 176, label: 'Gorge' },
        { x: 210, y: 254, label: 'G' },
        { x: 276, y: 266, label: 'Cœur' },
        { x: 112, y: 318, label: 'Rate' },
        { x: 210, y: 342, label: 'Sacral' },
        { x: 308, y: 318, label: 'Plexus' },
        { x: 210, y: 404, label: 'Racine' },
      ].map((label) => (
        <text
          key={label.label}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          fill={['Tête', 'Ajna', 'Gorge', 'Sacral', 'Racine'].includes(label.label) ? '#FBF9F4' : '#5C4B3E'}
          fontSize="7"
          letterSpacing="1"
          fontFamily="'Plus Jakarta Sans Variable', sans-serif"
        >
          {label.label.toUpperCase()}
        </text>
      ))}

      {[
        { x: 198, y: 84, n: '64' },
        { x: 222, y: 84, n: '61' },
        { x: 198, y: 132, n: '47' },
        { x: 222, y: 132, n: '24' },
        { x: 196, y: 162, n: '62' },
        { x: 224, y: 190, n: '31' },
        { x: 184, y: 246, n: '1' },
        { x: 236, y: 246, n: '7' },
        { x: 272, y: 248, n: '21' },
        { x: 104, y: 306, n: '57' },
        { x: 196, y: 330, n: '34' },
        { x: 224, y: 354, n: '5' },
        { x: 316, y: 306, n: '36' },
        { x: 196, y: 394, n: '53' },
        { x: 224, y: 414, n: '60' },
      ].map((gate) => (
        <g key={`${gate.x}-${gate.y}-${gate.n}`}>
          <circle cx={gate.x} cy={gate.y} r="6.2" fill="#FBF9F4" stroke="#B8A3D6" strokeWidth="0.8" />
          <text
            x={gate.x}
            y={gate.y + 2.4}
            textAnchor="middle"
            fill="#302720"
            fontSize="5.2"
            fontFamily="'Plus Jakarta Sans Variable', sans-serif"
          >
            {gate.n}
          </text>
        </g>
      ))}

      <text
        x="210"
        y="449"
        textAnchor="middle"
        fill="#A79C93"
        fontSize="6"
        letterSpacing="2"
        fontFamily="'Plus Jakarta Sans Variable', sans-serif"
      >
        FIG. 01 · MATRICE CORPORELLE
      </text>
    </svg>
  );
}
