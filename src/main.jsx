import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { setupLinkTracking } from './lib/analytics.js'
import './index.css'

// Eventos de clic en WhatsApp, teléfono y correo para Google Tag Manager
setupLinkTracking()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
