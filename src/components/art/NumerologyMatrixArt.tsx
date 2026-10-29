const CX = 200;
const CY = 200;

function point(index: number, radius: number) {
  const angle = ((index * 40 - 90) * Math.PI) / 180;
  return { x: CX + Math.cos(angle) * radius, y: CY + Math.sin(angle) * radius };
}

export function NumerologyMatrixArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Matrice pythagoricienne décorative à neuf points"
    >
      <defs>
        <radialGradient id="matrix-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F7DECC" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FBF9F4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r="185" fill="url(#matrix-glow)" />
      <circle cx={CX} cy={CY} r="174" fill="none" stroke="#E4E2DD" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx={CX} cy={CY} r="150" fill="none" stroke="#D0C4BC" strokeWidth="1.1" />
      <circle cx={CX} cy={CY} r="112" fill="none" stroke="#E4E2DD" strokeWidth="0.8" />
      <circle cx={CX} cy={CY} r="70" fill="none" stroke="#DAC2B1" strokeWidth="0.9" />
      <circle cx={CX} cy={CY} r="26" fill="#F7DECC" fillOpacity="0.4" stroke="#6D5B4D" strokeWidth="1.1" />

      <polygon
        points={[0, 3, 6].map((index) => {
          const p = point(index, 150);
          return `${p.x},${p.y}`;
        }).join(' ')}
        fill="none"
        stroke="#302720"
        strokeOpacity="0.4"
        strokeWidth="1.1"
      />
      <polygon
        points={[1, 4, 7].map((index) => {
          const p = point(index, 150);
          return `${p.x},${p.y}`;
        }).join(' ')}
        fill="none"
        stroke="#302720"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />
      <polygon
        points={[2, 5, 8].map((index) => {
          const p = point(index, 150);
          return `${p.x},${p.y}`;
        }).join(' ')}
        fill="none"
        stroke="#302720"
        strokeOpacity="0.25"
        strokeWidth="0.8"
      />

      {Array.from({ length: 9 }).map((_, index) => {
        const p = point(index, 168);
        return (
          <g key={index}>
            <line x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#E8DEC8" strokeWidth="0.5" />
            <circle cx={p.x} cy={p.y} r={index === 0 ? 13 : 10} fill="#FBF9F4" stroke="#6D5B4D" strokeWidth="1.1" />
            <text
              x={p.x}
              y={p.y + 3.5}
              textAnchor="middle"
              fill="#302720"
              fontSize={index === 0 ? 10 : 8}
              fontWeight="600"
              fontFamily="'Plus Jakarta Sans Variable', sans-serif"
            >
              {index + 1}
            </text>
          </g>
        );
      })}

      <text
        x={CX}
        y={CY + 3.5}
        textAnchor="middle"
        fill="#302720"
        fontSize="13"
        letterSpacing="2"
        fontFamily="'Plus Jakarta Sans Variable', sans-serif"
      >
        3 × 3
      </text>

      <text
        x={CX}
        y="376"
        textAnchor="middle"
        fill="#A79C93"
        fontSize="7"
        letterSpacing="2.2"
        fontFamily="'Plus Jakarta Sans Variable', sans-serif"
      >
        MATRICE PYTHAGORICIENNE
      </text>
    </svg>
  );
}
