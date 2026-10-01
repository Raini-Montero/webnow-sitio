// API del formulario de contacto.
// - Valida los datos (misma validación que el navegador)
// - Guarda cada mensaje en server/data/leads.json
// - Si hay SMTP configurado en .env, envía el mensaje por correo
// En producción (tras `npm run build`) también sirve el sitio compilado desde /dist.
import 'dotenv/config'
import express from 'express'
import compression from 'compression'
import nodemailer from 'nodemailer'
import { appendFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateContact } from '../src/lib/validateContact.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.jsonl')
const DIST_DIR = path.join(__dirname, '..', 'dist')
// En desarrollo el puerto se fija con --port=3001 (así no choca con el PORT que otras herramientas definen para Vite).
// En producción (cPanel/Passenger) se usa la variable PORT que asigna el hosting.
const portArg = process.argv.find((a) => a.startsWith('--port='))
const PORT = Number(portArg?.split('=')[1]) || Number(process.env.PORT) || 3001

const mailer = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    })
  : null

// Límite simple por IP: 5 envíos cada 10 minutos
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_MAX
}

const app = express()
// Comprime HTML, JS, CSS y JSON (los videos e imágenes ya vienen comprimidos y se omiten solos)
app.use(compression())
app.use(express.json({ limit: '20kb' }))

app.post('/api/contact', async (req, res) => {
  const body = req.body || {}

  // Campo trampa: si viene relleno es un bot; respondemos OK sin hacer nada
  if (body.website) return res.json({ ok: true })

  if (rateLimited(req.ip)) {
    return res.status(429).json({ message: 'Demasiados envíos seguidos. Inténtalo de nuevo en unos minutos.' })
  }

  const errors = validateContact(body)
  if (Object.keys(errors).length) {
    return res.status(400).json({ message: 'Revisa los campos marcados.', errors })
  }

  const lead = {
    fecha: new Date().toISOString(),
    nombre: body.nombre.trim(),
    apellido: body.apellido.trim(),
    correo: body.correo.trim(),
    telefono: String(body.telefono || '').trim(),
    servicio: String(body.servicio || '').trim() || 'Sin especificar', // el servicio es opcional
    mensaje: body.mensaje.trim(),
  }

  try {
    await mkdir(DATA_DIR, { recursive: true })
    await appendFile(LEADS_FILE, JSON.stringify(lead) + '\n', 'utf8')
  } catch (err) {
    console.error('[contacto] No se pudo guardar el mensaje:', err)
    return res.status(500).json({ message: 'No pudimos guardar tu mensaje. Escríbenos por WhatsApp o correo.' })
  }

  if (mailer) {
    try {
      await mailer.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_TO,
        replyTo: lead.correo,
        subject: `Nuevo contacto web: ${lead.servicio} — ${lead.nombre} ${lead.apellido}`,
        text: [
          `Nombre: ${lead.nombre} ${lead.apellido}`,
          `Correo: ${lead.correo}`,
          `Teléfono: ${lead.telefono || '—'}`,
          `Servicio: ${lead.servicio}`,
          '',
          lead.mensaje,
        ].join('\n'),
      })
    } catch (err) {
      // El mensaje ya quedó guardado; solo lo registramos
      console.error('[contacto] Guardado, pero falló el envío de correo:', err.message)
    }
  }

  console.log(`[contacto] Nuevo mensaje de ${lead.nombre} ${lead.apellido} <${lead.correo}> — ${lead.servicio}`)
  res.json({ ok: true })
})

// Sitio compilado (solo si existe /dist)
// Caché del navegador:
//  - /assets/* (JS y CSS con huella en el nombre, cambian de nombre en cada versión): 1 año, inmutable
//  - imágenes, videos y fuentes: 7 días
//  - HTML: siempre se revalida, para que los cambios se vean apenas se publican
const ONE_YEAR = 365 * 24 * 60 * 60
const ONE_WEEK = 7 * 24 * 60 * 60
if (existsSync(DIST_DIR)) {
  app.use(
    express.static(DIST_DIR, {
      setHeaders(res, filePath) {
        const rel = path.relative(DIST_DIR, filePath).replaceAll('\\', '/')
        if (rel.startsWith('assets/')) res.setHeader('Cache-Control', `public, max-age=${ONE_YEAR}, immutable`)
        else if (/\.(webp|png|jpe?g|svg|mp4|woff2?)$/i.test(rel)) res.setHeader('Cache-Control', `public, max-age=${ONE_WEEK}`)
        else res.setHeader('Cache-Control', 'no-cache')
      },
    }),
  )
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache')
    res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`API de contacto en http://localhost:${PORT} (correo ${mailer ? 'activado' : 'desactivado: solo se guarda en server/data/leads.jsonl'})`)
  // Comprueba la conexión con el servidor de correo al iniciar, para detectar datos SMTP mal escritos
  mailer
    ?.verify()
    .then(() => console.log(`[correo] Conexión SMTP correcta con ${process.env.SMTP_HOST}; los mensajes se enviarán a ${process.env.CONTACT_TO}`))
    .catch((err) => console.error(`[correo] No se pudo conectar al SMTP (${process.env.SMTP_HOST}:${process.env.SMTP_PORT}): ${err.message}`))
})
