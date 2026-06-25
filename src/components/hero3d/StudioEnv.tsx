import { Environment, Lightformer } from '@react-three/drei'

/**
 * A hand-authored studio environment built only from warm/neutral
 * Lightformer rectangles — NO stock HDRI preset. This is the brand
 * "firewall": the bronze metal can only ever reflect approved palette
 * tones (amber key, cream rim, bronze fill, dusty-sky accent) — never teal.
 */
export default function StudioEnv({ dark }: { dark: boolean }) {
  return (
    <Environment resolution={64} frames={1}>
      {/* warm amber key (upper-left) */}
      <Lightformer form="rect" intensity={dark ? 2.4 : 1.7} color="#E0A23B" position={[-5, 4, 2]} scale={[7, 7, 1]} target={[0, 0, 0]} />
      {/* cream neutral rim (upper-right behind) */}
      <Lightformer form="rect" intensity={dark ? 1.7 : 1.1} color="#F5F3EE" position={[5, 3, -4]} scale={[6, 6, 1]} target={[0, 0, 0]} />
      {/* bronze under-fill */}
      <Lightformer form="rect" intensity={0.7} color="#9E875D" position={[0, -4, 3]} scale={[9, 4, 1]} target={[0, 0, 0]} />
      {/* faint dusty-sky accent (the approved non-teal blue) */}
      <Lightformer form="rect" intensity={dark ? 0.45 : 0.28} color="#5B7DA6" position={[3, 5, 1]} scale={[3, 3, 1]} target={[0, 0, 0]} />
    </Environment>
  )
}
