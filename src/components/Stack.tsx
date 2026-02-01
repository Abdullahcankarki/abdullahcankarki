import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const stackGroups = [
  {
    title: 'Frontend',
    icon: '⬡',
    items: ['React 18+', 'TypeScript', 'Vite', 'Bootstrap 5', 'SASS', 'Chart.js', 'Leaflet', 'Styled Components'],
  },
  {
    title: 'Backend',
    icon: '◈',
    items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Winston', 'REST API', 'RBAC'],
  },
  {
    title: 'Tools & Extras',
    icon: '◇',
    items: ['Telegram Bot', 'SerialPort', 'PDFKit', 'Electron', 'i18next', 'Nodemailer', 'Python', 'Jest'],
  },
]

/* ── Single Stack Card with scroll-linked animation ── */
function StackCard({ group, index, scrollProgress }: {
  group: typeof stackGroups[0]
  index: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const start = index * 0.08
  const yCard = useTransform(scrollProgress, [start, start + 0.4], [50, 0])
  const opCard = useTransform(scrollProgress, [start, start + 0.3], [0, 1])
  const scaleCard = useTransform(scrollProgress, [start, start + 0.4], [0.96, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        y: yCard,
        opacity: opCard,
        scale: scaleCard,
        padding: 36,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      whileHover={{ borderColor: 'rgba(99, 102, 241, 0.2)', boxShadow: '0 8px 40px rgba(99, 102, 241, 0.06)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <span style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>{group.icon}</span>
        <h4 style={{
          fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500,
          color: 'var(--accent)', letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
        }}>{group.title}</h4>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {group.items.map((item, ii) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: ii * 0.04 + 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            whileHover={{
              y: -2,
              borderColor: 'rgba(99, 102, 241, 0.4)',
              color: '#a5b4fc',
              background: 'var(--accent-soft)',
            }}
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500,
              padding: '8px 16px', background: 'var(--surface)',
              color: 'var(--text-secondary)', borderRadius: 10,
              border: '1px solid var(--border)', transition: 'all 0.3s',
              cursor: 'default',
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Stack() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  return (
    <section id="stack" style={{ padding: '120px 0' }}>
      <div ref={sectionRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div style={{ marginBottom: 64 }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500,
              color: 'var(--accent)', letterSpacing: '0.15em',
              textTransform: 'uppercase' as const, display: 'block', marginBottom: 16,
            }}
          >03 / Stack</motion.span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ display: 'block' }}
            >Womit ich</motion.span>
            <motion.em
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent-light)', display: 'block' }}
            >arbeite</motion.em>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {stackGroups.map((group, gi) => (
            <StackCard key={group.title} group={group} index={gi} scrollProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #stack div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          #stack div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
