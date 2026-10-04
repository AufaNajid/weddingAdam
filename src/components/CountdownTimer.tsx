"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  const clamp = Math.max(diff, 0);
  return {
    days: Math.floor(clamp / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamp / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamp / (1000 * 60)) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  };
}

export default function CountdownTimer({ target }: { target: string }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Hari", value: time?.days },
    { label: "Jam", value: time?.hours },
    { label: "Menit", value: time?.minutes },
    { label: "Detik", value: time?.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-ink tabular-nums">
            {u.value !== undefined ? String(u.value).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[0.65rem] tracking-wide-xl uppercase text-ink-soft">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
