import AiVideo from '../AiVideo'

/** The canonical static fallback for the hero visual (no WebGL / reduced
 *  motion / mobile / suspense / skip / error). Mirrors the original hero. */
export default function HeroPoster() {
  return <AiVideo src="/ai/intro.mp4" poster="/ai/hero.jpg" caption="secure it. then grow it." rotate={1.5} />
}
