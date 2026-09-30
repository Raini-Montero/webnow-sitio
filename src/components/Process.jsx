import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import useCarousel from '../lib/useCarousel.js'
import { methodology, whatsappUrl } from '../data/site.js'

// "¿Y cómo seguimos?": el proceso con compromisos concretos, justo después de los planes.
// En móvil las tarjetas son un carrusel horizontal que avanza solo y se puede arrastrar; desde tablet, una grilla.
export default function Process() {
  const { trackRef, trackProps } = useCarousel()

  return (
    <section id="proceso" className="w-full py-20 bg-surface dark:bg-transparent">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          eyebrow="¿Y cómo seguimos?"
          title="Así llevamos tu proyecto a la realidad"
          text="Un proceso claro, con tiempos comprometidos desde el primer contacto."
        />

        <ol
          ref={trackRef}
          {...trackProps}
          aria-label="Pasos del proceso"
          className="-mx-margin-mobile flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile py-3 scroll-px-margin-mobile cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:py-0 md:cursor-auto md:select-auto lg:grid-cols-4"
        >
          {methodology.map((step, i) => (
            <li
              key={step.title}
              className={`group relative flex w-[82%] shrink-0 snap-center flex-col items-center text-center p-7 pt-8 rounded-2xl bg-gradient-to-br ${step.color} ${
                step.darkText ? 'text-[#1c1633]' : 'text-white'
              } shadow-xl transition-all duration-300 md:w-auto md:hover:-translate-y-2 md:hover:shadow-2xl`}
            >
              <span
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                  step.darkText ? 'bg-white/40 ring-white/60' : 'bg-white/15 ring-white/25'
                }`}
              >
                <Icon name={step.icon} className="text-[34px]" />
              </span>
              <h3 className="font-title-md text-title-md font-bold">
                {i + 1}. {step.title}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1c1633] shadow-sm">
                <Icon name="check_circle" className="text-sm text-[#28a745]" />
                {step.badge}
              </span>
              <p className={`font-body-sm text-body-sm mt-3 ${step.darkText ? 'text-[#1c1633]/80' : 'text-white/90'}`}>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#contactar"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold shadow-xl shadow-primary-container/25 hover:scale-[1.03] transition-all duration-300"
            >
              <Icon name="event_available" className="text-lg" />
              Agenda tu reunión gratuita
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-label-md text-label-md text-on-surface ring-1 ring-inset ring-outline-variant hover:bg-surface-container-high transition-colors"
            >
              <Icon name="chat" className="text-lg text-emerald-600" />
              Escríbenos por WhatsApp
            </a>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Sin compromiso · Te respondemos en el día</p>
        </div>
      </div>
    </section>
  )
}
