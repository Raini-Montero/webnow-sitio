# webnow — sitio web de la agencia

Landing de una sola página para webnow (agencia de desarrollo web y marketing digital, Santiago de Chile).
Todo el contenido y la comunicación con la dueña del proyecto es en **español**.

## Stack

- React 19 + Vite + Tailwind CSS 3 (`src/`)
- API mínima en Express para el formulario de contacto (`server/index.js`, puerto 3001; Vite la redirige en `/api`)
- `npm run dev` levanta el sitio (http://localhost:5173) y la API juntos
- `npm run build` genera `dist/`; `npm start` sirve `dist/` + la API en producción

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Textos, precios y planes, proyectos, logos de clientes, reels y feeds de Instagram, equipo, pasos del proceso, preguntas frecuentes, contacto y redes | `src/data/site.js` (casi todo el contenido está aquí) |
| Paletas de color (tema claro, oscuro y franjas moradas `.band`) | `src/theme.css` |
| Tipografías, tamaños y animaciones (keyframes) | `tailwind.config.js` — **al cambiarlo hay que reiniciar `npm run dev`**, Tailwind no lo recarga solo |
| Efectos globales (fondo animado, maquetado animado, marquesina de logos) | `src/index.css` |
| Metadatos SEO, Open Graph y datos de negocio local (JSON-LD) | `index.html` |
| Imágenes y videos | `public/` (`portfolio/`, `clients/`, `social/`, `social/feeds/`, `team/`) |

## Convenciones y decisiones ya tomadas

- **Temas**: claro por defecto, oscuro con el botón ☀/🌙 (clase `dark` en `<html>`, se guarda en `localStorage`).
  En oscuro hay un solo fondo animado fijo (`<AnimatedBackdrop fixed>` en `App.jsx`) y las secciones son transparentes.
- **Franjas moradas**: la clase `band` aplica la paleta morada también en tema claro (hero, banda "a medida", marketing, footer).
- **Color principal**: morado del logo `#7b42f5`. Naranja (`tertiary-container`) para botones de acción secundarios.
- **Botones que preseleccionan el servicio del formulario**: `handleSelectPlan` en `App.jsx`
  ("Solicitar plan" → el plan, "Hablemos de tu proyecto" → Desarrollo web a medida, "Evaluar estrategia" → Marketing Digital).
  El campo "Servicio de interés" es opcional.
- **Carruseles en móvil** (proceso y proyectos): hook compartido `src/lib/useCarousel.js` (arrastre + avance automático).
- **Capturas que se deslizan al hover** (sitios web y feeds): componente `ScrollingShot` en `Portfolio.jsx`.
- Accesibilidad: respetar `prefers-reduced-motion` en toda animación nueva.
- **Google Tag Manager**: contenedor `GTM-TBLWRPTV` (el mismo del sitio anterior en WordPress), incrustado en `index.html`
  (script en `<head>` + `noscript` al inicio de `<body>`). No quitarlo. Eventos de conversión en `src/lib/analytics.js`:
  `generate_lead` (formulario enviado, con `servicio`), `whatsapp_click`, `phone_click`, `email_click` (con `ubicacion`).
- **Puertos en desarrollo**: la API usa `--port=3001` (en los scripts de `package.json`) para no chocar con el `PORT`
  que definen otras herramientas; en producción usa la variable `PORT` del hosting y sirve `dist/` + `/api` juntos.

## Pendientes conocidos

- Formulario: hoy guarda los mensajes en `server/data/leads.jsonl`; falta configurar el envío por correo (variables `SMTP_*` en `.env`, ver `.env.example`).
- Preguntas frecuentes: confirmar la respuesta de **formas de pago** (marcada `CONFIRMAR` en `site.js`).
- Política de privacidad (el formulario recoge datos personales).
- Medición: GTM ya envía los eventos; falta configurar en GTM las etiquetas (GA4, Ads, Pixel de Meta) que los usen.

## Al hacer cambios

1. Editar y revisar en `npm run dev` (probar escritorio y móvil, tema claro y oscuro).
2. Verificar que `npm run build` compila sin errores.
3. Hacer commit en Git con un mensaje descriptivo en español y subirlo (el hosting publica desde el repositorio).
