import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#projekte', label: 'Projekte', idx: '01' },
  { href: '#ueber', label: 'Über mich', idx: '02' },
  { href: '#stack', label: 'Stack', idx: '03' },
  { href: '#werdegang', label: 'Werdegang', idx: '05' },
  { href: '#kontakt', label: 'Kontakt', idx: '06' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '14px 32px' : '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(6, 6, 8, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.8)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>
          <span style={{ color: 'var(--accent)' }}>{'{'}</span>
          ACK
          <span style={{ color: 'var(--accent)' }}>{'}'}</span>
        </a>

        <div className="nav-links-desktop" style={{ display: 'flex', gap: 36 }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={e => { e.preventDefault(); scrollTo(l.href) }}
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--accent)', marginRight: 4, opacity: 0.7 }}>{l.idx}.</span>
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            width: 28,
          }}
        >
          <span style={{
            display: 'block', height: 2, background: 'var(--text)', borderRadius: 2,
            transition: 'all 0.3s',
            transform: mobileOpen ? 'translateY(3.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', height: 2, background: 'var(--text)', borderRadius: 2,
            transition: 'all 0.3s',
            transform: mobileOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: 'rgba(6, 6, 8, 0.97)',
              backdropFilter: 'blur(30px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href) }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem', color: 'var(--accent)', verticalAlign: 'super', marginRight: 4 }}>{l.idx}.</span>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
