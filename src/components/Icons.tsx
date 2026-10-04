import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowIcon({ direction = "right", ...props }: IconProps & { direction?: "right" | "down" }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...props}><g transform={direction === "down" ? "rotate(90 12 12)" : undefined}><path d="M4 12h15M13 5l7 7-7 7" /></g></svg>;
}

export function HeartIcon(props: IconProps) {
  return <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" {...props}><path d="M16 27S3 18 3 10.5C3 3 12 2 16 9c4-7 13-6 13 1.5C29 18 16 27 16 27Z" /></svg>;
}

export function LeafIcon(props: IconProps) {
  return <svg width="44" height="56" viewBox="0 0 44 56" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" {...props}><path d="M11 52C24 34 18 21 34 4M22 35C9 35 5 25 5 25c10-2 17 5 17 10ZM23 29c0-11 12-16 12-16s4 12-12 16ZM26 17C14 15 17 5 17 5s9 2 9 12ZM17 43c9-1 16-7 16-7s-1 11-16 7" /></svg>;
}
