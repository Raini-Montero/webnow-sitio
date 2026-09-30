import { useEffect, useRef } from 'react'

// Fondo animado: orbes de luz que flotan y, al mover el mouse, un brillo y una grilla sutil que siguen al cursor.
// - Por defecto cubre su sección: va como primer hijo de una sección `relative overflow-hidden` y escucha el mouse sobre ella.
// - Con `fixed` queda fijo detrás de toda la página (fondo único del tema oscuro) y escucha el mouse en toda la ventana.
// Con "reducir movimiento" los orbes quedan quietos y el brillo no sigue al cursor.
export default function AnimatedBackdrop({ fixed = false, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const target = fixed ? window : el?.parentElement
    if (!el || !target) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let pointer = null

    function update() {
      frame = 0
      if (!pointer) return
      const r = fixed ? { left: 0, top: 0 } : el.parentElement.getBoundingClientRect()
      el.style.setProperty('--mx', `${pointer.x - r.left}px`)
      el.style.setProperty('--my', `${pointer.y - r.top}px`)
      el.style.setProperty('--spot', '1')
    }
    function onMove(e) {
      pointer = { x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(update)
    }
    function onLeave() {
      pointer = null
      el.style.setProperty('--spot', '0')
    }

    const leaveTarget = fixed ? document.documentElement : target
    target.addEventListener('pointermove', onMove)
    leaveTarget.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      target.removeEventListener('pointermove', onMove)
      leaveTarget.removeEventListener('pointerleave', onLeave)
    }
  }, [fixed])

  const position = fixed
    ? '-z-10 fixed inset-0 overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest to-surface'
    : 'absolute inset-0'

  return (
    <div ref={ref} aria-hidden="true" className={`fx-backdrop pointer-events-none ${position} ${className}`}>
      <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary-container/25 blur-3xl animate-drift motion-reduce:animate-none" />
      <div className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-secondary-container/20 blur-3xl animate-drift-slow motion-reduce:animate-none" />
      <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-tertiary-container/10 blur-3xl animate-drift-slow motion-reduce:animate-none [animation-delay:-8s]" />
      <div className="fx-grid absolute inset-0" />
      <div className="fx-spot absolute inset-0" />
    </div>
  )
}
