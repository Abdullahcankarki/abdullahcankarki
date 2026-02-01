import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface Project {
  label?: string
  name: string
  type: string
  desc: string
  tech: string[]
  features?: string[]
  code: string
  codeFile: string
}

const projects: Project[] = [
  {
    label: 'Flagship Project',
    name: 'Hacilar ERP',
    type: 'Enterprise Resource Planning',
    desc: 'Vollständiges ERP-System für einen Fleischgroßhandel. Kundenverwaltung, Aufträge, Produktion, Tourenplanung mit GPS, Bestandsführung mit Chargen, Flottenmanagement und Telegram-Bot.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Leaflet', 'Chart.js', 'Telegraf', 'SerialPort', 'PDFKit'],
    features: [
      'Hardware-Integration: Waagen & Scanner',
      'Echtzeit-Tourenplanung mit Karten',
      'PDF-Generierung & digitale Signaturen',
      'Chargen-Tracking & Bestandsbewegungen',
      'Telegram Bot für Live-Alerts',
    ],
    code: `const erpModules = {
  kunden:      "350+ active",
  artikel:     "1200+ items",
  touren:      "GPS tracked",
  zerlegung:   "production",
  bestand:     "real-time",
  telegramBot: "live alerts",
};`,
    codeFile: 'hacilar-erp.ts',
  },
  {
    label: 'Multi-Platform',
    name: 'MK-Fleisch Plattform',
    type: 'B2B E-Commerce & Management',
    desc: 'Enterprise-Plattform für ein Fleischunternehmen mit NestJS-Backend, Next.js-Webportal und React-Native-App. PostgreSQL mit Prisma ORM, AWS S3, Swagger-API-Docs und CASL-Berechtigungssystem.',
    tech: ['NestJS', 'Next.js', 'React Native', 'PostgreSQL', 'Prisma', 'AWS S3', 'TypeScript', 'Ant Design'],
    features: [
      'NestJS-Backend mit Prisma ORM',
      'Next.js Admin-Portal mit Refine.dev',
      'React Native Mobile-App (Expo)',
      'AWS S3 Datei-Storage',
      'CASL Rollenbasierte Berechtigungen',
    ],
    code: `@Module({
  imports: [
    PrismaModule,
    AuthModule,
    S3Module,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}`,
    codeFile: 'product.module.ts',
  },
  {
    name: 'BiSiparis',
    type: 'E-Commerce Plattform',
    desc: 'Türkische E-Commerce-Plattform mit Kunden-Storefront und Admin-Panel. MobX State-Management, ApexCharts-Analytics, FullCalendar-Integration und Mehrsprachigkeit.',
    tech: ['React', 'TypeScript', 'MobX', 'Ant Design', 'ApexCharts', 'FullCalendar', 'Refine', 'i18n'],
    features: [
      'Storefront mit Produktkatalog',
      'Admin-Dashboard mit Analytics',
      'MobX reaktives State-Management',
      'Mehrsprachige Unterstützung',
    ],
    code: `class OrderStore {
  @observable orders: Order[] = [];
  @observable analytics = {};

  @action async fetchOrders() {
    this.orders = await api
      .get("/orders")
      .then(r => r.data);
  }
}`,
    codeFile: 'order-store.ts',
  },
  {
    name: 'Medrese-Verwaltung',
    type: 'Schulverwaltungssystem',
    desc: 'Komplettes Verwaltungssystem für islamische Bildungseinrichtungen. 20+ Datenbankmodelle mit mehrsprachiger Unterstützung, rollenbasierter Zugriffskontrolle und Audit-Logging.',
    tech: ['React', 'TypeScript', 'Vite', 'MongoDB', 'i18next', 'Jest', 'Winston', 'Nodemailer'],
    features: [
      '20+ Mongoose-Models mit Relationen',
      'Internationalisierung (i18n)',
      'RBAC: Lehrer, Admin, Eltern',
      'Audit-Logging für Compliance',
    ],
    code: `interface Schueler {
  name:        string;
  klasse:      Ref<Klasse>;
  anwesenheit: Tracking[];
  noten:       Note[];
  zahlungen:   Zahlung[];
  rolle:       "schueler";
}`,
    codeFile: 'medrese.ts',
  },
  {
    name: 'IKPD Terminplaner',
    type: 'Terminverwaltung',
    desc: 'Full-Stack Terminplanungssystem mit Drag-and-Drop-Kalender, JWT-Authentifizierung, Zod-Validierung und PDF-Export. React Big Calendar mit mehreren Ansichten.',
    tech: ['React', 'TypeScript', 'Express', 'MongoDB', 'React Big Calendar', 'DnD', 'Zod', 'JWT'],
    features: [
      'Drag-and-Drop Kalender',
      'JWT-Authentifizierung',
      'PDF-Export mit PDFKit',
      'Zod Schema-Validierung',
    ],
    code: `const appointmentSchema = z.object({
  title:   z.string().min(1),
  start:   z.date(),
  end:     z.date(),
  client:  z.string().uuid(),
  status:  z.enum(["pending",
    "confirmed", "done"]),
});`,
    codeFile: 'appointment.schema.ts',
  },
  {
    name: 'Tour Management',
    type: 'Logistik-Plattform',
    desc: 'Tourenplanungs- und Liefersystem. Drag-and-Drop-Interface für Routenoptimierung, 26+ React-Komponenten und native Desktop-App via Electron.',
    tech: ['React', 'Electron', 'React DnD', 'Styled Components', 'MongoDB'],
    features: [
      'Drag-and-Drop Tourenplanung',
      'Electron Desktop-App',
      '26+ spezialisierte Komponenten',
    ],
    code: `function optimizeTour(
  stops: Kunde[],
  vehicle: Fahrzeug
): Route {
  return stops
    .sort(byPriority)
    .cluster(byRegion)
    .sequence(shortest);
}`,
    codeFile: 'tour-planner.ts',
  },
]

