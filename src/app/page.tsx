"use client";

import { useState } from "react";
import CoverScreen from "../components/Coverscreen";
import FloralOrnament from "../components/FloralOrnament";
import FloralPhoto from "../components/FloralPhoto";
import PetalsFall from "../components/PetalsFall";
import MusicPlayer from "../components/MusicPlayer";
import Reveal from "../components/Reveal";
import CountdownTimer from "../components/CountdownTimer";
import EventCard from "../components/EventCard";
import RSVPForm from "../components/RSVPForm";
import GuestbookWall from "../components/GuestbookWall";
import PhotoGallery from "../components/PhotoGallery";
import OurStory from "../components/OurStory";
import { invitation } from "../data/invitation";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [guestbookRefresh, setGuestbookRefresh] = useState(0);

  return (
    <>
      <CoverScreen open={open} onOpen={() => setOpen(true)} />
      <PetalsFall active={open} count={9} />
      <MusicPlayer src="/music/wedding-song.mp3" autoPlayTrigger={open} />

      <main
        className={`relative min-h-screen w-full transition-opacity duration-700 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* HERO / GREETING */}
        <section className="relative min-h-[90svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          <FloralPhoto
            variant="bouquet-1"
            className="absolute bottom-2 left-2 w-32 sm:-bottom-6 sm:-left-6 sm:w-56 opacity-95 drop-shadow-sm"
          />
          <FloralPhoto
            variant="bouquet-2"
            flip
            className="absolute bottom-2 right-2 w-32 sm:-bottom-6 sm:-right-6 sm:w-56 opacity-95 drop-shadow-sm"
          />
          <FloralPhoto
            variant="sunflower-1"
            className="absolute top-2 left-2 w-24 sm:-top-4 sm:-left-6 sm:w-36 opacity-90 -rotate-12"
          />
          <FloralPhoto
            variant="sunflower-1"
            flip
            className="absolute top-2 right-2 w-24 sm:-top-4 sm:-right-6 sm:w-36 opacity-90 rotate-12"
          />
          <FloralPhoto
            variant="sprig-1"
            className="absolute top-1/3 left-2 w-10 sm:w-14 opacity-70 hidden sm:block"
          />
          <FloralPhoto
            variant="sprig-1"
            flip
            className="absolute top-1/3 right-2 w-10 sm:w-14 opacity-70 hidden sm:block"
          />

          <Reveal>
            <p className="text-[0.7rem] tracking-wide-xl uppercase text-ink-soft mb-6">
              We Are Getting Married
            </p>
            <h1 className="font-[family-name:var(--font-script)] text-5xl sm:text-7xl text-gold-deep leading-tight px-4">
              {invitation.coupleShort}
            </h1>
            <p className="mt-8 max-w-sm mx-auto text-sm sm:text-base leading-relaxed text-ink-soft">
              {invitation.headerCopy}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <CountdownTimer target={invitation.date} />
          </Reveal>
        </section>

        {/* COUPLE */}
        <section className="relative py-24 px-6 max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="divider-flourish mb-4">
              <span className="text-xs tracking-wide-xl uppercase text-ink-soft">
                Mempelai
              </span>
            </div>
            <div className="flex items-center justify-center gap-6 opacity-90">
              <FloralPhoto variant="bouquet-2" className="w-14 sm:w-16 rotate-[100deg]" />
              <FloralPhoto variant="mixed-1" className="w-10 sm:w-12 opacity-80" />
              <FloralPhoto variant="bouquet-2" flip className="w-14 sm:w-16 -rotate-[100deg]" />
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-14 mt-12">
            <Reveal delay={0.1}>
              <div className="w-24 h-24 mx-auto rounded-full border border-gold-pale flex items-center justify-center mb-6">
                <FloralOrnament variant="sprig" className="w-8" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-ink mb-2">
                {invitation.groom.name}
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed max-w-xs mx-auto">
                {invitation.groom.parents}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="w-24 h-24 mx-auto rounded-full border border-gold-pale flex items-center justify-center mb-6">
                <FloralOrnament variant="sprig" className="w-8" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-ink mb-2">
                {invitation.bride.name}
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed max-w-xs mx-auto">
                {invitation.bride.parents}
              </p>
            </Reveal>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="relative py-24 px-6 bg-paper-soft/60 overflow-hidden">
          <FloralPhoto
            variant="bouquet-3"
            className="absolute -top-6 -left-6 w-32 sm:w-44 opacity-80"
          />
          <FloralPhoto
            variant="sprig-1"
            flip
            className="absolute -bottom-4 -right-2 w-24 sm:w-32 opacity-75"
          />
          <OurStory
            paragraphs={invitation.story.paragraphs}
            blessing={invitation.story.blessing}
            tagline={invitation.story.tagline}
          />
        </section>

        {/* QUOTE */}
        <section className="relative py-24 px-6 overflow-hidden">
          <FloralPhoto
            variant="mixed-1"
            className="absolute top-4 left-2 sm:left-10 w-16 sm:w-24 opacity-70 hidden sm:block"
          />
          <FloralPhoto
            variant="mixed-1"
            flip
            className="absolute bottom-4 right-2 sm:right-10 w-16 sm:w-24 opacity-70 hidden sm:block"
          />
          <Reveal className="max-w-lg mx-auto text-center relative">
            <FloralOrnament variant="sprig" className="w-8 mx-auto mb-6 opacity-80" />
            <p className="font-[family-name:var(--font-display)] italic text-2xl sm:text-3xl text-ink leading-relaxed">
              &ldquo;{invitation.quote}&rdquo;
            </p>
          </Reveal>
        </section>

        {/* GALLERY */}
        <section className="relative py-24 px-6 max-w-3xl mx-auto overflow-hidden">
          <FloralPhoto
            variant="sprig-1"
            className="absolute -top-2 -right-4 w-20 sm:w-28 opacity-60 hidden sm:block"
          />
          <Reveal className="text-center mb-12">
            <div className="divider-flourish mb-4">
              <span className="text-xs tracking-wide-xl uppercase text-ink-soft">
                Galeri
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-ink mb-2">
              Pre-Wedding
            </h2>
            <p className="text-sm text-ink-soft">
              Ketuk foto untuk memperbesar
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <PhotoGallery photos={invitation.gallery} />
          </Reveal>
        </section>

        {/* EVENTS */}
        <section className="relative py-24 px-6 max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="flex items-center justify-center gap-8 opacity-90 mb-2">
              <FloralPhoto variant="bouquet-1" className="w-16 sm:w-20 rotate-[95deg]" />
              <FloralPhoto variant="bouquet-1" flip className="w-16 sm:w-20 -rotate-[95deg]" />
            </div>
            <div className="divider-flourish mb-4">
              <span className="text-xs tracking-wide-xl uppercase text-ink-soft">
                Acara
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-ink">
              Save the Date
            </h2>
          </Reveal>

          <div className="flex flex-col sm:flex-row gap-8">
            {invitation.events.map((ev, i) => (
              <Reveal key={ev.label} delay={i * 0.15} className="flex-1">
                <EventCard {...ev} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* RSVP */}
        <section className="relative py-24 px-6 bg-paper-soft/60 overflow-hidden">
          <FloralPhoto
            variant="bouquet-3"
            flip
            className="absolute -top-8 -left-8 w-32 sm:w-44 opacity-70"
          />
          <FloralPhoto
            variant="sunflower-1"
            className="absolute -bottom-6 -right-6 w-28 sm:w-36 opacity-75"
          />
          <Reveal className="text-center mb-12">
            <div className="divider-flourish mb-4">
              <span className="text-xs tracking-wide-xl uppercase text-ink-soft">
                RSVP
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-ink mb-3">
              Konfirmasi Kehadiran
            </h2>
            <p className="text-sm text-ink-soft max-w-sm mx-auto">
              Mohon konfirmasi kehadiran Anda sebelum 7 November 2026.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <RSVPForm onSubmitted={() => setGuestbookRefresh((n) => n + 1)} />
          </Reveal>

          <GuestbookWall refreshKey={guestbookRefresh} />
        </section>

        {/* CLOSING */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <FloralPhoto
            variant="bouquet-2"
            className="absolute -bottom-8 -left-8 w-44 sm:w-60 opacity-95 drop-shadow-sm"
          />
          <FloralPhoto
            variant="bouquet-1"
            flip
            className="absolute -bottom-8 -right-8 w-44 sm:w-60 opacity-95 drop-shadow-sm"
          />
          <Reveal className="max-w-md mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-ink mb-4">
              {invitation.closing.title}
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed mb-10">
              {invitation.closing.body}
            </p>
            <p className="font-[family-name:var(--font-script)] text-4xl text-gold-deep">
              {invitation.coupleShort}
            </p>
          </Reveal>
          <p className="mt-16 text-[0.65rem] tracking-wide-xl uppercase text-ink-soft/60">
            Adam &amp; Salma Wedding Invitation
          </p>
        </section>
      </main>
    </>
  );
}
