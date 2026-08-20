"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 1000);
  return () => clearInterval(timer);
}
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

export default function CountdownTimer({ target }: { target: string }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const seconds = now === null ? null : Math.max(0, Math.floor(new Date(target).getTime() / 1000) - now);
  const units = [
    { label: "Hari", value: seconds === null ? null : Math.floor(seconds / 86400) },
    { label: "Jam", value: seconds === null ? null : Math.floor(seconds / 3600) % 24 },
    { label: "Menit", value: seconds === null ? null : Math.floor(seconds / 60) % 60 },
    { label: "Detik", value: seconds === null ? null : seconds % 60 },
  ];
  return <div className="countdown" role="timer" aria-label="Waktu menuju pernikahan">
    {units.map(({ label, value }) => <div key={label} className="countdown-unit"><span className="countdown-value">{value === null ? "—" : String(value).padStart(2, "0")}</span><span className="countdown-label">{label}</span></div>)}
  </div>;
}
