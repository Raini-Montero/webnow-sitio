import AnimatedBackdrop from './AnimatedBackdrop.jsx'
import Icon from './Icon.jsx'
import { whatsappUrl } from '../data/site.js'

// Bloque del maquetado que aparece en secuencia (ver .wf-build en index.css)
function Block({ order, className = '', style }) {
  return <div className={`wf-build ${className}`} style={{ '--d': `${order * 0.18}s`, ...style }} />
}

// Maquetado de un sitio en escritorio
function DesktopMockup() {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-white/20 shadow-2xl shadow-black/40 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 h-8 bg-[#f1ecfe]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 max-w-[60%] rounded-md bg-white px-2 py-0.5 text-[10px] text-[#8b86a0] truncate">tu-proyecto.cl</span>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* Menú */}
        <div className="flex items-center gap-3">
          <Block order={0} className="h-5 w-5 rounded-md bg-[#7b42f5]" />
          <Block order={0.5} className="h-2 w-12 rounded-full bg-[#1c1633]/80" />
          <div className="ml-auto flex items-center gap-2.5">
            {[1, 1.3, 1.6].map((o) => (
              <Block key={o} order={o} className="h-1.5 w-8 rounded-full bg-[#1c1633]/25" />
            ))}
            <Block order={2} className="h-5 w-14 rounded-full bg-[#ff8a1f]" />
          </div>
        </div>

        {/* Portada */}
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="col-span-3 flex flex-col gap-2">
            <Block order={3} className="h-3.5 w-11/12 rounded-full bg-[#1c1633]" />
            <Block order={3.4} className="h-3.5 w-2/3 rounded-full bg-[#7b42f5]" />
            <Block order={4} className="mt-1 h-1.5 w-full rounded-full bg-[#1c1633]/20" />
            <Block order={4.3} className="h-1.5 w-10/12 rounded-full bg-[#1c1633]/20" />
            <Block order={4.6} className="h-1.5 w-7/12 rounded-full bg-[#1c1633]/20" />
            <div className="mt-2 flex gap-2">
              <Block order={5.2} className="h-6 w-20 rounded-lg bg-[#7b42f5]" />
              <Block order={5.5} className="h-6 w-14 rounded-lg ring-1 ring-inset ring-[#7b42f5]/40" />
            </div>
          </div>
          <div className="col-span-2 wf-build relative aspect-[4/3] rounded-xl bg-gradient-to-br from-[#9d6bff] via-[#7b42f5] to-[#12b5d6] overflow-hidden" style={{ '--d': '0.9s' }}>
            <span className="absolute right-3 top-3 h-5 w-5 rounded-full bg-[#ffb27a]" />
            <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/5 w-full" aria-hidden="true">
              <path d="M0 60 L0 38 L28 14 L50 34 L68 20 L100 44 L100 60 Z" fill="rgb(255 255 255 / 0.35)" />
            </svg>
          </div>
        </div>

        {/* Tarjetas de servicios */}
        <div className="grid grid-cols-3 gap-3">
          {['#7b42f5', '#12b5d6', '#ff8a1f'].map((color, i) => (
            <div key={color} className="wf-build rounded-xl bg-[#f7f5fd] ring-1 ring-[#ddd7ee] p-3 flex flex-col gap-1.5" style={{ '--d': `${(6.2 + i * 0.4) * 0.18}s` }}>
              <span className="h-5 w-5 rounded-md" style={{ background: color }} />
              <span className="h-1.5 w-3/4 rounded-full bg-[#1c1633]/60" />
              <span className="h-1.5 w-full rounded-full bg-[#1c1633]/15" />
              <span className="h-1.5 w-2/3 rounded-full bg-[#1c1633]/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// El mismo sitio en un teléfono (versión responsive)
function PhoneMockup() {
  return (
    <div className="w-[118px] rounded-[1.4rem] bg-[#140a33] p-1.5 shadow-2xl shadow-black/50 ring-1 ring-white/15">
      <div className="rounded-[1.05rem] bg-white overflow-hidden p-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Block order={1} className="h-3.5 w-3.5 rounded bg-[#7b42f5]" />
          <Block order={1.5} className="h-1.5 w-5 rounded-full bg-[#1c1633]/40" />
        </div>
        <div className="wf-build aspect-[4/3] rounded-lg bg-gradient-to-br from-[#9d6bff] via-[#7b42f5] to-[#12b5d6]" style={{ '--d': '0.5s' }} />
        <Block order={3.5} className="h-2 w-11/12 rounded-full bg-[#1c1633]" />
        <Block order={4} className="h-2 w-2/3 rounded-full bg-[#7b42f5]" />
        <Block order={4.5} className="h-1 w-full rounded-full bg-[#1c1633]/20" />
        <Block order={5} className="h-1 w-3/4 rounded-full bg-[#1c1633]/20" />
        <Block order={5.8} className="mt-0.5 h-4 w-full rounded-md bg-[#ff8a1f]" />
        {[6.5, 7].map((o) => (
          <Block key={o} order={o} className="h-7 w-full rounded-md bg-[#f7f5fd] ring-1 ring-[#ddd7ee]" />
        ))}
      </div>
    </div>
  )
}

// Ilustración: el sitio se va maquetando en escritorio y en teléfono
function WebsiteMockup() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-lg mx-auto select-none pb-6 sm:pb-10 sm:pr-10">
      <div className="-rotate-1 animate-float motion-reduce:animate-none [animation-duration:9s]">
        <DesktopMockup />
      </div>
      <div className="hidden sm:block absolute right-0 bottom-0 rotate-3 animate-float motion-reduce:animate-none [animation-delay:-4s]">
        <PhoneMockup />
      </div>
      <div className="absolute -bottom-1 left-4 sm:left-6 flex items-center gap-2 rounded-xl bg-white text-[#1c1633] px-3.5 py-2.5 shadow-xl animate-bob motion-reduce:animate-none [animation-duration:5s]">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#28c840] text-white">
          <Icon name="check" className="text-base" />
        </span>
        <span className="text-xs font-bold">Diseño 100% a medida</span>
      </div>
    </div>
  )
}

export default function CtaBand({ onSelectService }) {
  return (
    // `band`: sección oscura también en el tema claro, con el mismo fondo animado del hero
    <section className="band relative overflow-hidden w-full py-20 bg-gradient-to-b from-surface via-surface-container-lowest to-surface dark:bg-none">
      <AnimatedBackdrop className="dark:hidden" />
      <div className="relative container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-container via-inverse-primary to-surface-container-lowest shadow-2xl shadow-primary-container/30 ring-1 ring-white/10">
          {/* Decoración de fondo */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-container/40 blur-3xl animate-drift motion-reduce:animate-none" />
            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-tertiary-container/25 blur-3xl animate-drift-slow motion-reduce:animate-none" />
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgb(255_255_255/0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_right,transparent,#000_60%)]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center p-8 sm:p-12 lg:p-14">
            <div className="flex flex-col gap-6">
              <span className="self-start inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3.5 py-1.5 text-white eyebrow">
                <Icon name="all_inclusive" className="text-base text-tertiary-fixed-dim" />
                No estamos limitados
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-white tracking-tight">
                ¿Necesitas algo distinto?
                <br />
                Creamos soluciones{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb27a] to-[#ff8a1f]">a medida.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-white/80 max-w-xl">
                No estamos atados a planes. Desarrollamos cualquier tipo de aplicación web: plataformas, portales, sistemas
                internos, integraciones o esa idea que aún no existe. Si se puede hacer en la web, lo construimos para tu negocio.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-tertiary-container text-white font-label-md text-label-md whitespace-nowrap uppercase tracking-wider font-extrabold shadow-xl shadow-black/20 hover:brightness-110 hover:scale-[1.03] transition-all duration-300"
                  href="#contactar"
                  onClick={(e) => {
                    // Lleva al formulario con "Desarrollo web a medida" ya seleccionado
                    e.preventDefault()
                    onSelectService('Desarrollo web a medida')
                  }}
                >
                  <span>Hablemos de tu proyecto</span>
                  <Icon name="rocket_launch" className="text-lg" />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 whitespace-nowrap rounded-xl text-white font-label-md text-label-md ring-1 ring-white/30 hover:bg-white/10 transition-colors"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="chat" className="text-lg" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <WebsiteMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
