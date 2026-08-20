import Image, { type StaticImageData } from "next/image";
import bouquet1 from "../../public/decorations/flower-bouquet-1.png";
import bouquet2 from "../../public/decorations/flower-bouquet-2.png";
import bouquet3 from "../../public/decorations/flower-bouquet-3.png";
import sprig1 from "../../public/decorations/flower-sprig-1.png";
import sunflower1 from "../../public/decorations/flower-sunflower-1.png";
import sunflower2 from "../../public/decorations/flower-sunflower-2.png";
import mixed1 from "../../public/decorations/flower-mixed-1.png";

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

const SRC: Record<string, StaticImageData> = {
  "bouquet-1": bouquet1,
  "bouquet-2": bouquet2,
  "bouquet-3": bouquet3,
  "sprig-1": sprig1,
  "sunflower-1": sunflower1,
  "sunflower-2": sunflower2,
  "mixed-1": mixed1,
};

/**
 * Real watercolor floral artwork supplied by the user, background removed.
 * Placed as absolutely-positioned corner decorations.
 */
export default function FloralPhoto({ variant = "bouquet-1", className = "", flip = false }: Props) {
  const src = SRC[variant];

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ height: "auto", scale: flip ? "-1 1" : undefined }}
      sizes="240px"
      draggable={false}
    />
  );
}
