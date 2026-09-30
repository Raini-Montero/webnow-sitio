import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { navLinks } from '../data/site.js'
import useTheme from '../lib/useTheme.js'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const { dark, toggle } = useTheme()

  // Resalta en el menú la sección visible
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const linkClass = (id) =>
    `font-label-md text-label-md transition-colors duration-200 ${
      activeId === id ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
    }`

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/60 dark:border-transparent shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 container-page flex items-center justify-between gap-gutter">
        <a href="#" className="flex items-center" aria-label="webnow, ir al inicio">
          <Logo className="h-7" />
        </a>

        <nav className="hidden lg:flex items-center gap-space-lg">
          {navLinks.map((l) => (
            <a key={l.id} className={linkClass(l.id)} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            title={dark ? 'Tema claro' : 'Tema oscuro'}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <Icon name={dark ? 'light_mode' : 'dark_mode'} className="text-[22px]" />
          </button>
          <a
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md px-space-lg py-space-sm hover:bg-surface-tint hover:text-on-primary transition-all duration-200 shadow-md shadow-primary-container/25 hover:shadow-lg hover:shadow-primary-container/30 hover:scale-[1.02]"
            href="#contactar"
          >
            Cotizar ahora
          </a>
          <button
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="lg:hidden text-on-surface p-space-xs flex items-center justify-center hover:bg-surface-container-high rounded-lg transition-colors"
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-outline-variant/40 bg-surface/95 backdrop-blur-xl">
          <div className="container-page py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className={`py-3 px-2 rounded-lg hover:bg-surface-container-high ${linkClass(l.id)}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contactar"
              onClick={() => setMenuOpen(false)}
              className="sm:hidden mt-2 inline-flex items-center justify-center rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md px-space-lg py-3"
            >
              Cotizar ahora
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
