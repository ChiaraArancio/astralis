import { GATE_CENTER, CHANNELS } from '../../lib/humandesign/bodygraph';
import type { HumanDesignResult } from '../../lib/humandesign/engine';
import { HD_CENTERS } from '../../lib/humandesign/labels';

type CenterKey = 'head' | 'ajna' | 'throat' | 'g' | 'heart' | 'spleen' | 'sacral' | 'solarplexus' | 'root';

const CENTER_ANCHORS: Record<CenterKey, { x: number; y: number }> = {
  head: { x: 260, y: 100 },
  ajna: { x: 260, y: 180 },
  throat: { x: 260, y: 219 },
  g: { x: 260, y: 330 },
  heart: { x: 355, y: 390 },
  spleen: { x: 130, y: 440 },
  sacral: { x: 260, y: 460 },
  solarplexus: { x: 390, y: 440 },
  root: { x: 260, y: 560 },
};

const CENTER_SHAPES: Record<
  CenterKey,
  { type: 'polygon' | 'rect'; points?: string; x?: number; y?: number; width?: number; height?: number; label: { x: number; y: number } }
> = {
  head: { type: 'polygon', points: '260,28 315,98 205,98', label: { x: 260, y: 72 } },
  ajna: { type: 'polygon', points: '205,112 315,112 260,182', label: { x: 260, y: 142 } },
  throat: { type: 'rect', x: 225, y: 190, width: 70, height: 58, label: { x: 260, y: 224 } },
  g: { type: 'polygon', points: '260,280 310,330 260,380 210,330', label: { x: 260, y: 334 } },
  heart: { type: 'polygon', points: '355,340 410,410 300,410', label: { x: 355, y: 391 } },
  spleen: { type: 'polygon', points: '130,390 180,460 80,460', label: { x: 130, y: 441 } },
  solarplexus: { type: 'polygon', points: '390,390 440,460 340,460', label: { x: 390, y: 441 } },
  sacral: { type: 'rect', x: 225, y: 430, width: 70, height: 58, label: { x: 260, y: 464 } },
  root: { type: 'rect', x: 225, y: 530, width: 70, height: 58, label: { x: 260, y: 564 } },
};

function centerOfGate(gate: number): CenterKey {
  return GATE_CENTER[gate] as CenterKey;
}

function gatePoint(gate: number, channelKey: string): { x: number; y: number } {
  const channel = CHANNELS.find((entry) => entry.key === channelKey);
  const home = centerOfGate(gate);
  const otherGate = channel?.gates.find((entry) => entry !== gate);
  const other = otherGate ? centerOfGate(otherGate) : home;
  const start = CENTER_ANCHORS[home];
  const end = CENTER_ANCHORS[other];
  if (home === other) {
    const direction = gate % 2 === 0 ? 1 : -1;
    return { x: start.x + direction * 20, y: start.y - 14 };
  }
  const t = 0.32;
  return { x: start.x + (end.x - start.x) * t, y: start.y + (end.y - start.y) * t };
}

