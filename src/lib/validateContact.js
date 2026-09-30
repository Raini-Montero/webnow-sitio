// Validación del formulario de contacto. Se usa en el navegador y en el servidor (server/index.js).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const LIMITS = { nombre: 80, apellido: 80, correo: 120, telefono: 30, servicio: 80, mensaje: 3000 }

export function validateContact(data) {
  const v = (k) => String(data?.[k] ?? '').trim()
  const errors = {}

  if (!v('nombre')) errors.nombre = 'Por favor ingresa tu nombre.'
  if (!v('apellido')) errors.apellido = 'Por favor ingresa tu apellido.'
  if (!EMAIL_RE.test(v('correo'))) errors.correo = 'Por favor ingresa un correo válido.'
  if (v('telefono') && !/^[+\d\s()-]{6,}$/.test(v('telefono'))) errors.telefono = 'Revisa el número de teléfono.'
  if (!v('mensaje')) errors.mensaje = 'Por favor escribe tu mensaje.'

  for (const [k, max] of Object.entries(LIMITS)) {
    if (!errors[k] && v(k).length > max) errors[k] = `Máximo ${max} caracteres.`
  }

  return errors
}
