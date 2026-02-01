import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const timeline = [
  {
    year: '2024 – heute',
    title: 'Freelance Full-Stack Developer',
    subtitle: 'Selbstständig',
    desc: 'Entwicklung von Enterprise-Anwendungen für Kunden aus verschiedenen Branchen. ERP-Systeme, Logistikplattformen und Verwaltungssoftware mit dem MERN-Stack.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    accent: true,
  },
  {
    year: '2025',
    title: 'B.Sc. Medieninformatik',
    subtitle: 'Abgeschlossenes Studium',
    desc: 'Studium der Medieninformatik mit Schwerpunkten in Softwareentwicklung, Webentwicklung, Datenbanken, UI/UX-Design und Mensch-Computer-Interaktion. Bachelorarbeit im Bereich Datenmanagement mit React und Electron.',
    tags: ['Informatik', 'UI/UX', 'Webentwicklung', 'Datenbanken'],
    accent: false,
  },
  {
    year: '2024',
    title: 'Hacilar ERP-System',
    subtitle: 'Flagship-Projekt',
    desc: 'Konzeption und Entwicklung eines umfassenden ERP-Systems für einen Fleischgroßhandel mit 350+ aktiven Kunden, Hardware-Integration, Tourenplanung und Telegram-Bot.',
    tags: ['ERP', 'Leaflet', 'SerialPort', 'Telegram Bot'],
    accent: false,
  },
  {
    year: '2024',
    title: 'Medrese-Verwaltung',
    subtitle: 'Schulverwaltungssystem',
    desc: 'Entwicklung eines vollständigen Verwaltungssystems für Bildungseinrichtungen mit 20+ Datenbankmodellen, Mehrsprachigkeit und rollenbasierter Zugriffskontrolle.',
    tags: ['i18next', 'RBAC', 'Jest', 'Winston'],
    accent: false,
  },
]

function TimelineItem({ item, index, scrollProgress }: {
  item: typeof timeline[0]
  index: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const start = index * 0.1
  const yCard = useTransform(scrollProgress, [start, start + 0.4], [50, 0])
  const opCard = useTransform(scrollProgress, [start, start + 0.3], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        y: yCard,
        opacity: opCard,
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: 32,
        position: 'relative',
      }}
    >
      {/* Year */}
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.8rem',
        fontWeight: 500,
        color: item.accent ? 'var(--accent)' : 'var(--text-muted)',
        paddingTop: 4,
      }}>
        {item.year}
      </div>

      {/* Content */}
      <motion.div
        whileHover={{
          borderColor: 'rgba(99, 102, 241, 0.2)',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.06)',
        }}
        style={{
          padding: 32,
          background: item.accent
            ? 'linear-gradient(135deg, var(--bg-card) 0%, rgba(99, 102, 241, 0.06) 100%)'
            : 'var(--bg-card)',
          border: item.accent
            ? '1px solid rgba(99, 102, 241, 0.2)'
            : '1px solid var(--border)',
          borderRadius: 16,
          transition: 'all 0.4s',
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 500,
            color: 'var(--accent)', letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
          }}>{item.subtitle}</span>
        </div>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 10 }}>{item.title}</h4>
        <p style={{
          fontSize: '0.9rem', color: 'var(--text-secondary)',
          lineHeight: 1.7, marginBottom: 16,
        }}>{item.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {item.tags.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: ti * 0.04 + 0.3, duration: 0.3 }}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 500,
                padding: '4px 12px', background: 'var(--surface)',
                color: 'var(--text-secondary)', borderRadius: 6,
                border: '1px solid var(--border)',
              }}
            >{t}</motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Werdegang() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  return (
    <section id="werdegang" style={{ padding: '120px 0', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: -100, top: '30%',
        width: 400, height: 400, zIndex: 0,
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
      }} />

      <div ref={sectionRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
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
          >05 / Werdegang</motion.span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ display: 'block' }}
            >Mein</motion.span>
            <motion.em
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent-light)', display: 'block' }}
            >Werdegang</motion.em>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {timeline.map((item, i) => (
            <TimelineItem key={item.title} item={item} index={i} scrollProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #werdegang div[style*="grid-template-columns: 120px"] {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  )
}
