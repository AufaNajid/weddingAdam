"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getRecipientName } from "../lib/recipient";

function Greeting({ name = "" }: { name?: string }) {
  return (
    <p>
      {name ? (
        <>Kepada Yth.<strong className="front-recipient">{name}</strong></>
      ) : (
        <>Untuk keluarga &amp; sahabat terkasih,<br /></>
      )}
      <span>sebuah undangan, dari hati kami.</span>
    </p>
  );
}

function PersonalizedGreeting() {
  const searchParams = useSearchParams();
  return <Greeting name={getRecipientName(searchParams)} />;
}

export default function RecipientGreeting() {
  return <Suspense fallback={<Greeting />}><PersonalizedGreeting /></Suspense>;
}
