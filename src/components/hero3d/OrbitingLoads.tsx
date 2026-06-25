import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Three faceted accent "load" shards — strictly approved accents. */
const SHARDS = [
  { color: '#E0A23B', r: 1.45, speed: 0.55, phase: 0.0, y: -0.15 },
  { color: '#D9694C', r: 1.85, speed: -0.4, phase: 2.2, y: 0.25 },
  { color: '#5B7DA6', r: 1.15, speed: 0.75, phase: 4.1, y: -0.55 },
]

/** Floating "gilded dust" — a cheap rotating point cloud. */
function Dust({ count, dark }: { count: number; dark: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.1 + Math.random() * 2.6
      const th = Math.random() * Math.PI * 2
      a[i * 3] = Math.cos(th) * r
      a[i * 3 + 1] = (Math.random() - 0.5) * 3.4
      a[i * 3 + 2] = Math.sin(th) * r
    }
    return a
  }, [count])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#C6B083"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={dark ? 0.7 : 0.32}
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

export default function OrbitingLoads({
  count = 160,
  dark,
  hovering,
}: {
  count?: number
  dark: boolean
  hovering: React.MutableRefObject<boolean>
}) {
  const shards = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const boost = hovering.current ? 1.25 : 1
    for (let i = 0; i < SHARDS.length; i++) {
      const m = shards.current[i]
      if (!m) continue
      const s = SHARDS[i]
      const a = s.phase + t * s.speed * boost
      m.position.set(Math.cos(a) * s.r, s.y + Math.sin(t * 0.5 + i) * 0.16, Math.sin(a) * s.r)
      m.rotation.x = t * 0.5
      m.rotation.y = t * 0.7
    }
  })

  return (
    <group>
      {SHARDS.map((s, i) => (
        <mesh
          key={s.color}
          ref={(el) => {
            if (el) shards.current[i] = el
          }}
        >
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={0.55}
            metalness={0.55}
            roughness={0.3}
            flatShading
          />
        </mesh>
      ))}
      <Dust count={count} dark={dark} />
    </group>
  )
}
