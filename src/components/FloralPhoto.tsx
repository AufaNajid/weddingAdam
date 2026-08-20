type Props = {
  variant?:
    | "bouquet-1"
    | "bouquet-2"
    | "bouquet-3"
    | "sprig-1"
    | "sunflower-1"
    | "sunflower-2"
    | "mixed-1";
  className?: string;
  flip?: boolean;
};

const SRC: Record<string, string> = {
  "bouquet-1": "/decorations/flower-bouquet-1.png",
  "bouquet-2": "/decorations/flower-bouquet-2.png",
  "bouquet-3": "/decorations/flower-bouquet-3.png",
  "sprig-1": "/decorations/flower-sprig-1.png",
  "sunflower-1": "/decorations/flower-sunflower-1.png",
  "sunflower-2": "/decorations/flower-sunflower-2.png",
  "mixed-1": "/decorations/flower-mixed-1.png",
};

/**
 * Real watercolor floral artwork supplied by the user, background removed.
 * Placed as absolutely-positioned corner decorations.
 */
export default function FloralPhoto({ variant = "bouquet-1", className = "", flip = false }: Props) {
  const src = SRC[variant];

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      draggable={false}
    />
  );
}
