import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, ContactShadows } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import Monolith from './Monolith'
import OrbitingLoads from './OrbitingLoads'
import StudioEnv from './StudioEnv'

function Scene({ dark, hovering }: { dark: boolean; hovering: React.MutableRefObject<boolean> }) {
  const root = useRef<THREE.Group>(null)

  useFrame((state, dt) => {
    const g = root.current
    if (!g) return
    const t = state.clock.elapsedTime
    const baseY = t * 0.13
    const nod = Math.sin(t * (Math.PI * 2) / 6) * 0.07
    const targetY = baseY + THREE.MathUtils.clamp(state.pointer.x, -1, 1) * 0.12
    const targetX = nod + THREE.MathUtils.clamp(-state.pointer.y, -1, 1) * 0.1
    // damped easing for a heavy, architectural feel
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 4, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 4, dt)
  })

  return (
    <group ref={root} position={[0, -0.05, 0]}>
      <Monolith />
      <OrbitingLoads dark={dark} hovering={hovering} count={160} />
    </group>
  )
}

export default function Hero3D({ paused }: { paused: boolean }) {
  const hovering = useRef(false)
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    if (typeof document === 'undefined') return
    const el = document.documentElement
    const obs = new MutationObserver(() => setDark(el.classList.contains('dark')))
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.5 }}
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [0, 0.35, 5.4], fov: 36 }}
      onPointerOver={() => (hovering.current = true)}
      onPointerOut={() => (hovering.current = false)}
      style={{ touchAction: 'pan-y' }}
    >
      <color attach="background" args={[dark ? '#1C2122' : '#F5F3EE']} />
      <ambientLight intensity={dark ? 0.35 : 0.6} color="#9E875D" />
      <directionalLight position={[-4, 5, 3]} intensity={dark ? 1.1 : 1.4} color="#E0A23B" />
      <directionalLight position={[3, 2, -4]} intensity={dark ? 0.7 : 0.5} color="#F5F3EE" />

      <Suspense fallback={null}>
        <StudioEnv dark={dark} />
        <Scene dark={dark} hovering={hovering} />
        <ContactShadows
          position={[0, -1.55, 0]}
          scale={6}
          blur={2.2}
          far={3}
          resolution={256}
          opacity={dark ? 0.6 : 0.35}
          color={dark ? '#0B0E0E' : '#857049'}
        />
      </Suspense>

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom intensity={dark ? 0.5 : 0.28} luminanceThreshold={0.55} luminanceSmoothing={0.2} mipmapBlur />
        <Vignette darkness={dark ? 0.5 : 0.3} offset={0.25} eskil={false} />
      </EffectComposer>

      <AdaptiveDpr pixelated={false} />
    </Canvas>
  )
}
