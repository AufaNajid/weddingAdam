"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MotionConfig } from "framer-motion";
import HeroArtwork from "../components/HeroArtwork";
import FrontPage from "../components/FrontPage";
import FloralPhoto from "../components/FloralPhoto";
import MusicPlayer from "../components/MusicPlayer";
import Reveal from "../components/Reveal";
import CountdownTimer from "../components/CountdownTimer";
import EventCard from "../components/EventCard";
import RSVPForm from "../components/RSVPForm";
import GuestbookWall from "../components/GuestbookWall";
import PhotoGallery from "../components/PhotoGallery";
import OurStory from "../components/OurStory";
import { ArrowIcon, HeartIcon, LeafIcon } from "../components/Icons";
import { invitation } from "../data/invitation";

export default function Home() {
  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");
  const [guestbookRefresh, setGuestbookRefresh] = useState(0);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const entered = stage === "open";

  useEffect(() => {
    if (entered) {
      heroTitle.current?.focus({ preventScroll: true });
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [entered]);

  function openInvitation() {
    if (stage !== "closed") return;
    window.scrollTo({ top: 0, behavior: "instant" });
    window.history.replaceState(window.history.state, "", "#home");
    setStage("opening");
  }

  return (
    <MotionConfig reducedMotion="user">
      {stage !== "open" && <FrontPage opening={stage === "opening"} onOpen={openInvitation} onEntered={() => setStage("open")} />}
      <div id="invitation-content" className="invitation-content" data-stage={stage} inert={!entered} aria-hidden={!entered}>
      <a className="skip-link" href="#mempelai">Langsung ke undangan</a>
      <header className="site-header">
        <a className="monogram" href="#home" aria-label="Adam dan Salma, beranda">A<span>&</span>S</a>
        <nav aria-label="Navigasi undangan">
          <a href="#kisah">Kisah kami</a>
          <a href="#galeri">Galeri</a>
          <a href="#acara">Acara</a>
        </nav>
        <a className="header-rsvp" href="#rsvp">RSVP <ArrowIcon /></a>
      </header>

      <main id="home">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="tiny-line" /> THE WEDDING OF</p>
            <h1 id="hero-title" ref={heroTitle} tabIndex={-1}>Adam <span className="hero-amp">&</span><br />{" "}Salma</h1>
            <p className="handwritten hero-note">A little story, a lifetime of us.</p>
            <p className="hero-description">Dengan penuh cinta, kami mengundang Anda<br className="desktop-break" /> untuk menjadi bagian dari hari bahagia kami.</p>
            <a href="#mempelai" className="button button-primary">
              <span>Kenali mempelai</span><ArrowIcon />
            </a>
            <div className="hero-location"><span className="status-dot" /> 29 NOVEMBER 2026 <span className="location-divider">/</span> KUDUS</div>
          </div>
          <HeroArtwork />
          <a className="scroll-cue" href="#mempelai"><span>SCROLL TO OUR STORY</span><ArrowIcon direction="down" /></a>
        </section>

        <section className="countdown-band" aria-label="Hitung mundur pernikahan">
          <div className="countdown-intro"><HeartIcon /><p>Menuju hari bahagia<span>We can hardly wait.</span></p></div>
          <CountdownTimer target={invitation.date} />
          <a className="text-link calendar-link" href="/adam-salma-wedding.ics" download>Simpan tanggal <span aria-hidden="true">↗</span></a>
        </section>

        <section id="mempelai" className="section-shell couple-section section-space" aria-labelledby="couple-title">
          <Reveal className="section-heading centered">
            <div className="floral-divider" aria-hidden="true"><FloralPhoto variant="bouquet-2" /><span>✧</span><FloralPhoto variant="bouquet-2" flip /></div>
            <p className="eyebrow">DUA HATI, SATU TUJUAN</p>
            <h2 id="couple-title">Together is a beautiful place.</h2>
            <p>Dengan memohon rahmat dan rida Allah SWT,<br />kami bermaksud menyelenggarakan pernikahan kami.</p>
          </Reveal>
          <div className="couple-layout">
            <Reveal className="couple-person groom-person">
              <p className="eyebrow">THE GROOM</p><h3>Adam</h3>
              <p className="full-name">{invitation.groom.name}</p><p className="parents">{invitation.groom.parents}</p>
            </Reveal>
            <Reveal className="couple-photo" delay={0.1}>
              <Image src="/gallery/photo7.jpeg" alt="Adam dan Salma tersenyum bersama" fill sizes="(max-width: 700px) 70vw, 320px" />
              <span className="photo-note handwritten">meant to be.</span>
            </Reveal>
            <Reveal className="couple-person bride-person" delay={0.2}>
              <p className="eyebrow">THE BRIDE</p><h3>Salma</h3>
              <p className="full-name">{invitation.bride.name}</p><p className="parents">{invitation.bride.parents}</p>
            </Reveal>
          </div>
        </section>

        <section id="kisah" className="story-section section-space">
          <FloralPhoto variant="sprig-1" className="story-flower" />
          <div className="section-shell story-layout">
            <Reveal className="story-photo-wrap">
              <div className="story-photo"><Image src="/gallery/photo3.jpeg" alt="Adam dan Salma duduk bersama di depan rumah klasik" fill sizes="(max-width: 700px) 90vw, 480px" style={{ objectPosition: "26% center" }} /></div>
              <span className="story-photo-caption handwritten">It was always you.</span>
              <span className="paper-tape" aria-hidden="true" />
            </Reveal>
            <OurStory {...invitation.story} />
          </div>
        </section>

        <section className="quote-section section-shell" aria-label="Kutipan cinta">
          <FloralPhoto variant="mixed-1" className="quote-flower" />
          <p>“{invitation.quote}”</p>
          <FloralPhoto variant="mixed-1" className="quote-flower" flip />
        </section>

        <section id="galeri" className="section-shell section-space gallery-section" aria-labelledby="gallery-title">
          <Reveal className="gallery-heading">
            <div><p className="eyebrow">LITTLE MOMENTS, BIG FEELINGS</p><h2 id="gallery-title">Our kind of <em>forever.</em></h2></div>
            <p>Potongan cerita yang ingin kami simpan.<br />Ketuk foto untuk melihat lebih dekat.</p>
          </Reveal>
          <PhotoGallery photos={invitation.gallery} />
          <p className="gallery-footer handwritten">and so, our adventure begins…</p>
        </section>

        <section id="acara" className="events-section section-space" aria-labelledby="events-title">
          <div className="section-shell">
            <Reveal className="section-heading centered"><div className="floral-divider" aria-hidden="true"><FloralPhoto variant="bouquet-1" /><span>✧</span><FloralPhoto variant="bouquet-1" flip /></div><p className="eyebrow">YOU’RE INVITED</p><h2 id="events-title">A day to remember.</h2><p>Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.</p></Reveal>
            <div className="events-grid">{invitation.events.map((event, i) => <Reveal key={event.label} delay={i * 0.1}><EventCard {...event} index={i} /></Reveal>)}</div>
            <p className="events-footnote"><LeafIcon /> Dua perayaan, satu kisah cinta.</p>
          </div>
        </section>

        <section id="rsvp" className="section-shell section-space rsvp-section" aria-labelledby="rsvp-title">
          <div className="rsvp-layout">
            <Reveal className="rsvp-copy"><p className="eyebrow">SAVE A SEAT, LEAVE SOME LOVE</p><h2 id="rsvp-title">Will you<br /> be <em>there?</em></h2><p>Hari kami akan lebih berarti dengan kehadiran Anda. Mohon konfirmasi sebelum <strong>7 November 2026.</strong></p><div className="rsvp-note"><HeartIcon /><span className="handwritten">We saved you a little place<br />in our favorite day.</span></div></Reveal>
            <Reveal><RSVPForm onSubmitted={() => setGuestbookRefresh((n) => n + 1)} /></Reveal>
          </div>
          <GuestbookWall key={guestbookRefresh} />
        </section>

        <footer className="closing-section">
          <FloralPhoto variant="bouquet-2" className="closing-flower closing-flower-left" />
          <FloralPhoto variant="bouquet-1" className="closing-flower closing-flower-right" flip />
          <LeafIcon className="section-leaf" /><p className="eyebrow">WITH LOVE & GRATITUDE</p>
          <h2>{invitation.closing.title}</h2><p className="closing-copy">{invitation.closing.body}</p>
          <p className="closing-names handwritten">Adam & Salma</p>
          <div className="footer-bottom"><a className="monogram" href="#home" aria-label="Kembali ke atas">A<span>&</span>S</a><span>29.11.2026 · KUDUS, JAWA TENGAH</span><a href="#home">Kembali ke atas ↑</a></div>
        </footer>
      </main>
      <MusicPlayer src="/music/wedding-song.mp3" autoPlayTrigger={stage !== "closed"} />
      </div>
    </MotionConfig>
  );
}
