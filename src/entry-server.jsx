// Entrada para el prerenderizado (ver scripts/prerender.mjs): genera el HTML de la página en el build,
// para que el contenido se vea apenas llega el HTML, sin esperar a que cargue el JavaScript.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
