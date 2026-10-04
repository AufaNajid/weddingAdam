# Original character artwork

The homepage uses the exact user-supplied PNGs, without retouching or AI redraws:

- adam.png — original supplied 2000 × 2000 transparent PNG.
- salma.png — original supplied 2000 × 2000 transparent PNG.

The source files are preserved byte-for-byte. Their transparent canvas is
positioned with CSS; the paper frame, ribbon, envelope, lighting, and perspective
are code-native elements. Independent breathing and floating animations never
change the characters' features. Reduced-motion preferences disable animation.

Run `npm test` to verify the original character-file hashes.

Watercolor flowers in ../decorations/ are byte-for-byte matches to
wedding-invitation-white-floral (7).zip. Gallery photographs stay in ../gallery/
and are not regenerated. Thumbnail focal points are configured per filename
in src/components/PhotoGallery.tsx; the lightbox shows the complete photograph.

For future person templates: keep the original transparent source, add a new
layer in HeroArtwork.tsx, then adjust presentation-only positions in globals.css.
