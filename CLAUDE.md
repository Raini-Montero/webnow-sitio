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
- **Fuentes (rendimiento)**: Inter y Plus Jakarta Sans se sirven desde el sitio con `@fontsource` (importadas en
  `src/main.jsx`, solo pesos usados y subconjunto latino). No volver a cargarlas desde Google Fonts.
- **Íconos**: Material Symbols se sirve como fuente **recortada** `public/fonts/material-symbols-subset.woff2` (~5 KB) con
  solo los íconos usados. **Si se usa un ícono nuevo**, regenerarla: pedir a
  `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=<lista>&display=block`
  (lista separada por comas y en orden alfabético, con User-Agent de Chrome), descargar el woff2 de la URL que devuelve y
  reemplazar el archivo. Si no se regenera, el ícono nuevo aparece como texto.
- **Tag Manager se carga diferido** (tras el evento `load`) para mejorar el rendimiento; el `dataLayer` existe desde el inicio.
- **Caché** (en `server/index.js`): `/assets` 1 año inmutable, imágenes/videos/fuentes 7 días, HTML `no-cache`.
  El servidor además comprime las respuestas (`compression`).
- **Prerenderizado**: `npm run build` genera el HTML de la página en el build (`src/entry-server.jsx` +
  `scripts/prerender.mjs`) e incrusta el CSS; en el navegador React lo hidrata (`hydrateRoot` en `main.jsx`).
  Por eso **ningún componente puede usar `window`/`document`/`localStorage` al renderizar**: solo dentro de `useEffect`
  o de manejadores de eventos. Tras cambios, revisar la consola por errores de hidratación.
- Rendimiento medido con Lighthouse (local, versión de producción): móvil ~93, escritorio ~95.
- **Google Tag Manager**: contenedor `GTM-TBLWRPTV` (el mismo del sitio anterior en WordPress), incrustado en `index.html`
  (script en `<head>` + `noscript` al inicio de `<body>`). No quitarlo. Eventos de conversión en `src/lib/analytics.js`:
  `generate_lead` (formulario enviado, con `servicio`), `whatsapp_click`, `phone_click`, `email_click` (con `ubicacion`).
- **Puertos en desarrollo**: la API usa `--port=3001` (en los scripts de `package.json`) para no chocar con el `PORT`
  que definen otras herramientas; en producción usa la variable `PORT` del hosting y sirve `dist/` + `/api` juntos.

## Pendientes conocidos

- Preguntas frecuentes: confirmar la respuesta de **formas de pago** (marcada `CONFIRMAR` en `site.js`).
- Política de privacidad (el formulario recoge datos personales).
- Medición: GTM ya envía los eventos; falta configurar en GTM las etiquetas (GA4, Ads, Pixel de Meta) que los usen.

## Publicación (producción)

- En línea en **https://webnow.cl** (reemplazó al WordPress anterior, respaldado en `~/wordpress-respaldo` del hosting).
- Hosting con cPanel → **Setup Node.js App**: Node 22.23.3, modo Production, raíz `webnow-sitio` (en el home, fuera de
  `public_html`), URL `webnow.cl`, archivo de inicio `app.cjs`.
- Para publicar un cambio: `npm run deploy:zip` genera `webnow-deploy.zip`; se sube a `webnow-sitio` en el Administrador
  de archivos, se extrae **encima** (reemplazando), se borra el zip y se presiona "Reiniciar" en la app (y "Run NPM Install"
  solo si cambiaron las dependencias).
- **No borrar el contenido de `webnow-sitio` antes de extraer**: ahí viven `node_modules` (lo crea "Run NPM Install", no
  viene en el zip) y los mensajes guardados en `server/data/`. Si se borra, la app da 503 hasta volver a hacer
  "Run NPM Install" + "Reiniciar".
- El correo del formulario está configurado en "Environment variables" de la app (`CONTACT_TO`, `SMTP_*` con
  `contacto@webnow.cl` por `mail.webnow.cl`); esas variables no están en el repositorio.
- Aviso conocido de cPanel al hacer "Run NPM Install": "check availability of application has failed… content type
  text/html vs text/html; charset=utf-8". Es una falsa alarma; la instalación sí se completa.

## Al hacer cambios

1. Editar y revisar en `npm run dev` (probar escritorio y móvil, tema claro y oscuro).
2. Verificar que `npm run build` compila sin errores.
3. Hacer commit en Git con un mensaje descriptivo en español y subirlo (el hosting publica desde el repositorio).
