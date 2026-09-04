import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeDInfo } from '@/types'

function InteractiveMesh({ info }: { info: ThreeDInfo }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.4
  })

  const geometryMap = {
    torus: <torusKnotGeometry args={[0.8, 0.28, 128, 24]} />,
    sphere: <sphereGeometry args={[1, 64, 64]} />,
    cube: <boxGeometry args={[1.4, 1.4, 1.4]} />,
    icosa: <icosahedronGeometry args={[1, 4]} />,
  }

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        {geometryMap[info.type]}
        {info.type === 'sphere' || info.type === 'icosa' ? (
          <MeshDistortMaterial
            color={info.color}
            distort={0.4}
            speed={1.5}
            roughness={0.15}
            metalness={0.85}
            emissive={info.color}
            emissiveIntensity={0.25}
          />
        ) : (
          <MeshWobbleMaterial
            color={info.color}
            factor={0.4}
            speed={1.5}
            roughness={0.15}
            metalness={0.85}
            emissive={info.color}
            emissiveIntensity={0.25}
          />
        )}
      </mesh>
    </Float>
  )
}

export function PostModel({ info }: { info: ThreeDInfo }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-purple-950/30 to-black">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#a855f7" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#ec4899" />
        <Suspense fallback={null}>
          <InteractiveMesh info={info} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
      <div className="absolute bottom-2 right-2 text-[10px] uppercase tracking-wider text-white/40 px-2 py-1 rounded-full glass">
        Drag to rotate
      </div>
    </div>
  )
}
