type FlowerProps = { cx: number; cy: number; scale?: number; rotate?: number };

function Sunflower({ cx, cy, scale = 1, rotate = 0 }: FlowerProps) {
  const petals = Array.from({ length: 14 });
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      {petals.map((_, i) => {
        const deg = (360 / petals.length) * i;
        return (
          <ellipse
            key={i}
            cx="0"
            cy="-13"
            rx="4.2"
            ry="9.5"
            fill="var(--gold)"
            stroke="var(--gold-deep)"
            strokeWidth="0.4"
            transform={`rotate(${deg})`}
          />
        );
      })}
      <circle cx="0" cy="0" r="9" fill="#4a3720" />
      <circle cx="0" cy="0" r="9" fill="none" stroke="var(--gold-deep)" strokeWidth="0.5" opacity="0.6" />
      {Array.from({ length: 20 }).map((_, i) => {
        const a = (Math.PI * 2 * i) / 20;
        const r = 2 + (i % 3);
        return (
          <circle
            key={i}
            cx={Math.cos(a) * r * 1.6}
            cy={Math.sin(a) * r * 1.6}
            r="0.7"
            fill="#2e2114"
            opacity="0.7"
          />
        );
      })}
    </g>
  );
}

function Lily({ cx, cy, scale = 1, rotate = 0, color = "#fffdf7" }: FlowerProps & { color?: string }) {
  const petals = 6;
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      {Array.from({ length: petals }).map((_, i) => {
        const deg = (360 / petals) * i;
        return (
          <path
            key={i}
            d="M0 0 C 2.5 -6 2 -13 0 -16 C -2 -13 -2.5 -6 0 0 Z"
            fill={color}
            stroke="var(--gold-deep)"
            strokeWidth="0.35"
            opacity="0.96"
            transform={`rotate(${deg})`}
          />
        );
      })}
      <circle cx="0" cy="0" r="1.6" fill="var(--gold)" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <line
          key={deg}
          x1="0"
          y1="0"
          x2="0"
          y2="-4"
          stroke="var(--gold-deep)"
          strokeWidth="0.5"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>
  );
}

function Blossom({ cx, cy, scale = 1, color = "#f4d374" }: FlowerProps & { color?: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-3.4"
          rx="2.1"
          ry="3.2"
          fill={color}
          opacity="0.95"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="1.3" fill="var(--gold-deep)" />
    </g>
  );
}

function LeafCluster({ cx, cy, scale = 1, rotate = 0 }: FlowerProps) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      {[
        [-14, -6, -35],
        [-4, -14, -10],
        [8, -12, 20],
        [16, -4, 45],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="10"
          ry="4.2"
          fill={i % 2 === 0 ? "var(--forest)" : "var(--olive)"}
          opacity="0.85"
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
    </g>
  );
}

type Props = {
  className?: string;
  variant?: "corner" | "band";
  flip?: boolean;
};

/**
 * Dense illustrated floral arrangement — sunflowers, lilies, small yellow
 * blossoms and layered greenery. Original flat-vector illustration (not a
 * photographic reproduction), inspired by classic garden-luxury florals.
 */
export default function FloralCluster({ className = "", variant = "corner", flip = false }: Props) {
  const transform = flip ? "scale(-1,1) translate(-260,0)" : undefined;

  if (variant === "band") {
    return (
      <svg viewBox="0 0 600 90" className={className} aria-hidden="true">
        <g transform={transform}>
          <LeafCluster cx={40} cy={70} scale={1.3} rotate={-8} />
          <LeafCluster cx={160} cy={72} scale={1.1} rotate={6} />
          <LeafCluster cx={300} cy={70} scale={1.3} rotate={-4} />
          <LeafCluster cx={440} cy={72} scale={1.1} rotate={8} />
          <LeafCluster cx={560} cy={68} scale={1.2} rotate={-6} />
          <Sunflower cx={70} cy={58} scale={1.15} />
          <Lily cx={140} cy={50} scale={0.95} rotate={-8} />
          <Lily cx={175} cy={62} scale={0.75} rotate={10} color="#f7f1e6" />
          <Blossom cx={230} cy={64} scale={1} />
          <Blossom cx={255} cy={54} scale={0.85} color="#fce9a8" />
          <Sunflower cx={330} cy={56} scale={1} rotate={4} />
          <Lily cx={400} cy={52} scale={0.9} rotate={6} />
          <Blossom cx={460} cy={62} scale={1} />
          <Sunflower cx={520} cy={58} scale={1.05} rotate={-6} />
          <Blossom cx={565} cy={50} scale={0.8} color="#f4d374" />
        </g>
      </svg>
    );
  }

  // corner variant — dense arrangement for a card/section corner
  return (
    <svg viewBox="0 0 260 260" className={className} aria-hidden="true">
      <g transform={transform}>
        <LeafCluster cx={40} cy={220} scale={1.6} rotate={-20} />
        <LeafCluster cx={20} cy={160} scale={1.4} rotate={10} />
        <LeafCluster cx={90} cy={230} scale={1.3} rotate={-40} />
        <LeafCluster cx={130} cy={190} scale={1.1} rotate={15} />

        <Sunflower cx={48} cy={216} scale={1.5} rotate={-6} />
        <Lily cx={95} cy={175} scale={1.1} rotate={-15} />
        <Lily cx={120} cy={150} scale={0.85} rotate={10} color="#f7f1e6" />
        <Lily cx={70} cy={130} scale={0.9} rotate={-25} />
        <Blossom cx={140} cy={205} scale={1.1} />
        <Blossom cx={160} cy={175} scale={0.9} color="#fce9a8" />
        <Blossom cx={35} cy={110} scale={0.85} color="#f4d374" />
        <Sunflower cx={150} cy={130} scale={0.7} rotate={12} />
      </g>
    </svg>
  );
}
