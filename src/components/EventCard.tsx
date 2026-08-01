import FloralOrnament from "./FloralOrnament";

type Props = {
  label: string;
  date: string;
  time: string;
  place: string;
  address: string;
};

export default function EventCard({ label, date, time, place, address }: Props) {
  return (
    <div className="relative flex-1 min-w-[240px] px-8 py-10 text-center border border-silver/50 rounded-sm bg-paper-soft/60">
      <FloralOrnament
        variant="sprig"
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 opacity-80"
      />
      <h3 className="font-[family-name:var(--font-display)] text-2xl text-sage-deep mb-4">
        {label}
      </h3>
      <p className="text-sm text-ink mb-1">{date}</p>
      <p className="text-sm text-ink-soft mb-4">{time}</p>
      <div className="divider-flourish mb-4" />
      <p className="text-sm font-medium text-ink">{place}</p>
      <p className="text-xs text-ink-soft mt-1 leading-relaxed">{address}</p>
    </div>
  );
}
