import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { mouse, viewport } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const targetX = mouse.x * 0.4
    const targetY = mouse.y * 0.4
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.04
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.04
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={viewport.width < 6 ? 0.8 : 1.1}>
        <torusKnotGeometry args={[1, 0.32, 200, 24]} />
        <MeshDistortMaterial
          color="#a855f7"
          distort={0.35}
          speed={1.8}
          roughness={0.15}
          metalness={0.85}
          emissive="#7e22ce"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

function ParticleField({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
    const hue = 0.75 + Math.random() * 0.15
    const c = new THREE.Color().setHSL(hue, 0.7, 0.5 + Math.random() * 0.3)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 6, 18]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#a855f7" />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#ec4899" />
      <pointLight position={[0, -5, -3]} intensity={1} color="#3b82f6" />
      <Environment preset="night" />
      <ParticleField count={500} />
      <FloatingTorus />
    </Canvas>
  )
}

interface Hero3DProps {
  className?: string
}

export function Hero3D({ className }: Hero3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-black via-purple-950/20 to-black ${className ?? ''}`}
      style={{ height: 'min(70vh, 540px)' }}
    >
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4 max-w-2xl"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>NEXUS LAB · Live</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gradient">Explore the future</span>
            <br />
            <span className="text-foreground/90">of digital creation</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
            A visual social platform for builders, designers and creators. Discover
            interactive 3D, code, projects and the people behind them.
          </p>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </motion.div>
  )
}
