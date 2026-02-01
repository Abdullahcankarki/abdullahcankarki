import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const yContent = useTransform(scrollYProgress, [0, 0.6], [80, 0])
  const opContent = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const scaleContent = useTransform(scrollYProgress, [0, 0.6], [0.95, 1])

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(`https://formsubmit.co/ajax/abdullahcankarki@gmail.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Kontakt: ${form.name}`,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    color: 'var(--text)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font)',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  return (
    <section ref={sectionRef} id="kontakt" style={{ padding: '120px 0', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(99, 102, 241, 0.05), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <motion.div style={{ y: yContent, opacity: opContent, scale: scaleContent }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500,
                color: 'var(--accent)', letterSpacing: '0.15em',
                textTransform: 'uppercase' as const, display: 'block', marginBottom: 16,
              }}
            >06 / Kontakt</motion.span>

            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700, letterSpacing: '-0.02em', margin: '16px 0',
            }}>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{ display: 'inline' }}
              >Lass uns </motion.span>
              <motion.em
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent-light)' }}
              >reden</motion.em>
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
              >.</motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}
            >
              Neues Projekt? Freiberuflicher Auftrag? Oder einfach austauschen? Schreib mir eine Nachricht.
            </motion.p>
          </div>

          {/* Content Grid: Info + Form */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 48,
            alignItems: 'start',
          }}>
            {/* Left: Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                style={{
                  padding: '24px 28px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'var(--accent-soft)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Abdullahcan Karki</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full-Stack Developer</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  B.Sc. Medieninformatik — spezialisiert auf Enterprise-Software und Webentwicklung mit dem MERN-Stack.
                </div>
              </motion.div>

              {/* Email */}
              <motion.a
                href="mailto:abdullahcankarki@gmail.com"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                whileHover={{
                  y: -3,
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  background: 'var(--bg-card-hover)',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 24px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  transition: 'all 0.4s',
                  textAlign: 'left',
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, display: 'block' }}>Email</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'block', marginTop: 2 }}>abdullahcankarki@gmail.com</span>
                </div>
              </motion.a>

              {/* Telefon */}
              <motion.a
                href="tel:+4917623665034"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                whileHover={{
                  y: -3,
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  background: 'var(--bg-card-hover)',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 24px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  transition: 'all 0.4s',
                  textAlign: 'left',
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--accent)' }}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, display: 'block' }}>Telefon</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'block', marginTop: 2 }}>+49 176 2366 5034</span>
                </div>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/abdullahcankarki"
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                whileHover={{
                  y: -3,
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                  background: 'var(--bg-card-hover)',
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 24px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  transition: 'all 0.4s',
                  textAlign: 'left',
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent)' }}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, display: 'block' }}>GitHub</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text)', display: 'block', marginTop: 2 }}>github.com/abdullahcankarki</span>
                </div>
              </motion.a>
            </div>

            {/* Right: Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{
                padding: 36,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 24 }}>Nachricht senden</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Dein Name"
                    style={inputStyle}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="deine@email.de"
                    style={inputStyle}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Nachricht</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Erzähl mir von deinem Projekt..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(99, 102, 241, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '16px 32px',
                    background: status === 'sent'
                      ? 'linear-gradient(135deg, #34d399, #10b981)'
                      : 'linear-gradient(135deg, var(--accent), #818cf8)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font)',
                    borderRadius: 12,
                    border: 'none',
                    cursor: status === 'sending' ? 'wait' : 'pointer',
                    transition: 'all 0.3s',
                    marginTop: 8,
                  }}
                >
                  {status === 'idle' && 'Nachricht senden'}
                  {status === 'sending' && 'Wird gesendet...'}
                  {status === 'sent' && 'Nachricht gesendet!'}
                  {status === 'error' && 'Fehler — nochmal versuchen'}
                </motion.button>

                {status === 'sent' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '0.85rem', color: 'var(--green)', textAlign: 'center' }}
                  >
                    Danke! Ich melde mich so bald wie möglich.
                  </motion.p>
                )}
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #kontakt div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
