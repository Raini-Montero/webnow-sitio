# webnow — Landing

Sitio de la agencia webnow: React + Vite + Tailwind CSS, con una API en Express para el formulario de contacto.

## Desarrollo

```bash
npm install
npm run dev
```

- Sitio: http://localhost:5173
- API: http://localhost:3001 (Vite redirige `/api` automáticamente)

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Precios, planes, proyectos, datos de contacto | `src/data/site.js` |
| Secciones de la página | `src/components/` |
| Colores, tipografías y espaciados | `tailwind.config.js` (ver `design/DESIGN.md`) |
| Formulario de contacto (servidor) | `server/index.js` |

## Formulario de contacto

Cada mensaje se guarda en `server/data/leads.jsonl` (un JSON por línea).
Para recibirlos también por correo, completa las variables `SMTP_*` y `CONTACT_TO` en `.env` (usa `.env.example` como guía).

## Producción

```bash
npm run build
npm start
```

`npm start` sirve el sitio compilado (`dist/`) y la API en el mismo puerto (`PORT`, por defecto 3001).

## Diseño original

El HTML exportado de Stitch, la guía de diseño y la captura están en `design/`.
