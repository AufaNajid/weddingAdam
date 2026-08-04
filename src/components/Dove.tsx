export default function Dove({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 34c8-10 20-14 30-10 2-10 10-18 20-20-6 10-6 18-2 24 8 2 14 8 16 16-10-4-18-2-24 4-10 6-22 6-32-2-4-3-6-7-8-12z"
        fill="var(--paper)"
        stroke="var(--gold-deep)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="24" r="1.4" fill="var(--ink)" />
      <path
        d="M34 40c6 4 14 5 22 2"
        stroke="var(--gold-deep)"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
