import { useState } from 'react'
import Icon from './Icon.jsx'
import { faqs, whatsappUrl } from '../data/site.js'

// Datos estructurados para que Google pueda mostrar las preguntas en los resultados de búsqueda
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

function FaqItem({ item, index, open, onToggle }) {
  const buttonId = `faq-q-${index}`
  const panelId = `faq-a-${index}`
  return (
    <li className={`card-edge rounded-2xl bg-surface-container transition-colors duration-300 ${open ? 'bg-surface-container-high' : 'hover:bg-surface-container-high'}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 sm:px-6 py-5 text-left font-title-md text-[1.05rem] leading-snug font-semibold text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {item.q}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              open ? 'rotate-45 bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-primary'
            }`}
          >
            <Icon name="add" className="text-xl" />
          </span>
        </button>
      </h3>
      {/* La respuesta se despliega animando la altura con grid (0fr → 1fr) */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 -mt-1 font-body-md text-body-md text-on-surface-variant">{item.a}</p>
        </div>
      </div>
    </li>
  )
}

export default function Faq() {
  // La primera pregunta parte abierta; se puede tener una abierta a la vez
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="preguntas" className="w-full py-20 bg-surface dark:bg-transparent">
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28 self-start">
          <span className="eyebrow text-primary">Preguntas frecuentes</span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface tracking-tight">
            Resolvemos tus dudas
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Todo lo que necesitas saber antes de comenzar tu proyecto con nosotros.
          </p>

          <div className="card-edge mt-2 rounded-2xl bg-surface-container p-6 flex flex-col gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
              <Icon name="support_agent" className="text-2xl" />
            </span>
            <p className="font-title-md text-title-md font-bold text-on-surface">¿No encuentras tu respuesta?</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Escríbenos y te respondemos en minutos.</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-white font-label-md text-label-md transition-colors"
              >
                <Icon name="chat" className="text-lg" />
                WhatsApp
              </a>
              <a
                href="#contactar"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-label-md text-label-md text-primary ring-1 ring-inset ring-primary/40 hover:bg-primary-container/10 transition-colors"
              >
                Enviar mensaje
              </a>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-8 flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </ul>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  )
}
