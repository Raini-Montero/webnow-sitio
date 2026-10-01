// Prerenderizado: se ejecuta después del build (npm run build).
// 1. Genera el HTML de la página con React (src/entry-server.jsx) y lo inserta en dist/index.html,
//    para que el contenido se vea sin esperar el JavaScript (mejor FCP/LCP en PageSpeed).
// 2. Incrusta el CSS (pequeño) en el HTML para no bloquear la primera pintura con otra descarga.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = path.resolve('dist')
const SSR_DIR = path.resolve('dist-ssr')

const { render } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href)
const appHtml = render()

let html = readFileSync(path.join(DIST, 'index.html'), 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('No se encontró <div id="root"></div> en dist/index.html')
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

// Incrustar la hoja de estilos principal
html = html.replace(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/, (_m, href) => {
  const css = readFileSync(path.join(DIST, href), 'utf8')
  return `<style>${css}</style>`
})

writeFileSync(path.join(DIST, 'index.html'), html)
rmSync(SSR_DIR, { recursive: true, force: true })
console.log(`Prerenderizado listo (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB de HTML)`)
