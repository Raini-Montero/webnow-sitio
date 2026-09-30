import { useEffect, useRef } from 'react'
import AnimatedBackdrop from './AnimatedBackdrop.jsx'
import ClientLogos from './ClientLogos.jsx'
import HeroIllustration from './HeroIllustration.jsx'
import Icon from './Icon.jsx'

// Inclinación máxima de la ilustración (grados)
const TILT_X = 8
const TILT_Y = 12

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

// La ilustración del hero se inclina en 3D hacia el cursor (los elementos flotantes crean el paralaje).
// Se desactiva con "reducir movimiento" y en pantallas táctiles (solo con mouse).
function useHeroTilt(sectionRef, cardRef) {
  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    if (!section || !card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame = 0
    let pointer = null

    function update() {
      frame = 0
      if (!pointer) return
      const c = card.getBoundingClientRect()
      // Posición relativa al centro de la imagen, de -1 a 1 (se satura fuera de la imagen)
      const dx = clamp((pointer.x - (c.left + c.width / 2)) / (c.width / 2), -1.5, 1.5) / 1.5
      const dy = clamp((pointer.y - (c.top + c.height / 2)) / (c.height / 2), -1.5, 1.5) / 1.5
      card.style.setProperty('--ry', `${(dx * TILT_Y).toFixed(2)}deg`)
      card.style.setProperty('--rx', `${(-dy * TILT_X).toFixed(2)}deg`)
    }

    function onMove(e) {
      pointer = { x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(update)
    }

    function onLeave() {
      pointer = null
      ;['--rx', '--ry'].forEach((p) => card.style.setProperty(p, '0deg'))
    }

    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
    }
  }, [sectionRef, cardRef])
}

// Elemento decorativo ubicado en el espacio 3D. `depth` (px) lo acerca (+) o aleja (-) de la imagen:
// al inclinarse la escena, los más cercanos se desplazan más (paralaje). Además flota por su cuenta.
function Floating({ className, depth, duration = 6, delay = 0, children }) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `translateZ(${depth}px)` }}>
      <div className="animate-bob motion-reduce:animate-none" style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  )
}

const panel = 'rounded-2xl bg-surface-container-lowest/95 shadow-xl shadow-black/30 ring-1 ring-white/10'
const chip = `${panel} flex items-center justify-center`

function HeroOrnaments() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]">
      {/* Detrás de la imagen: anillo punteado que gira y trama de puntos */}
      <Floating className="-top-10 -right-8" depth={-60} duration={9}>
        <div className="h-28 w-28 rounded-full border-2 border-dashed border-primary/40 animate-[spin_24s_linear_infinite] motion-reduce:animate-none" />
      </Floating>
      <Floating className="-bottom-10 -left-10" depth={-80} duration={10} delay={-3}>
        <div className="h-28 w-28 opacity-50 [background-image:radial-gradient(rgb(var(--c-secondary))_1.5px,transparent_1.5px)] [background-size:14px_14px]" />
      </Floating>

      {/* Delante de la imagen */}
      <Floating className="-top-6 left-0 lg:-left-6" depth={90} duration={5.5}>
        <div className={`${chip} h-14 w-14 text-primary`}>
          <Icon name="code" className="text-3xl" />
        </div>
      </Floating>

      <Floating className="-top-7 right-16" depth={120} duration={6.5} delay={-2}>
        <div className={`${chip} h-12 w-12 bg-gradient-to-br from-tertiary-container to-tertiary text-white`}>
          <Icon name="rocket_launch" className="text-2xl" />
        </div>
      </Floating>

      <Floating className="hidden sm:block top-1/2 -right-7" depth={70} duration={7} delay={-1}>
        <div className={`${chip} h-12 w-12 text-secondary`}>
          <Icon name="shopping_cart" className="text-2xl" />
        </div>
      </Floating>

      {/* Mini gráfico de barras que crecen */}
      <Floating className="hidden sm:block -bottom-8 left-10" depth={100} duration={6} delay={-4}>
        <div className={`${panel} flex h-16 items-end gap-1.5 px-3 pb-3 pt-4`}>
          {[45, 70, 55, 90, 75].map((h, i) => (
            <span
              key={i}
              className="w-2.5 rounded-sm bg-gradient-to-t from-primary-container to-secondary origin-bottom animate-grow motion-reduce:animate-none"
              style={{ height: `${h * 0.36}px`, animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </div>
      </Floating>

      {/* Cursor con clic */}
      <Floating className="bottom-10 right-1/4" depth={140} duration={5} delay={-1.5}>
        <div className="relative">
          <span className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-primary/40 animate-ping motion-reduce:animate-none" />
          <svg viewBox="0 0 24 24" className="relative h-8 w-8 drop-shadow-lg" fill="white" stroke="rgb(var(--c-primary-container))" strokeWidth="1.5">
            <path d="M4 3l7.5 18 2.4-7.1L21 11.5z" strokeLinejoin="round" />
          </svg>
        </div>
      </Floating>

      {/* Destellos */}
      <Floating className="top-1/3 -left-9" depth={60} duration={4.5} delay={-2.5}>
        <Icon name="auto_awesome" className="text-3xl text-tertiary-fixed-dim drop-shadow" />
      </Floating>
      <Floating className="-bottom-5 right-6" depth={50} duration={5} delay={-0.5}>
        <Icon name="auto_awesome" className="text-xl text-secondary drop-shadow" />
      </Floating>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  useHeroTilt(sectionRef, cardRef)

  return (
    <section
      ref={sectionRef}
      className="band relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest to-surface dark:bg-none py-16 md:py-24"
    >
      <AnimatedBackdrop className="dark:hidden" />

      <div className="relative container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/20 text-primary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">No esperes más</span>
          </div>
          <h1 className="font-display-mobile text-display-mobile md:font-display md:text-display leading-tight text-on-surface tracking-tight">
            Creamos tu sitio web{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary-fixed-dim">ahora</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            y te acompañamos en los siguientes pasos con tecnología de vanguardia, ingeniería escalable y diseño enfocado en la
            conversión real de tu negocio en Chile y Latam.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <a
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold shadow-xl shadow-primary-container/20 hover:scale-[1.03] hover:shadow-primary-container/35 transition-all duration-300"
              href="#contactar"
            >
              <span>Contactar</span>
              <Icon name="arrow_forward" className="text-lg" />
            </a>
            <a
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-all duration-200"
              href="#desarrollo"
            >
              <Icon name="explore" className="text-lg text-secondary" />
              <span>Ver Planes</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex justify-center items-center [perspective:1200px] py-8 sm:px-8">
          {/* Flota suavemente; dentro, la escena se inclina hacia el cursor */}
          <div className="w-full max-w-xl animate-float motion-reduce:animate-none [transform-style:preserve-3d]">
            <div ref={cardRef} className="hero-tilt relative">
              <HeroIllustration />
              <HeroOrnaments />
            </div>
          </div>
        </div>
      </div>

      {/* Logos de clientes, sobre el mismo fondo del hero */}
      <div className="relative container-page mt-16 md:mt-20">
        <ClientLogos />
      </div>
    </section>
  )
}
