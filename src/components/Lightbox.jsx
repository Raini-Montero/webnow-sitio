import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

// Visor en pop up de imágenes o videos. `items`: [{ image, alt } o { video }, con `title` o `client` opcional],
// `index`: ítem abierto (null = cerrado).
// Se navega con las flechas (pantalla o teclado), se cierra con Esc, con la X o haciendo clic fuera de la imagen.
export default function Lightbox({ items, index, onChange, onClose }) {
  const closeRef = useRef(null)
  const open = index !== null
  const count = items.length

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((i) => (i + 1) % count)
      if (e.key === 'ArrowLeft') onChange((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [open, count, onChange, onClose])

  if (!open) return null
  const item = items[index]

  const navButton =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md ring-1 ring-white/20 transition-colors'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.video ? 'Video' : 'Imagen'} ${index + 1} de ${count}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0b0520]/85 backdrop-blur-sm p-4 sm:p-10 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center ring-1 ring-white/20 transition-colors"
      >
        <Icon name="close" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            className={`${navButton} left-3 sm:left-6`}
            onClick={(e) => {
              e.stopPropagation()
              onChange((i) => (i - 1 + count) % count)
            }}
          >
            <Icon name="chevron_left" className="text-3xl" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            className={`${navButton} right-3 sm:right-6`}
            onClick={(e) => {
              e.stopPropagation()
              onChange((i) => (i + 1) % count)
            }}
          >
            <Icon name="chevron_right" className="text-3xl" />
          </button>
        </>
      )}

      <figure className="flex flex-col items-center gap-3 max-w-full" onClick={(e) => e.stopPropagation()}>
        {item.video ? (
          // Video: se reproduce con sonido y controles; al cambiar de ítem o cerrar se desmonta y se detiene
          <video
            key={item.video}
            src={item.video}
            controls
            autoPlay
            playsInline
            className="max-h-[78vh] max-w-full w-auto rounded-2xl shadow-2xl shadow-black/50 bg-black animate-[zoomIn_0.25s_ease-out]"
          />
        ) : (
          <img
            key={item.image}
            src={item.image}
            alt={item.alt}
            className="max-h-[78vh] max-w-full w-auto rounded-2xl shadow-2xl shadow-black/50 object-contain animate-[zoomIn_0.25s_ease-out]"
          />
        )}
        <figcaption className="flex items-center gap-3 text-white/80 font-body-sm text-body-sm">
          {(item.title || item.client) && <span className="font-semibold text-white">{item.title || item.client}</span>}
          <span className="text-white/50">
            {index + 1} / {count}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
