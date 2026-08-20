import Reveal from "./Reveal";

type Props = { paragraphs: string[]; blessing: string; tagline: string };

export default function OurStory({ paragraphs, blessing, tagline }: Props) {
  return <div className="story-copy">
    <Reveal><p className="eyebrow">EVERY LOVE HAS A STORY</p><h2>Ours found<br />its way <em>back.</em></h2></Reveal>
    {paragraphs.map((paragraph, i) => <Reveal key={paragraph} delay={i * 0.08} className="story-chapter"><span className="chapter-number">0{i + 1}</span><div><h3>{i === 0 ? "Awal sebuah cerita" : "Bertemu kembali · September 2024"}</h3><p>{paragraph}</p></div></Reveal>)}
    <Reveal><p className="story-blessing">{blessing}</p><p className="story-tagline">“{tagline}”</p></Reveal>
  </div>;
}
