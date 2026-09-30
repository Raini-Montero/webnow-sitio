import { useState } from 'react'
import Icon from './Icon.jsx'
import { serviceOptions } from '../data/site.js'
import { validateContact, LIMITS } from '../lib/validateContact.js'

const empty = { nombre: '', apellido: '', correo: '', telefono: '', mensaje: '', website: '' }

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor={`form-${id}`}>
        {label}
      </label>
      {children}
      {error && (
        <span className="text-error font-body-sm text-xs" id={`err-${id}`} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default function ContactForm({ selectedService, onServiceChange }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  // idle | sending | success | error
  const [status, setStatus] = useState('idle')
  const [serverMessage, setServerMessage] = useState('')

  const data = { ...values, servicio: selectedService }

  function update(e) {
    const { name, value } = e.target
    if (name === 'servicio') onServiceChange(value)
    else setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const found = validateContact(data)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`form-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (body.errors) setErrors(body.errors)
        throw new Error(body.message || 'No pudimos enviar tu mensaje.')
      }
      setStatus('success')
      setValues(empty)
      onServiceChange('')
    } catch (err) {
      setServerMessage(err.message === 'Failed to fetch' ? 'No hay conexión con el servidor. Inténtalo nuevamente.' : err.message)
      setStatus('error')
    }
  }

  const inputProps = (name) => ({
    id: `form-${name}`,
    name,
    value: data[name],
    onChange: update,
    maxLength: LIMITS[name],
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `err-${name}` : undefined,
    className: `field ${errors[name] ? 'ring-2 ring-error' : ''}`,
  })

  const sending = status === 'sending'

  return (
    <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
      {/* Campo trampa anti-spam: invisible para personas, los bots lo rellenan */}
      <input type="text" name="website" value={values.website} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="nombre" label="Nombre *" error={errors.nombre}>
          <input {...inputProps('nombre')} type="text" placeholder="Ej. Carlos" autoComplete="given-name" />
        </Field>
        <Field id="apellido" label="Apellido *" error={errors.apellido}>
          <input {...inputProps('apellido')} type="text" placeholder="Ej. Silva" autoComplete="family-name" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="correo" label="Correo *" error={errors.correo}>
          <input {...inputProps('correo')} type="email" placeholder="carlos@empresa.cl" autoComplete="email" />
        </Field>
        <Field id="telefono" label="Teléfono (opcional)" error={errors.telefono}>
          <input {...inputProps('telefono')} type="tel" placeholder="+56 9 1234 5678" autoComplete="tel" />
        </Field>
      </div>

      <Field id="servicio" label="Servicio de interés (opcional)" error={errors.servicio}>
        <div className="relative">
          <select {...inputProps('servicio')} className={`${inputProps('servicio').className} appearance-none pr-10`}>
            <option value="">Selecciona un servicio</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Icon name="expand_more" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline" />
        </div>
      </Field>

      <Field id="mensaje" label="Mensaje *" error={errors.mensaje}>
        <textarea
          {...inputProps('mensaje')}
          className={`${inputProps('mensaje').className} resize-none`}
          rows={4}
          placeholder="Cuéntanos brevemente sobre tu proyecto, objetivos o tiempos esperados..."
        />
      </Field>

      <button
        className="w-full py-4 px-6 rounded-xl bg-primary-container hover:bg-primary hover:text-on-primary text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold shadow-xl shadow-primary-container/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100"
        type="submit"
        disabled={sending}
      >
        <span>{sending ? 'Enviando...' : 'Enviar mensaje'}</span>
        {sending && <Icon name="progress_activity" className="animate-spin text-lg" />}
      </button>

      <div aria-live="polite">
        {status === 'success' && (
          <div className="p-4 rounded-xl bg-secondary-container/20 text-on-surface flex items-center gap-3">
            <Icon name="check_circle" className="text-secondary text-2xl" />
            <p className="font-body-sm text-body-sm font-semibold">
              ¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos en menos de 2 horas hábiles.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 rounded-xl bg-error-container/30 text-on-surface flex items-center gap-3">
            <Icon name="error" className="text-error text-2xl" />
            <p className="font-body-sm text-body-sm font-semibold">{serverMessage}</p>
          </div>
        )}
      </div>
    </form>
  )
}
