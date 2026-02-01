import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const techs = [
  'React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Electron',
  'Vite', 'Leaflet', 'Chart.js', 'Python', 'JWT', 'i18next',
  'Telegram Bot', 'PDFKit', 'SerialPort', 'Jest',
]

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Scroll-linked horizontal shift: moves the marquee faster/slower based on scroll
  const xShift = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        padding: '20px 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--bg-elevated)',
        position: 'relative',
        opacity,
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
        background: 'linear-gradient(to right, var(--bg-elevated), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
        background: 'linear-gradient(to left, var(--bg-elevated), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <motion.div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 30s linear infinite',
        x: xShift,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingRight: 12 }}>
            {techs.map(t => (
              <span key={`${i}-${t}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                }}>{t}</span>
                <span style={{
                  fontSize: '0.35rem',
                  color: 'var(--accent)',
                  opacity: 0.5,
                }}>◆</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </motion.div>
  )
}
