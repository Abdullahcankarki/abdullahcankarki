import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import * as THREE from 'three'

/* ── Lightweight Particle Field ── */
function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const count = 1200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
    ref.current.rotation.x = state.clock.elapsedTime * 0.015
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

/* ── Simple Wireframe Icosahedron ── */
function FloatingGeo() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.1
    ref.current.rotation.y = state.clock.elapsedTime * 0.15
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3
  })

  return (
    <mesh ref={ref} position={[2.5, 0, -1]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

/* ── Simple Torus Knot ── */
function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.08
    ref.current.rotation.z = state.clock.elapsedTime * 0.06
    ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.35) * 0.2
  })

  return (
    <mesh ref={ref} position={[-3, -0.5, -2]}>
      <torusKnotGeometry args={[0.8, 0.2, 64, 12]} />
      <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.08} />
    </mesh>
  )
}

/* ── RevealText: per-character animation ── */
function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ── AnimatedCounter ── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || !ref.current) return
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      if (ref.current) ref.current.textContent = Math.round(eased * target) + suffix
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: content moves up faster, canvas stays + scales, fade out
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -200])
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scaleCanvas = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const opacityCanvas = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blurCanvasVal = useTransform(scrollYProgress, [0.3, 0.8], [0, 10])
  const filterCanvas = useMotionTemplate`blur(${blurCanvasVal}px)`

  return (
    <header ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(99, 102, 241, 0.07), transparent)',
      }} />

      {/* 3D Canvas with scroll parallax + scale + blur */}
      <motion.div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        y: yCanvas,
        scale: scaleCanvas,
        opacity: opacityCanvas,
        filter: filterCanvas,
      }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} frameloop="always">
          <ambientLight intensity={0.25} />
          <pointLight position={[8, 8, 8]} intensity={0.4} />
          <ParticleField />
          <FloatingGeo />
          <TorusKnot />
        </Canvas>
      </motion.div>

      {/* Content with faster parallax up + fade */}
      <motion.div
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto',
          padding: '160px 24px 80px',
          width: '100%',
          y: yContent,
          opacity: opacityContent,
        }}
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fadeUp} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px',
            background: 'var(--accent-soft)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 100,
            fontSize: '0.8rem', fontWeight: 500,
            color: 'var(--accent-light)',
            marginBottom: 36,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 8px rgba(52, 211, 153, 0.5)',
              animation: 'pulse 2s ease infinite',
            }} />
            Full-Stack Developer
          </motion.div>

          <h1 style={{
            fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: 28,
          }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <RevealText text="Ich baue" delay={0.4} />
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <em style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                color: 'var(--accent-light)',
              }}>
                <RevealText text="Systeme" delay={0.7} />
              </em>
              <RevealText text=" die" delay={1.0} />
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <RevealText text="funktionieren." delay={1.1} />
            </span>
          </h1>

          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: 540,
            marginBottom: 44,
          }}>
            Enterprise-Software für den echten Betrieb. Vom ERP-System
            bis zur Schulverwaltung — 7 Systeme in Produktion.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 80, flexWrap: 'wrap' }}>
            <motion.a
              href="#projekte"
              onClick={e => {
                e.preventDefault()
                document.querySelector('#projekte')?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(99, 102, 241, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px',
                background: 'linear-gradient(135deg, var(--accent), #818cf8)',
                color: '#fff',
                fontSize: '0.9rem', fontWeight: 600,
                borderRadius: 12, border: 'none',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
            >
              Projekte ansehen
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a
              href="#kontakt"
              onClick={e => {
                e.preventDefault()
                document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ borderColor: 'rgba(99, 102, 241, 0.4)', color: '#fff' }}
              style={{
                fontSize: '0.9rem', fontWeight: 600,
                color: 'var(--text-secondary)',
                padding: '16px 24px',
                border: '1px solid var(--border-hover)',
                borderRadius: 12,
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
            >
              Kontakt
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} style={{
            display: 'flex', gap: 56,
            paddingTop: 36,
            borderTop: '1px solid var(--border)',
            flexWrap: 'wrap',
          }}>
            {[
              { target: 7, suffix: '', label: 'Systeme in\nProduktion' },
              { target: 20, suffix: '+', label: 'Datenbank-\nModelle' },
              { target: 350, suffix: '+', label: 'Aktive\nNutzer' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '2.2rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                  <Counter target={s.target} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8, zIndex: 2,
        }}
      >
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.65rem',
          letterSpacing: '0.15em', textTransform: 'uppercase' as const,
          color: 'var(--text-muted)',
        }}>Scroll</span>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.5); }
        }
      `}</style>
    </header>
  )
}
