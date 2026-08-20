type Props = {
  className?: string;
  variant?: "corner" | "branch" | "sprig";
  flip?: boolean;
};

/**
 * Hand-drawn-style floral line art — sunflower-inspired centers in gold,
 * stems and leaves in forest/olive green, matching the classic European
 * garden-luxury palette (gold, cream, ivory, olive, forest green).
 */
export default function FloralOrnament({
  className = "",
  variant = "corner",
  flip = false,
}: Props) {
  const transform = flip ? "scale(-1,1) translate(-220,0)" : undefined;

  if (variant === "branch") {
    return (
      <svg viewBox="0 0 220 90" className={className} fill="none" aria-hidden="true">
        <g transform={transform}>
          <path
            d="M2 45c40-18 80-24 130-16 30 5 58 16 86 6"
            stroke="var(--forest)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          {[
            [40, 38],
            [78, 30],
            [116, 27],
            [154, 30],
            [190, 22],
          ].map(([x, y], i) => (
            <g key={i} opacity={0.9 - i * 0.05}>
              <circle cx={x} cy={y} r="4.2" fill="var(--gold)" opacity="0.85" />
              <circle cx={x} cy={y} r="4.2" stroke="var(--gold-deep)" strokeWidth="0.7" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <ellipse
                  key={deg}
                  cx={x}
                  cy={y}
                  rx="2.6"
                  ry="1.1"
                  fill="none"
                  stroke="var(--gold-deep)"
                  strokeWidth="0.5"
                  transform={`rotate(${deg} ${x} ${y}) translate(6 0)`}
                />
              ))}
              <path
                d={`M${x - 6} ${y + 4}c2-4 5-6 9-6`}
                stroke="var(--forest)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </g>
          ))}
          <path
            d="M20 47c-3 6-2 12 3 16M60 40c-2 6 0 11 5 14M100 34c3 5 2 10-2 14"
            stroke="var(--olive)"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
    );
  }

  if (variant === "sprig") {
    return (
      <svg viewBox="0 0 60 90" className={className} fill="none" aria-hidden="true">
        <g transform={transform}>
          <path
            d="M30 88C28 60 26 34 30 6"
            stroke="var(--forest)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="30" cy="10" r="5.5" fill="var(--gold)" opacity="0.85" />
          <circle cx="30" cy="10" r="5.5" stroke="var(--gold-deep)" strokeWidth="0.6" />
          {[28, 24, 27, 46, 33, 58, 28, 70].length && null}
          {[
            [28, 24, -1],
            [32, 34, 1],
            [27, 46, -1],
            [33, 58, 1],
            [28, 70, -1],
          ].map(([x, y, dir], i) => (
            <path
              key={i}
              d={`M30 ${y}c${dir * 10} -2 ${dir * 14} 4 ${dir * 16} 10`}
              stroke="var(--olive)"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity={0.75}
            />
          ))}
        </g>
      </svg>
    );
  }

  // corner variant — for framing edges of a card, sunflowers + magnolia leaves
  return (
    <svg viewBox="0 0 220 220" className={className} fill="none" aria-hidden="true">
      <g transform={transform}>
        <path
          d="M4 4c8 40 6 82 26 110 22 30 62 34 96 30"
          stroke="var(--forest)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {[
          [24, 40],
          [34, 78],
          [54, 112],
          [86, 134],
          [122, 142],
        ].map(([x, y], i) => (
          <g key={i} opacity={0.92 - i * 0.08}>
            <circle cx={x} cy={y} r={6 - i * 0.5} fill="var(--gold)" opacity="0.85" />
            <circle cx={x} cy={y} r={6 - i * 0.5} stroke="var(--gold-deep)" strokeWidth="0.7" />
            <circle cx={x + 7} cy={y + 4} r={3.4 - i * 0.2} fill="var(--soft-yellow, var(--gold-pale))" opacity="0.9" />
            <circle cx={x + 7} cy={y + 4} r={3.4 - i * 0.2} stroke="var(--gold-deep)" strokeWidth="0.5" />
            <path
              d={`M${x - 10} ${y}c-6 2-10 8-10 16`}
              stroke="var(--olive)"
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        ))}
        <path
          d="M16 16c14 2 24 12 28 26"
          stroke="var(--olive)"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
