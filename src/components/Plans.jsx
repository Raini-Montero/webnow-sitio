import { useState } from 'react'
import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import { plans } from '../data/site.js'

// Ítems visibles antes de "Ver todo lo que incluye"
const VISIBLE_FEATURES = 6

function PlanCard({ plan, onSelect }) {
  const [expanded, setExpanded] = useState(false)
  const featured = plan.featured
  const check = featured ? 'text-primary' : 'text-secondary'

  return (
    <div
      className={
        featured
          ? 'relative flex flex-col justify-between p-8 rounded-2xl bg-white ring-2 ring-primary-container/40 dark:ring-0 dark:bg-surface-container-high shadow-2xl shadow-primary-container/20 lg:-translate-y-2 hover:-translate-y-3 transition-all duration-300 mt-4 lg:mt-0'
          : 'card-edge flex flex-col justify-between p-8 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 hover:-translate-y-1 shadow-md'
      }
    >
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-sm text-label-sm uppercase tracking-wider font-extrabold shadow-md">
          Más popular
        </div>
      )}
      <div className={`flex flex-col gap-5 ${featured ? 'pt-2' : ''}`}>
        <div>
          <h3 className={`font-headline-sm text-headline-sm font-bold ${featured ? 'text-primary' : 'text-on-surface'}`}>{plan.name}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{plan.description}</p>
          <span
            className="mt-3 inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 rounded-full bg-secondary-container/15 text-secondary font-label-sm text-label-sm"
            title="Tiempo de entrega"
          >
            <Icon name="schedule" className="text-base" />
            <span className="sr-only">Entrega en </span>
            {plan.delivery}
          </span>
        </div>
        <div className="py-2">
          <div className="flex items-baseline gap-1 flex-wrap">
            {plan.fromPrice && <span className="font-label-md text-label-md text-secondary font-bold">Desde</span>}
            <span className="font-display-mobile text-display-mobile font-extrabold text-on-surface">{plan.price}</span>
          </div>
          <p className={`font-label-sm text-label-sm mt-0.5 ${featured ? 'text-primary' : 'text-outline'}`}>CLP · IVA incluido · pago único</p>
        </div>
        <ul className={`flex flex-col gap-3 font-body-sm text-body-sm ${featured ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          {(expanded ? plan.features : plan.features.slice(0, VISIBLE_FEATURES)).map((f) => {
            // Un ítem puede ser texto o { text, excluded } para lo que el plan NO incluye
            const text = typeof f === 'string' ? f : f.text
            const excluded = typeof f === 'object' && f.excluded
            return (
              <li key={text} className={`flex items-start gap-2.5 ${excluded ? 'text-outline' : ''}`}>
                <Icon name={excluded ? 'block' : 'check_circle'} className={`${excluded ? 'text-outline' : check} text-lg`} />
                <span>{text}</span>
              </li>
            )
          })}
        </ul>
        <button
          className="inline-flex items-center gap-1.5 text-secondary font-label-sm text-label-sm hover:underline cursor-pointer self-start"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          type="button"
        >
          <span>{expanded ? 'Ver menos detalles' : 'Ver todo lo que incluye'}</span>
          <Icon name={expanded ? 'expand_less' : 'expand_more'} className="text-base" />
        </button>
      </div>
      <div className="pt-6">
        <button
          className={
            featured
              ? 'w-full py-3.5 px-5 rounded-xl bg-primary-container hover:bg-primary hover:text-on-primary text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold shadow-lg shadow-primary-container/25 transition-all'
              : 'w-full py-3 px-5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all duration-300 hover:bg-primary-container hover:text-on-primary-container hover:shadow-lg hover:shadow-primary-container/25'
          }
          onClick={() => onSelect(plan.name)}
          type="button"
        >
          Solicitar plan
        </button>
      </div>
    </div>
  )
}

export default function Plans({ onSelectPlan }) {
  return (
    <section className="w-full py-20 bg-surface-container-lowest dark:bg-transparent relative" id="desarrollo">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          eyebrow="Soluciones que se adaptan a ti"
          title="Nuestros planes de desarrollo web"
          text="Transparencia absoluta y valor real. Escoge la solución óptima para tu etapa comercial sin costos ocultos."
        />
        {/* 3 planes: una columna centrada en móvil y tablet; 3 columnas anchas desde escritorio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start w-full max-w-md lg:max-w-6xl mx-auto">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} onSelect={onSelectPlan} />
          ))}
        </div>
      </div>
    </section>
  )
}