export function BodyGraph({ result, className }: { result: HumanDesignResult; className?: string }) {
  const definedSet = new Set(result.definedCenters);
  const definedChannels = new Set(result.channels.map((channel) => channel.key));
  const gateMap = new Map(result.gates.map((gate) => [gate.gate, gate]));

  return (
    <svg
      viewBox="0 0 520 650"
      className={className}
      role="img"
      aria-labelledby="bodygraph-title bodygraph-desc"
    >
      <title id="bodygraph-title">BodyGraph de {result.input.firstName}</title>
      <desc id="bodygraph-desc">
        Neuf centres avec les canaux définis et les portes activées. Les centres pleins sont définis,
        les centres clairs sont ouverts.
      </desc>
      <defs>
        <radialGradient id="bodygraph-bg" cx="50%" cy="44%" r="55%">
          <stop offset="0%" stopColor="#ECDCFF" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#FBF9F4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="300" r="285" fill="url(#bodygraph-bg)" />
      <circle cx="260" cy="300" r="270" fill="none" stroke="#E8DEC8" strokeWidth="0.7" strokeDasharray="2 5" />

      {CHANNELS.map((channel) => {
        const from = CENTER_ANCHORS[channel.centers[0] as CenterKey];
        const to = CENTER_ANCHORS[channel.centers[1] as CenterKey];
        if (!from || !to) return null;
        const active = definedChannels.has(channel.key);
        return (
          <line
            key={`channel-${channel.key}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={active ? '#6D5B4D' : '#D9D4CB'}
            strokeWidth={active ? 2.2 : 0.9}
            strokeDasharray={active ? undefined : '3 4'}
            strokeLinecap="round"
          />
        );
      })}

      {Object.entries(CENTER_SHAPES).map(([key, shape]) => {
        const defined = definedSet.has(key);
        const centerInfo = HD_CENTERS.find((center) => center.key === key);
        return (
          <g key={key}>
            {shape.type === 'polygon' ? (
              <polygon
                points={shape.points}
                fill={defined ? '#302720' : '#FFFFFF'}
                stroke={defined ? '#302720' : '#C8BDB4'}
                strokeWidth="1.4"
              />
            ) : (
              <rect
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                rx="4"
                fill={defined ? '#302720' : '#FFFFFF'}
                stroke={defined ? '#302720' : '#C8BDB4'}
                strokeWidth="1.4"
              />
            )}
            <text
              x={shape.label.x}
              y={shape.label.y + 2}
              textAnchor="middle"
              fill={defined ? '#FBF9F4' : '#5C4B3E'}
              fontSize="7"
              letterSpacing="1.1"
              fontFamily="'Plus Jakarta Sans Variable', sans-serif"
            >
              {(centerInfo?.name ?? key).toUpperCase()}
            </text>
          </g>
        );
      })}

      {CHANNELS.map((channel) =>
        channel.gates.map((gate) => {
          const gateInfo = gateMap.get(gate);
          if (!gateInfo && !definedChannels.has(channel.key)) return null;
          const point = gatePoint(gate, channel.key);
          const active = Boolean(gateInfo);
          return (
            <g key={`gate-${channel.key}-${gate}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="7.2"
                fill={active ? '#B8A3D6' : '#FFFFFF'}
                stroke={active ? '#6D5B4D' : '#D0C4BC'}
                strokeWidth="0.8"
              />
              <text
                x={point.x}
                y={point.y + 2.5}
                textAnchor="middle"
                fill="#302720"
                fontSize="5.8"
                fontFamily="'Plus Jakarta Sans Variable', sans-serif"
              >
                {gate}
              </text>
            </g>
          );
        }),
      )}

      <g transform="translate(20 574)">
        <rect x="0" y="0" width="10" height="10" rx="2" fill="#302720" />
        <text x="16" y="8.5" fill="#5C4B3E" fontSize="7" fontFamily="'Plus Jakarta Sans Variable', sans-serif">
          Défini
        </text>
        <rect x="78" y="0" width="10" height="10" rx="2" fill="#FFFFFF" stroke="#C8BDB4" strokeWidth="1" />
        <text x="94" y="8.5" fill="#5C4B3E" fontSize="7" fontFamily="'Plus Jakarta Sans Variable', sans-serif">
          Ouvert
        </text>
        <circle cx="158" cy="5" r="5" fill="#B8A3D6" stroke="#6D5B4D" strokeWidth="0.8" />
        <text x="168" y="8.5" fill="#5C4B3E" fontSize="7" fontFamily="'Plus Jakarta Sans Variable', sans-serif">
          Porte activée
        </text>
      </g>

      <text
        x="260"
        y="625"
        textAnchor="middle"
        fill="#7F756F"
        fontSize="7"
        letterSpacing="1.5"
        fontFamily="'Plus Jakarta Sans Variable', sans-serif"
      >
        {result.definedCenters.length} CENTRES DÉFINIS · {result.channels.length} CANAUX · {result.definitionLabel.toUpperCase()}
      </text>

      <g transform="translate(20 20)">
        <text fill="#A79C93" fontSize="6.5" letterSpacing="1.6" fontFamily="'Plus Jakarta Sans Variable', sans-serif">
          FIG. 01 · MATRICE CORPORELLE
        </text>
      </g>
    </svg>
  );
}
