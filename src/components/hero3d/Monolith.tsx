import { RoundedBox } from '@react-three/drei'

/** Shared bronze metal look for every facet of the monolith-crane. */
function Bronze() {
  return <meshStandardMaterial color="#9E875D" metalness={1} roughness={0.34} flatShading />
}

/**
 * A faceted, low-poly BRONZE tower-crane obelisk built from primitives:
 * a tapered pentagonal mast, an octahedron crown, a cantilevered jib + short
 * counter-jib with a counterweight, and a chunky base. flatShading gives each
 * facet a crisp metal edge that catches the studio light.
 */
export default function Monolith() {
  return (
    <group position={[-0.25, 0, 0]}>
      {/* base block */}
      <RoundedBox args={[0.78, 0.28, 0.78]} radius={0.05} smoothness={2} position={[0, -1.5, 0]}>
        <Bronze />
      </RoundedBox>

      {/* tapered pentagonal mast */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.34, 3, 5, 1]} />
        <Bronze />
      </mesh>

      {/* operator cab just below the jib */}
      <RoundedBox args={[0.34, 0.3, 0.34]} radius={0.05} smoothness={2} position={[0, 1.32, 0]}>
        <Bronze />
      </RoundedBox>

      {/* crown / apex */}
      <mesh position={[0, 1.78, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
        <Bronze />
      </mesh>

      {/* jib (long working arm) */}
      <RoundedBox args={[2.0, 0.15, 0.15]} radius={0.045} smoothness={2} position={[0.92, 1.52, 0]}>
        <Bronze />
      </RoundedBox>
      {/* jib tie / hoist line hint */}
      <mesh position={[1.55, 1.4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.34, 4]} />
        <Bronze />
      </mesh>

      {/* counter-jib (short arm) + counterweight */}
      <RoundedBox args={[0.78, 0.15, 0.15]} radius={0.045} smoothness={2} position={[-0.5, 1.52, 0]}>
        <Bronze />
      </RoundedBox>
      <RoundedBox args={[0.34, 0.36, 0.3]} radius={0.05} smoothness={2} position={[-0.86, 1.46, 0]}>
        <Bronze />
      </RoundedBox>
    </group>
  )
}
