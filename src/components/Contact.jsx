import Icon from './Icon.jsx'
import SectionHeading from './SectionHeading.jsx'
import ContactForm from './ContactForm.jsx'
import { contact, whatsappUrl } from '../data/site.js'

const cards = [
  {
    href: `mailto:${contact.email}`,
    icon: 'mail',
    iconBg: 'bg-primary-container/20 text-primary',
    hover: 'group-hover:text-primary',
    label: 'Correo Electrónico',
    title: contact.email,
    text: 'Respuesta comercial garantizada en el día.',
  },
  {
    href: contact.phoneHref,
    icon: 'call',
    iconBg: 'bg-secondary-container/20 text-secondary',
    hover: 'group-hover:text-secondary',
    label: 'Atención Telefónica',
    title: contact.phoneDisplay,
    text: contact.hours,
  },
  {
    href: contact.mapsUrl,
    external: true,
    icon: 'location_on',
    iconBg: 'bg-tertiary-container/30 text-tertiary',
    hover: 'group-hover:text-tertiary',
    label: 'Oficina Central',
    title: contact.officeTitle,
    text: contact.officeAddress,
  },
]

export default function Contact({ selectedService, onServiceChange }) {
  return (
    <section className="w-full py-20 bg-surface-container-lowest dark:bg-transparent relative" id="contactar">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          eyebrow="Contáctanos"
          title="Estamos aquí para ayudarte"
          text="Envíanos tu mensaje o contáctanos por correo o teléfono. Te responderemos cuanto antes con una propuesta clara."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="card-edge lg:col-span-7 bg-surface-container p-6 sm:p-10 rounded-2xl shadow-xl">
            <ContactForm selectedService={selectedService} onServiceChange={onServiceChange} />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            {cards.map((c) => (
              <a
                key={c.label}
                className="card-edge p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-all flex items-start gap-4 shadow-md group"
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${c.iconBg}`}>
                  <Icon name={c.icon} className="text-2xl" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold">{c.label}</span>
                  <span className={`font-title-md text-title-md font-bold text-on-surface transition-colors mt-0.5 break-words ${c.hover}`}>{c.title}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">{c.text}</span>
                </div>
              </a>
            ))}

            <div className="card-edge p-6 rounded-2xl bg-gradient-to-br from-emerald-50 dark:from-emerald-950/40 via-surface-container to-surface-container flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-label-sm text-label-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>Canal Directo Inmediato</span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface">¿Prefieres chatear por WhatsApp?</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Conéctate directamente con un asesor para cotizar en minutos.</p>
              <a
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-label-md text-label-md font-semibold transition-all mt-1"
                href={whatsappUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name="chat" className="text-lg" />
                <span>Abrir WhatsApp directo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
