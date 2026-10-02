// Contenido editable del sitio. Cambia aquí textos, precios, proyectos y datos de contacto.

export const contact = {
  email: 'contacto@webnow.cl',
  phoneDisplay: '+56 9 3351 8613',
  phoneHref: 'tel:+56933518613',
  whatsappNumber: '56933518613',
  whatsappText: 'Hola webnow, deseo cotizar un proyecto web.',
  hours: 'Lunes a Viernes de 09:00 a 19:00 hrs.',
  officeTitle: 'La Florida, Santiago',
  officeAddress: 'Vicuña Mackenna Poniente 6843 Of 206, Región Metropolitana, Chile.',
  mapsUrl: 'https://maps.app.goo.gl/LW5xtJVRsrAt5JuAA',
}

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/company/webnowchile',
  facebook: 'https://www.facebook.com/webnowchile',
  instagram: 'https://www.instagram.com/webnowchile/',
}

export const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappText)}`

export const navLinks = [
  { id: 'desarrollo', label: 'Desarrollo' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'equipo', label: 'Equipo' },
  { id: 'preguntas', label: 'Preguntas' },
  { id: 'contactar', label: 'Contactar' },
]

// Información oficial de los planes. En la tarjeta se muestran los primeros ítems de `features`
// y el resto aparece con "Ver todo lo que incluye".
// Un ítem puede ser texto o { text, excluded: true } para indicar algo que el plan NO incluye.
export const plans = [
  {
    name: 'One Page Básica',
    description: 'Página única para presentar tu negocio de forma impactante',
    price: '$149.990',
    delivery: '2 días hábiles',
    features: [
      'Hosting y dominio (1 año)',
      'Cuentas de correo ilimitadas',
      'Página única informativa',
      'Diseño personalizado',
      'Adaptado a móviles',
      { text: 'No autoadministrable', excluded: true },
      '4 secciones de contenido',
      'Formulario de contacto',
      'Botón de WhatsApp',
      'Mapa de ubicación Google',
      'SEO básico',
      '1 ronda de revisión',
      'Certificado SSL',
    ],
  },
  {
    name: 'Sitio Esencial',
    description: 'Presencia digital profesional para tu empresa o marca',
    price: '$399.990',
    delivery: '10 a 15 días hábiles',
    featured: true,
    features: [
      'Hosting y dominio (1 año)',
      'Cuentas de correo ilimitadas',
      'Hasta 4 páginas de contenido',
      'Diseño personalizado',
      'Diseño de 2 banners rotativos',
      'Adaptado a móviles',
      'Panel de administración',
      'Formulario de contacto',
      'Botón de WhatsApp',
      'Mapa de ubicación Google',
      'SEO básico',
      '2 rondas de revisión',
      'Certificado SSL',
    ],
  },
  {
    name: 'Ecommerce',
    description: 'Tu tienda online lista para comenzar a vender',
    price: '$699.990',
    fromPrice: true,
    delivery: '15 a 30 días hábiles',
    features: [
      'Hosting y dominio (1 año)',
      'Cuentas de correo ilimitadas',
      'Hasta 5 páginas de contenido',
      'Diseño personalizado',
      'Adaptado a móviles',
      'Panel de administración',
      'Carrito de compras',
      'Integración de 1 método de pago',
      'Integración de 1 courier de despacho',
      'Carga inicial de hasta 200 productos por planilla Excel',
      'Puedes seguir agregando productos desde el panel',
      'Formulario de contacto',
      'Botón de WhatsApp',
      'Mapa de ubicación Google',
      'SEO básico',
      '3 rondas de revisión',
      'Certificado SSL',
    ],
  },
]

// Opciones del selector "Servicio de interés" del formulario (opcional). "Desarrollo web a medida" va primero.
export const serviceOptions = [
  { value: 'Desarrollo web a medida', label: 'Desarrollo web a medida' },
  ...plans.map((p) => ({ value: p.name, label: `${p.name} (${p.fromPrice ? 'Desde ' : ''}${p.price})` })),
  { value: 'Marketing Digital', label: 'Estrategia de Marketing Digital' },
]

// `image`: captura de página completa en public/portfolio/ (600px de ancho, alto libre).
// Al pasar el mouse se desliza hacia arriba mostrando todo el sitio. Sin `image` se muestra una tarjeta gráfica.
export const projects = [
  { name: 'Homar.cl', url: 'https://homar.cl/', domain: 'homar.cl', type: 'shop', image: '/portfolio/homar.webp' },
  { name: 'Brelex.cl', url: 'https://brelex.cl/', domain: 'brelex.cl', type: 'corp', image: '/portfolio/brelex.webp' },
  { name: 'Importaciones Ringer', url: 'https://www.importacionesringer.com/', domain: 'importacionesringer.com', type: 'shop', image: '/portfolio/ringer.webp' },
  { name: 'Babycampoo', url: 'https://babycampoo.com/', domain: 'babycampoo.com', type: 'shop', image: '/portfolio/babycampoo.webp' },
  { name: 'Formula 7', url: 'https://www.formula7.cl/', domain: 'formula7.cl', type: 'corp', image: '/portfolio/formula7.webp' },
  { name: 'Tempux.cl', url: 'https://tempux.cl/', domain: 'tempux.cl', type: 'shop', image: '/portfolio/tempux.webp' },
  { name: 'Alimentos Homar', url: 'https://www.alimentoshomar.cl/', domain: 'alimentoshomar.cl', type: 'shop', image: '/portfolio/alimentos-homar.webp' },
  { name: 'Scorpion Motors', url: 'https://scorpionmotors.cl/', domain: 'scorpionmotors.cl', type: 'corp', image: '/portfolio/scorpion-motors.webp' },
  { name: 'Technology Latam', url: 'https://technologylatam.com/', domain: 'technologylatam.com', type: 'corp', image: '/portfolio/technology-latam.webp' },
  { name: 'Premium Paper', url: 'https://premiumpaper.cl/', domain: 'premiumpaper.cl', type: 'shop', image: '/portfolio/premium-paper.webp' },
]

// Franja de logos de clientes (en este orden). PNG con fondo transparente en public/clients/
export const clientLogos = [
  { name: 'Homar', logo: '/clients/homar.png' },
  { name: 'Technology Solutions', logo: '/clients/technology-solutions.png' },
  { name: 'Tempux', logo: '/clients/tempux.png' },
  { name: 'Homar Alimentos', logo: '/clients/homar-alimentos.png' },
  { name: 'Fórmula 7', logo: '/clients/formula-7.png' },
  { name: 'Importaciones Ringer', logo: '/clients/importaciones-ringer.png' },
  { name: 'Brelex', logo: '/clients/brelex.png' },
  { name: 'Babycampoo', logo: '/clients/baby-campoo.png' },
  { name: 'Scorpion Motors', logo: '/clients/scorpion-motors.png' },
  // Imagen con poco margen interno (86x56): se muestra algo más baja para igualar el tamaño visual de las demás
  { name: 'Construcciones JM', logo: '/clients/construcciones-jm.png', size: 'h-12' },
]

// Pestaña "Redes sociales" del portafolio: reels verticales (1080x1920, MP4) en public/social/.
// Para agregar uno: copiar el .mp4 a public/social/ (idealmente < 10 MB) y sumar una línea aquí.
export const socialPosts = [
  { video: '/social/torku-4x4.mp4', title: '4x4 Torku' },
  { video: '/social/atun-homar.mp4', title: 'Atún Homar' },
  { video: '/social/aloe-vera.mp4', title: 'Aloe vera' },
  { video: '/social/fideos-don-homar.mp4', title: 'Fideos Don Homar' },
  { video: '/social/mate-zaino.mp4', title: 'Mate Zaino' },
  { video: '/social/yerbas-mate.mp4', title: 'Yerbas mate' },
]

// Preguntas frecuentes (sección antes de Contacto). También se publican como datos estructurados para Google.
// TODO: confirmar la respuesta marcada con "CONFIRMAR" antes de publicar.
export const faqs = [
  {
    q: '¿Cuánto tiempo demora el desarrollo de mi sitio?',
    a: 'Depende del plan: una One Page Básica está lista en 2 días hábiles, un Sitio Esencial en 10 a 15 y un Ecommerce en 15 a 30 días hábiles. Los plazos corren desde que tenemos el contenido (textos, logo e imágenes).',
  },
  {
    q: '¿Qué incluye el precio? ¿Hay costos ocultos?',
    a: 'No hay costos ocultos. Todos los precios son pago único e incluyen IVA. Cada plan incluye hosting y dominio por 1 año, cuentas de correo ilimitadas, certificado SSL y diseño personalizado adaptado a móviles. El Sitio Esencial y el Ecommerce incluyen además panel de administración.',
  },
  {
    q: '¿Qué pasa después del primer año?',
    a: 'Tu sitio es tuyo: el desarrollo se paga una sola vez. Desde el segundo año solo debes renovar el hosting y el dominio para que tu sitio siga en línea. Te avisamos con anticipación y te informamos el valor de la renovación, sin sorpresas.',
  },
  {
    q: '¿Podré editar mi sitio yo mismo?',
    a: 'En el Sitio Esencial y el Ecommerce, sí: incluyen un panel de administración para que actualices textos, imágenes, productos o precios sin depender de nosotros. La One Page Básica no es autoadministrable, así que los cambios se nos solicitan a nosotros. Si prefieres no preocuparte, también podemos encargarnos de la administración como servicio adicional.',
  },
  {
    q: '¿Qué necesito para empezar?',
    a: 'Solo una reunión gratuita de 30 minutos para conocer tu proyecto; en 48 horas te enviamos la propuesta. Para el desarrollo necesitaremos tu logo, los textos de tu negocio, fotos de tus productos o servicios y tus datos de contacto. Si aún no tienes todo, te orientamos sobre qué preparar.',
  },
  {
    q: '¿Cuántas revisiones puedo pedir?',
    a: 'La One Page Básica incluye 1 ronda de revisión, el Sitio Esencial 2 y el Ecommerce 3. En cada ronda revisas el avance y nos indicas los cambios que quieres.',
  },
  {
    // CONFIRMAR: medios de pago y si hay cuotas o abono inicial
    q: '¿Cuáles son las formas de pago?',
    a: 'Te detallamos las formas de pago junto con la propuesta de tu proyecto. Escríbenos y resolvemos cualquier duda antes de comenzar.',
  },
  {
    q: '¿Y si necesito algo que no está en los planes?',
    a: 'No estamos atados a planes: desarrollamos aplicaciones web a medida, integraciones con sistemas como ERP o facturación, y funcionalidades especiales. Cuéntanos tu idea y te preparamos una propuesta.',
  },
  {
    q: '¿Me ayudan después de publicar el sitio?',
    a: 'Sí. Todos los proyectos incluyen 30 días de soporte después de publicar. Si quieres, después podemos seguir contigo con soporte técnico, administración del sitio o marketing digital; son servicios opcionales que se contratan aparte.',
  },
]

// Feeds de Instagram (debajo de los reels, pestaña "Redes sociales"): capturas largas del perfil en public/social/feeds/
// (600 px de ancho). Al pasar el mouse la captura se desliza, igual que los sitios web.
export const instagramFeeds = [
  { name: 'Importadora Homar', handle: 'importadorahomar', image: '/social/feeds/importadora-homar.webp' },
  { name: 'Alimentos Homar', handle: 'alimentoshomar', image: '/social/feeds/alimentos-homar.webp' },
  { name: 'Premium Paper', handle: 'premiumpaper', image: '/social/feeds/premium-paper.webp' },
  { name: 'Tempux', handle: 'tempux.cl', image: '/social/feeds/tempux.webp' },
]

// Fotos en public/team/ (370x441)
export const team = [
  { name: 'Gioselym Romero', role: 'Consultora UX/UI - Marketing Digital', photo: '/team/gioselym-romero.webp', linkedin: 'https://www.linkedin.com/in/gioselymromero/' },
  { name: 'Raini Montero', role: 'Desarrollador web | SEO - SEM', photo: '/team/raini-montero.webp', linkedin: 'https://www.linkedin.com/in/raini-montero-a8403540/' },
  { name: 'William Larreal', role: 'Diseñador gráfico', photo: '/team/william-larreal.webp', linkedin: 'https://www.linkedin.com/in/william-ricardo-larreal-montero-267962124/' },
  { name: 'Edwin Castillo', role: 'Desarrollador web', photo: '/team/edwin-castillo.webp', linkedin: 'https://www.linkedin.com/in/edwin-castillo-64b910126/' },
]

// Pasos de "Así llevamos tu proyecto a la realidad" (sección después de los planes).
// `badge` es el compromiso concreto de cada paso; cada tarjeta con su color e ícono (Material Symbols).
// `darkText` usa texto oscuro en tarjetas de color claro.
export const methodology = [
  {
    title: 'Conversamos',
    badge: 'Gratis · 30 min',
    icon: 'forum',
    color: 'from-[#a064ff] to-[#6d28d9] shadow-[#7c3aed]/35',
    text: 'Una reunión gratuita de 30 minutos para conocer tu negocio, tus metas y lo que esperas lograr con tu sitio.',
  },
  {
    title: 'Proponemos',
    badge: 'En 48 horas',
    icon: 'design_services',
    color: 'from-[#3b8bff] to-[#1d4ed8] shadow-[#2563eb]/35',
    text: 'En 48 horas te enviamos una propuesta visual y un presupuesto claro, sin costos ocultos.',
  },
  {
    title: 'Creamos tu sitio',
    badge: '2 a 30 días hábiles',
    icon: 'code_blocks',
    color: 'from-[#22c55e] to-[#15803d] shadow-[#16a34a]/35',
    text: 'Desarrollamos tu web con rondas de revisión incluidas. Los plazos dependen del plan que elijas.',
  },
  {
    title: 'Seguimos contigo',
    badge: '30 días de soporte',
    icon: 'campaign',
    color: 'from-[#ffd749] to-[#f56300] shadow-[#f56300]/35',
    text: 'Incluimos 30 días de soporte tras publicar. Si quieres seguir creciendo, sumamos administración o marketing como servicios opcionales.',
  },
]

export const images = {
  // Logo original para fondos claros y versión con 'web' en blanco para fondos oscuros
  logo: '/webnow-logo.webp',
  logoOnDark: '/webnow-logo-light.webp',
}
