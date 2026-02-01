import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/* ── CountUp ── */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

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

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax for background blob
  const yBg = useTransform(scrollYProgress, [0, 1], [80, -80])
  // Text content slides up with scroll
  const yText = useTransform(scrollYProgress, [0, 0.4], [60, 0])
  const opText = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  // Cards slide in from right with stagger via scroll
  const xCards = useTransform(scrollYProgress, [0.05, 0.4], [80, 0])
  const opCards = useTransform(scrollYProgress, [0.05, 0.3], [0, 1])

  return (
    <section ref={sectionRef} id="ueber" style={{ padding: '120px 0', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
      {/* CSS gradient background with parallax */}
      <motion.div style={{
        position: 'absolute', right: -100, top: '50%',
        width: 500, height: 500, zIndex: 0,
        y: yBg,
        transform: 'translateY(-50%)',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(99, 102, 241, 0.05), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Section header with scroll-linked reveal */}
        <motion.div style={{ y: yText, opacity: opText, marginBottom: 64 }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500,
              color: 'var(--accent)', letterSpacing: '0.15em',
              textTransform: 'uppercase' as const, display: 'block', marginBottom: 16,
            }}
          >02 / Über mich</motion.span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ display: 'block' }}
            >Wer</motion.span>
            <motion.em
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent-light)', display: 'block' }}
            >dahinter steckt</motion.em>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              height: 1,
              background: 'linear-gradient(to right, var(--accent), transparent)',
              marginTop: 24,
              transformOrigin: 'left',
            }}
          />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Text content — scroll parallax */}
          <motion.div style={{ y: yText, opacity: opText }}>
            <p style={{ fontSize: '1.3rem', fontWeight: 500, lineHeight: 1.6, marginBottom: 20 }}>
              Ich bin Abdullahcan Karki — Full-Stack Developer mit abgeschlossenem Studium
              in <strong style={{ color: 'var(--accent-light)' }}>Medieninformatik</strong> und dem Fokus auf Systeme,
              die wirklich genutzt werden.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
              Kein Code um des Codes willen, sondern Software die einen Unterschied macht.
              Vom Fleischgroßhandel-ERP bis zur Schulverwaltung: Jedes Projekt startet
              mit dem Problem, nicht mit dem Framework. Durch mein Studium der Medieninformatik
              verbinde ich fundiertes informatisches Wissen mit einem Auge für Usability und Design.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Mein Stack ist der MERN-Stack mit TypeScript. Aber ich bin kein
              Framework-Fetischist — wenn Python das richtige Tool ist, nehme ich Python.
              Wenn Electron gebraucht wird, baue ich Desktop-Apps. Wenn Hardware
              angebunden werden muss, schließe ich sie an.
            </p>
          </motion.div>

          {/* Stat cards — slide in from right via scroll */}
          <motion.div style={{ x: xCards, opacity: opCards, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { el: <CountUp target={7} />, label: 'Systeme in Produktion' },
              { el: <CountUp target={20} suffix="+" />, label: 'Datenbank-Modelle' },
            ].map((s) => (
              <motion.div
                key={s.label}
                whileHover={{
                  y: -3,
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
                }}
                style={{
                  padding: '28px 32px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  transition: 'all 0.4s',
                }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{s.el}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ y: -3, boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)' }}
              style={{
                padding: '28px 32px',
                background: 'linear-gradient(135deg, var(--bg-card), rgba(99, 102, 241, 0.08))',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: 16,
                transition: 'all 0.4s',
              }}
            >
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '2rem', fontWeight: 700,
                background: 'linear-gradient(90deg, #6366f1, #818cf8, #a5b4fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>MERN</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Core Stack</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #ueber > div:nth-child(3) > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
