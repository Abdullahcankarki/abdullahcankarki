import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.06
      current.current.y += (pos.current.y - current.current.y) * 0.06
      if (ref.current) {
        ref.current.style.transform = `translate(${current.current.x - 250}px, ${current.current.y - 250}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        width: 500,
        height: 500,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        opacity: 0.35,
        willChange: 'transform',
        top: 0,
        left: 0,
      }}
    />
  )
}
