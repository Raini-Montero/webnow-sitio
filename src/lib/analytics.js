// Eventos de conversión para Google Tag Manager (contenedor GTM-TBLWRPTV, cargado en index.html).
// Cada evento se envía al dataLayer; en GTM se crean activadores de "Evento personalizado" con estos nombres:
//   - generate_lead      → envío exitoso del formulario de contacto (incluye `servicio`)
//   - whatsapp_click     → clic en cualquier enlace a WhatsApp (incluye `ubicacion`)
//   - phone_click        → clic en el teléfono
//   - email_click        → clic en el correo

export function track(event, params = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

// Sección de la página donde ocurrió el clic (id de la sección, o "header"/"footer"/"widget")
function locationOf(el) {
  if (el.closest('header')) return 'header'
  if (el.closest('footer')) return 'footer'
  const section = el.closest('section[id]')
  if (section) return section.id
  if (el.closest('section')) return 'hero'
  return 'widget'
}

// Un solo listener para todos los enlaces del sitio: detecta WhatsApp, teléfono y correo
export function setupLinkTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target.closest?.('a[href]')
      if (!link) return
      const href = link.getAttribute('href')
      const ubicacion = locationOf(link)
      if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) track('whatsapp_click', { ubicacion })
      else if (href.startsWith('tel:')) track('phone_click', { ubicacion })
      else if (href.startsWith('mailto:')) track('email_click', { ubicacion })
    },
    { capture: true },
  )
}