const compactProjects = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    ),
    name: 'Lagerbestand & WarenEingang',
    desc: 'Echtzeit-Bestandsmanagement mit JWT-Auth plus Wareneingangssystem mit Admin-Dashboard.',
    tech: ['React', 'TypeScript', 'Express', 'JWT'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><path d="M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z"/><path d="M12 11h4m-4 4h4m-8-4h.01M8 15h.01"/>
      </svg>
    ),
    name: 'Heilpraktiker Website',
    desc: 'Professionelle Website für eine Heilpraktikerin. Responsive Design mit Preis-Tabelle, Testimonials, FAQ und Kontaktformular.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17H7A5 5 0 017 7h2m6 0h2a5 5 0 010 10h-2m-7-5h8"/>
      </svg>
    ),
    name: 'SKM Fahrtenbuch',
    desc: 'Fahrtenbuch-App mit Trip-Tracking, Daten-Persistierung und Wallbox-Management für E-Fahrzeuge.',
    tech: ['React', 'Express', 'MongoDB', 'MUI'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
    name: 'Bachelorarbeit',
    desc: 'Medieninformatik-Abschlussarbeit: Datenmanagement mit Drag-and-Drop und Electron.',
    tech: ['React', 'Electron', 'dnd-kit', 'MongoDB'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8m8 4H8m2-8H8"/>
      </svg>
    ),
    name: 'PDF Compressor',
    desc: 'Python-Utility zur Komprimierung gescannter PDFs mit konfigurierbarer Qualität.',
    tech: ['Python', 'PyMuPDF', 'Pillow'],
  },
]

/* ── Typing Effect for Code ── */
function TypingCode({ code, active }: { code: string; active: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active || done) return
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      i++
      setDisplayed(code.slice(0, i))
      if (i >= code.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [active, code, done])

  return (
    <pre style={{ padding: 20, overflow: 'auto', minHeight: 180 }}>
      <code style={{
        fontFamily: 'var(--mono)', fontSize: '0.78rem',
        lineHeight: 1.8, color: 'var(--text-secondary)',
      }}>
        {active ? displayed : code}
        {active && !done && (
          <span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite' }}>|</span>
        )}
      </code>
    </pre>
  )
}

/* ── 3D Tilt Card ── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

/* ── Section Header with scroll-linked line ── */
function SectionHeader() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{ marginBottom: 64 }}
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 500,
          color: 'var(--accent)', letterSpacing: '0.15em',
          textTransform: 'uppercase' as const, display: 'block', marginBottom: 16,
        }}
      >01 / Projekte</motion.span>
      <h2 style={{
        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
        fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
      }}>
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ display: 'block' }}
        >Ausgewählte</motion.span>
        <motion.em
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent-light)', display: 'block' }}
        >Arbeiten</motion.em>
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
  )
}

