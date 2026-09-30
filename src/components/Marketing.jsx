import AnimatedBackdrop from './AnimatedBackdrop.jsx'
import Icon from './Icon.jsx'

const svgProps = { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', 'aria-hidden': true }
const pathProps = { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }

const services = [
  {
    title: 'SEO',
    text: 'Posicionamiento orgánico para aumentar tu visibilidad en Google.',
    iconBg: 'bg-tertiary-container/30 text-tertiary',
    path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7',
  },
  {
    title: 'Google Ads',
    text: 'Campañas publicitarias enfocadas en atraer clientes potenciales con intención de compra.',
    iconBg: 'bg-tertiary-container/30 text-tertiary',
    path: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122',
  },
  {
    title: 'Meta Ads',
    text: 'Publicidad en Facebook e Instagram orientada a alcance y conversión segmentada.',
    iconBg: 'bg-tertiary-container/30 text-tertiary',
    path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Email Marketing',
    text: 'Automatización y envío de correos para fidelizar, retener y vender más.',
    iconBg: 'bg-tertiary-container/30 text-tertiary',
    path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    title: 'Redes Sociales',
    text: 'Diseño y creación de contenido para fortalecer tu presencia y comunidad digital.',
    iconBg: 'bg-tertiary-container/30 text-tertiary',
    path: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11',
  },
]

export default function Marketing({ onSelectService }) {
  return (
    <section className="band w-full py-20 bg-surface-container-lowest dark:bg-transparent relative overflow-hidden" id="marketing">
      <AnimatedBackdrop className="dark:hidden" />
      <div className="relative container-page flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl flex flex-col gap-3">
            <span className="eyebrow text-primary">Más que sitios web</span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface tracking-tight">
              Impulsamos tu crecimiento con estrategias digitales enfocadas en resultados.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Construir el sitio es solo el inicio. Diseñamos sistemas integrales de adquisición para que tu negocio reciba
              cotizaciones y ventas continuas.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-tertiary-container text-white font-label-md text-label-md uppercase tracking-wider font-bold shadow-xl shadow-tertiary-container/25 hover:scale-105 transition-all self-start lg:self-auto"
            href="#contactar"
            onClick={(e) => {
              // Lleva al formulario con "Estrategia de Marketing Digital" ya seleccionado
              e.preventDefault()
              onSelectService('Marketing Digital')
            }}
          >
            <span>Evaluar estrategia</span>
            <Icon name="trending_up" className="text-lg" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-all duration-300 hover:-translate-y-2 flex flex-col shadow-md"
            >
              <div className="flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${s.iconBg}`}>
                  <svg {...svgProps}>
                    <path d={s.path} {...pathProps} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">{s.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
