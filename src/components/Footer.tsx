import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{
      padding: '32px 24px',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <span>&copy; 2026 Abdullahcan Karki</span>
        <motion.span
          whileHover={{ color: 'var(--text-secondary)' }}
          style={{ fontFamily: 'var(--mono)', cursor: 'default', transition: 'color 0.3s' }}
        >
          Built with React + Three.js
        </motion.span>
      </div>
    </footer>
  )
}
