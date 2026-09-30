import { useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Lightbox from './Lightbox.jsx'
import useCarousel from '../lib/useCarousel.js'
import { instagramFeeds, projects, socialPosts } from '../data/site.js'

const tags = {
  shop: { label: 'Tienda Online', className: 'text-secondary' },
  corp: { label: 'Sitio Corporativo', className: 'text-primary' },
}

const tabs = [
  { id: 'web', label: 'Sitios web', icon: 'language' },
  { id: 'social', label: 'Redes sociales', icon: 'photo_library' },
]

// Captura larga dentro de una ventana: muestra el inicio y, al pasar el mouse, se desliza hasta el final.
// `aspect` es la clase de proporción de la ventana y `windowRatio` su alto/ancho (p. ej. 4:3 → 3/4).
// La duración se ajusta al largo de la captura para que avance a velocidad constante.
function ScrollingShot({ src, alt, aspect, windowRatio, hint }) {
  function setScrollDuration(e) {
    const img = e.currentTarget
    const ratio = img.naturalHeight / img.naturalWidth
    const seconds = Math.max(1.5, (ratio - windowRatio) * 1.6)
    img.style.setProperty('--scroll-dur', `${seconds.toFixed(2)}s`)
  }

  return (
    <div className={`relative ${aspect} overflow-hidden bg-surface-container-lowest`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        onLoad={setScrollDuration}
        className="absolute inset-0 w-full h-full object-cover object-top
          transition-[object-position] duration-700 ease-in-out
          group-hover:object-bottom group-focus-visible:object-bottom
          group-hover:ease-linear group-focus-visible:ease-linear
          group-hover:[transition-duration:var(--scroll-dur,4s)] group-focus-visible:[transition-duration:var(--scroll-dur,4s)]
          motion-reduce:transition-none"
      />
      {/* Indicador de que la imagen se desplaza al pasar el mouse */}
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-on-surface shadow-lg transition-opacity duration-300 group-hover:opacity-0">
        <Icon name="swipe_up" className="text-sm text-secondary" />
        {hint}
      </div>
    </div>
  )
}

function BrowserBar({ domain }) {
  return (
    <div className="flex items-center gap-1.5 px-3 h-7 bg-surface-container-highest/80 border-b border-outline-variant/40">
      <span className="w-2 h-2 rounded-full bg-error/70" />
      <span className="w-2 h-2 rounded-full bg-tertiary/70" />
      <span className="w-2 h-2 rounded-full bg-secondary/70" />
      <span className="ml-2 flex-1 truncate rounded bg-surface-container-lowest/60 px-2 py-0.5 text-[10px] text-outline">{domain}</span>
    </div>
  )
}

function Preview({ project }) {
  if (!project.image) {
    return (
      <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-container/30 via-surface-container-high to-secondary-container/20">
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-secondary-container/20 blur-2xl" />
        <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface/80 text-center px-6">{project.name}</span>
      </div>
    )
  }

  return <ScrollingShot src={project.image} alt={`Captura del sitio ${project.name}`} aspect="aspect-[4/3]" windowRatio={3 / 4} hint="Ver diseño" />
}

// En móvil los proyectos son un carrusel que avanza solo y se arrastra; desde tablet, una grilla
function WebProjects() {
  const { trackRef, trackProps } = useCarousel()
  return (
    <div
      ref={trackRef}
      {...trackProps}
      className="-mx-margin-mobile flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile py-3 scroll-px-margin-mobile cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:py-0 md:cursor-auto md:select-auto lg:grid-cols-3 xl:grid-cols-4"
    >
      {projects.map((p) => {
        const tag = tags[p.type]
        return (
          <a
            key={p.url}
            className="card-edge group flex w-[82%] shrink-0 snap-center md:w-auto flex-col rounded-2xl overflow-hidden bg-surface-container hover:bg-surface-container-high transition-colors duration-300 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            href={p.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="m-2 mb-0 rounded-xl overflow-hidden ring-1 ring-outline-variant/40">
              <BrowserBar domain={p.domain} />
              <Preview project={p} />
            </div>

            <div className="flex flex-col gap-1 px-4 py-3.5">
              <h3 className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors">{p.name}</h3>
              <span className={`text-xs ${tag.className}`}>{tag.label}</span>
            </div>
          </a>
        )
      })}
    </div>
  )
}

// Vista previa de un reel: muestra el primer cuadro; con mouse encima se reproduce en silencio.
// preload="metadata" + "#t=0.1" carga solo lo necesario para mostrar el primer cuadro (no descarga el video completo).
function ReelPreview({ post }) {
  const videoRef = useRef(null)
  const play = () => videoRef.current?.play().catch(() => {})
  const stop = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0.1
  }
  return (
    <video
      ref={videoRef}
      src={`${post.video}#t=0.1`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onMouseEnter={play}
      onMouseLeave={stop}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  )
}

// Grilla de reels para redes sociales; cada uno se abre en el visor con sonido y controles
function SocialGrid() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {socialPosts.map((post, i) => (
          <li key={post.video}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Ver video: ${post.title}`}
              className="card-edge group relative block w-full aspect-[9/16] overflow-hidden rounded-2xl bg-surface-container-high shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ReelPreview post={post} />
              {/* Degradado inferior con el título */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 pb-3 pt-10 text-left text-white font-label-md text-label-md">
                {post.title}
              </span>
              {/* Botón de reproducir */}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1c1633] shadow-lg transition-all duration-300 group-hover:scale-90 group-hover:opacity-0">
                  <Icon name="play_arrow" className="text-3xl" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={socialPosts} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />

      <InstagramFeeds />
    </>
  )
}

const instagramPath =
  'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z'

// Feeds de Instagram que gestionamos: capturas largas del perfil que se deslizan al pasar el mouse (como los sitios web)
function InstagramFeeds() {
  return (
    <div className="mt-12 flex flex-col gap-5">
      <h3 className="eyebrow text-primary">Algunas cuentas gestionadas</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {instagramFeeds.map((feed) => (
          <a
            key={feed.handle}
            href={`https://www.instagram.com/${feed.handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-edge group flex flex-col rounded-2xl overflow-hidden bg-surface-container hover:bg-surface-container-high transition-colors duration-300 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="m-2 mb-0 rounded-xl overflow-hidden ring-1 ring-outline-variant/40">
              {/* Barra tipo app de Instagram con el usuario */}
              <div className="flex items-center gap-2 px-3 h-8 bg-surface-container-highest/80 border-b border-outline-variant/40">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                    <path d={instagramPath} />
                  </svg>
                </span>
                <span className="truncate text-[11px] font-semibold text-on-surface">@{feed.handle}</span>
              </div>
              <ScrollingShot src={feed.image} alt={`Feed de Instagram de ${feed.name}`} aspect="aspect-[4/5]" windowRatio={5 / 4} hint="Ver feed" />
            </div>
            <div className="flex flex-col gap-1 px-4 py-3.5">
              <span className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors">{feed.name}</span>
              <span className="text-xs text-secondary">Instagram</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('web')
  const tabRefs = useRef({})

  // Flechas izquierda/derecha para moverse entre pestañas (patrón accesible de tabs)
  function onTabKey(e) {
    const i = tabs.findIndex((t) => t.id === active)
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = tabs[(i + step + tabs.length) % tabs.length]
    setActive(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <section className="w-full py-20 bg-surface dark:bg-transparent" id="portafolio">
      <div className="container-page flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span className="eyebrow text-primary">Mira algunos de nuestros</span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface tracking-tight mt-1">
              Proyectos realizados
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Tipo de proyecto"
            onKeyDown={onTabKey}
            className="card-edge inline-flex gap-1 rounded-2xl bg-surface-container-high p-1.5"
          >
            {tabs.map((t) => {
              const selected = active === t.id
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[t.id] = el)}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  type="button"
                  onClick={() => setActive(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 font-label-md text-label-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    selected
                      ? 'bg-primary-container text-on-primary-container shadow-md shadow-primary-container/30'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Icon name={t.icon} className="text-lg" />
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} key={active} className="animate-[fadeIn_0.3s_ease-out]">
          {active === 'web' ? <WebProjects /> : <SocialGrid />}
        </div>
      </div>
    </section>
  )
}
