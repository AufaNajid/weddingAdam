import FloralOrnament from "./FloralOrnament";
import Reveal from "./Reveal";

type Props = {
  paragraphs: string[];
  blessing: string;
  tagline: string;
};

export default function OurStory({ paragraphs, blessing, tagline }: Props) {
  return (
    <div className="max-w-xl mx-auto text-center">
      <Reveal>
        <div className="divider-flourish mb-4">
          <span className="text-xs tracking-wide-xl uppercase text-ink-soft">
            Our Story
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-ink mb-10">
          Kisah Kami
        </h2>
      </Reveal>

      <div className="space-y-8 text-left sm:text-center">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <p className="text-sm sm:text-base leading-relaxed text-ink-soft">
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={paragraphs.length * 0.15 + 0.1} className="mt-10">
        <FloralOrnament variant="sprig" className="w-8 mx-auto mb-4 opacity-80" />
        <p className="text-sm sm:text-base text-gold-deep font-medium leading-relaxed">
          {blessing}
        </p>
      </Reveal>

      <Reveal delay={paragraphs.length * 0.15 + 0.25} className="mt-8">
        <p className="font-[family-name:var(--font-display)] italic text-xl sm:text-2xl text-ink">
          {tagline}
        </p>
      </Reveal>
    </div>
  );
}
