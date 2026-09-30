import { useEffect, useRef } from 'react'

// Carrusel horizontal para móvil (se usa en "Proceso" y "Proyectos realizados").
// - Se desliza con el dedo (scroll nativo) o arrastrando con el mouse.
// - Avanza solo a la tarjeta siguiente y vuelve a la primera al final.
// - El avance se pausa al tocar o arrastrar, cuando no está en pantalla, en tablet/escritorio
//   (donde el contenedor es una grilla) y con "reducir movimiento".
// Uso: const { trackRef, trackProps } = useCarousel(); <ol ref={trackRef} {...trackProps}>…</ol>
// Las clases del contenedor (flex + overflow-x + snap en móvil, grilla desde md) las pone cada componente.

// Cada cuánto avanza solo, y cuánto espera tras una interacción antes de retomar
const AUTOPLAY_MS = 3500
const RESUME_AFTER_MS = 6000
// Ancho máximo en el que el contenedor funciona como carrusel (debajo del breakpoint md)
const CAROUSEL_QUERY = '(max-width: 767px)'

export default function useCarousel() {
  const trackRef = useRef(null)
  const drag = useRef(null)
  const suppressClick = useRef(false)
  const pausedUntil = useRef(0)

  // Avance automático
  useEffect(() => {
    const el = trackRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const isCarousel = window.matchMedia(CAROUSEL_QUERY)

    let visible = false
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.5 })
    observer.observe(el)

    const pause = () => (pausedUntil.current = Date.now() + RESUME_AFTER_MS)
    const events = ['pointerdown', 'touchstart', 'wheel']
    events.forEach((ev) => el.addEventListener(ev, pause, { passive: true }))

    const timer = setInterval(() => {
      if (!isCarousel.matches || !visible || document.hidden || Date.now() < pausedUntil.current) return
      const cards = [...el.children]
      if (!cards.length) return
      // Tarjeta actualmente centrada
      const center = el.scrollLeft + el.clientWidth / 2
      const distance = (card) => Math.abs(card.offsetLeft + card.clientWidth / 2 - center)
      const current = cards.reduce((best, card, i) => (distance(card) < distance(cards[best]) ? i : best), 0)
      const next = cards[(current + 1) % cards.length]
      // scrollTo en el carrusel (no scrollIntoView) para no mover la página verticalmente
      el.scrollTo({ left: next.offsetLeft - (el.clientWidth - next.clientWidth) / 2, behavior: 'smooth' })
    }, AUTOPLAY_MS)

    return () => {
      clearInterval(timer)
      observer.disconnect()
      events.forEach((ev) => el.removeEventListener(ev, pause))
    }
  }, [])

  // Arrastre con mouse (en pantallas táctiles el deslizamiento es nativo)
  function onPointerDown(e) {
    if (e.pointerType !== 'mouse' || !window.matchMedia(CAROUSEL_QUERY).matches) return
    const el = trackRef.current
    drag.current = { x: e.clientX, scroll: el.scrollLeft, moved: false }
    el.style.scrollSnapType = 'none' // sin "imán" mientras se arrastra
  }
  function onPointerMove(e) {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 5) drag.current.moved = true
    trackRef.current.scrollLeft = drag.current.scroll - dx
  }
  function endDrag() {
    if (!drag.current) return
    suppressClick.current = drag.current.moved
    drag.current = null
    trackRef.current.style.scrollSnapType = '' // vuelve el imán: se acomoda a la tarjeta más cercana
  }
  // Si la tarjeta es un enlace, que un arrastre no lo abra
  function onClickCapture(e) {
    if (!suppressClick.current) return
    suppressClick.current = false
    e.preventDefault()
    e.stopPropagation()
  }
  // Evita que el navegador arrastre la imagen o el enlace como archivo
  function onDragStart(e) {
    if (window.matchMedia(CAROUSEL_QUERY).matches) e.preventDefault()
  }

  return {
    trackRef,
    trackProps: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerLeave: endDrag, onClickCapture, onDragStart },
  }
}
