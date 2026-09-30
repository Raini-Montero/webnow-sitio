import { useState } from 'react'

// Tema claro (por defecto) u oscuro. Se guarda en localStorage y se aplica con la clase "dark" en <html>.
// El tema inicial lo pone un script en index.html para evitar un parpadeo al cargar.
export default function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  function toggle() {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('tema', next ? 'oscuro' : 'claro')
    } catch {
      // Sin acceso a localStorage: el cambio dura solo esta visita
    }
    setDark(next)
  }

  return { dark, toggle }
}
