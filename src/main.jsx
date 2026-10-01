import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { setupLinkTracking } from './lib/analytics.js'
// Fuentes servidas desde el propio sitio (más rápido que Google Fonts): solo los pesos usados y caracteres latinos
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'
import './index.css'

// Eventos de clic en WhatsApp, teléfono y correo para Google Tag Manager
setupLinkTracking()

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// En producción el HTML viene prerenderizado (scripts/prerender.mjs): React solo lo "hidrata".
// En desarrollo el contenedor llega vacío y se renderiza normalmente.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