/* ── Project Card with scroll-linked parallax ── */
function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Code side slides in from left, info from right
  const xCode = useTransform(scrollYProgress, [0, 0.3, 0.5], [-60, -20, 0])
  const xInfo = useTransform(scrollYProgress, [0, 0.3, 0.5], [60, 20, 0])
  const yCard = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const opacityCard = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{ marginBottom: 48, y: yCard, opacity: opacityCard }}
    >
      <TiltCard>
        <article style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
          padding: 48,
          background: project.label
            ? 'linear-gradient(135deg, var(--bg-card) 0%, rgba(99, 102, 241, 0.04) 100%)'
            : 'var(--bg-card)',
          border: project.label
            ? '1px solid rgba(99, 102, 241, 0.2)'
            : '1px solid var(--border)',
          borderRadius: 20,
        }}>
          {/* Code window — slides in from left */}
          <motion.div style={{ x: xCode }}>
            <div style={{
              background: '#0a0a0e',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.02)',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                    <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {project.codeFile}
                </span>
              </div>
              <TypingCode code={project.code} active={inView} />
            </div>
          </motion.div>

          {/* Info — slides in from right */}
          <motion.div style={{ x: xInfo }}>
            {project.label && (
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 500,
                color: 'var(--accent)', letterSpacing: '0.15em',
                textTransform: 'uppercase' as const, marginBottom: 8,
              }}>{project.label}</div>
            )}
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
              {project.name}
            </h3>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>
              {project.type}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
              {project.desc}
            </p>
            {project.features && (
              <ul style={{ marginBottom: 24 }}>
                {project.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: fi * 0.08 + 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    style={{
                      fontSize: '0.85rem', color: 'var(--text-secondary)',
                      padding: '6px 0', paddingLeft: 20, position: 'relative',
                    }}
                  >
                    <span style={{
                      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                      width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)',
                    }} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.tech.map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: ti * 0.03 + 0.6, duration: 0.3 }}
                  whileHover={{
                    y: -2,
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    color: '#818cf8',
                    background: 'var(--accent-soft)',
                  }}
                  style={{
                    fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 500,
                    padding: '5px 12px', background: 'var(--surface)',
                    color: 'var(--text-secondary)', borderRadius: 6,
                    border: '1px solid var(--border)', transition: 'all 0.3s',
                    cursor: 'default',
                  }}
                >{t}</motion.span>
              ))}
            </div>
          </motion.div>
        </article>
      </TiltCard>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 1024px) {
          article { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          article { padding: 24px !important; }
        }
      `}</style>
    </motion.div>
  )
}

/* ── Compact cards with staggered scroll reveal ── */
function CompactCards() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        marginTop: 48,
      }}
    >
      {compactProjects.map((p, i) => (
        <CompactCard key={p.name} project={p} index={i} scrollProgress={scrollYProgress} />
      ))}
      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function CompactCard({ project: p, index: i, scrollProgress }: {
  project: typeof compactProjects[0]; index: number; scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = i * 0.1
  const yCard = useTransform(scrollProgress, [start, start + 0.5], [60, 0])
  const opCard = useTransform(scrollProgress, [start, start + 0.35], [0, 1])
  const scaleCard = useTransform(scrollProgress, [start, start + 0.5], [0.95, 1])

  return (
    <motion.article
      style={{
        y: yCard,
        opacity: opCard,
        scale: scaleCard,
        padding: 32,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        transition: 'border-color 0.3s, transform 0.3s',
      }}
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
    >
      <div style={{
        width: 48, height: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--accent-soft)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: 14, color: 'var(--accent)',
        marginBottom: 20,
      }}>{p.icon}</div>
      <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>{p.name}</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {p.tech.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 500,
            padding: '4px 10px', background: 'var(--surface)',
            color: 'var(--text-secondary)', borderRadius: 6,
            border: '1px solid var(--border)',
          }}>{t}</span>
        ))}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projekte" style={{ padding: '120px 0', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader />
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
        <CompactCards />
      </div>
    </section>
  )
}
