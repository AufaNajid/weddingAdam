# Adam & Salma · Wedding invitation

A responsive Next.js 16 invitation based on the supplied
`wedding-invitation-white-floral (7).zip`: cream paper, antique gold, olive
accents, Parisienne script, and the original watercolor flowers.

## Run locally

```bash
npm install
npm run dev
```

Production checks and preview:

```bash
npm run lint
npm test
npm run build
npm start
```

Node.js 20.9 or later is required by this Next.js version. Fonts are bundled
locally; builds do not download fonts. Copyright notices are in
`src/app/fonts/OFL.txt`.

## Content and imagery

- Opening page: `src/components/FrontPage.tsx`. The cover uses the original
  portraits and floral assets. Its button parts two paper panels, reveals the
  main invitation, restores scrolling, and moves keyboard focus to the title.
  The background stays inert until the transition finishes; reduced-motion
  users get an immediate reveal. Short screens can scroll within the cover.
- Wedding names, dates, addresses, story, and gallery: `src/data/invitation.ts`.
- Theme and responsive layout: `src/app/globals.css`.
- Homepage motion: `src/components/HeroArtwork.tsx`. It uses the exact supplied
  `public/artwork/adam.png` and `salma.png`. No AI-generated portrait replacements
  are included. CSS adds floating paper layers, a ribbon, envelope, lighting, and
  pointer-driven perspective. Reduced-motion preferences are respected.
- All seven watercolor assets match the supplied ZIP byte-for-byte.
- Original photographs stay in `public/gallery/`. Focal points are mapped by
  filename in `PhotoGallery.tsx`; photo 2 is positioned to show both people.
  The keyboard-accessible lightbox displays the complete image.
- Music starts only through a guest's interaction and can be paused.
- Update `public/adam-salma-wedding.ics` when changing the reception date/time.

## Connect RSVP and guestbook

1. Use an active Supabase project.
2. Run `supabase/schema.sql` in its SQL editor. It preserves existing entries,
   adds the optional guest-count column, replaces the original template's public
   policies, and restricts public reading to names and messages—not attendance.
3. Copy `.env.example` to `.env.local`, then set the project's URL and public
   anon/publishable key. Never use a service-role key in a NEXT_PUBLIC variable.
4. Restart the development server; rebuild after changing production variables.

The current configured endpoint failed DNS resolution (ENOTFOUND) during
verification on 4 October 2026. Production RSVP remains unverified until that
project URL is corrected or the project restored. No migration was applied to
the remote database. The form reports connection errors without clearing
entered values or pretending a response was saved.

The public submission endpoint follows the template's no-login model. For an
internet-facing launch, consider provider-side anti-spam/rate limiting.
Do not collect private information in public wishes.

## Isolated RSVP testing

`scripts/guestbook-preview.mjs` is a local-only, in-memory test service; it never
contacts Supabase or writes guest data to disk.

Run it in one terminal:

```bash
node scripts/guestbook-preview.mjs
```

Run Next in a second PowerShell terminal, using temporary process variables:

```powershell
$env:NEXT_PUBLIC_SUPABASE_URL = 'http://127.0.0.1:4318'
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY = 'local-preview-key'
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Use http://127.0.0.1:3001. The name `Preview Error` simulates a failed
submission; other names succeed. Stop both processes and close that terminal
after testing. Never deploy the preview service or its environment values.

## Verification

- `npm test` checks the original character SHA-256 hashes and hero references.
- Check mobile at 320px and 390px, plus desktop: no horizontal overflow,
  complete faces in the hero, readable form controls, and unclipped flowers.
- Cover: activate Buka undangan with keyboard or touch, ensure the cover is
  removed, focus reaches the main title, and page scrolling is restored.
- Countdown: four legible arch-shaped units and a visible calendar-download
  link on mobile and desktop.
- Gallery: open photo 2, navigate with arrows, close with Escape, and confirm
  keyboard focus returns to its thumbnail.
- RSVP: required fields, attendance choices, guest-count bounds, successful
  save/guestbook refresh, failed save with values preserved.
- Online RSVP requires the Supabase connection described above.
