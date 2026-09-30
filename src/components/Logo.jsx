import { images } from '../data/site.js'

// Muestra el logo original en el tema claro y la versión con "web" en blanco en el oscuro.
// Con `onDark` usa siempre la versión para fondo oscuro (p. ej. en el footer).
export default function Logo({ className = 'h-7', lazy = false, onDark = false }) {
  const props = { alt: 'webnow', width: 696, height: 133, loading: lazy ? 'lazy' : undefined }
  if (onDark) return <img {...props} src={images.logoOnDark} className={`${className} w-auto`} />
  return (
    <>
      <img {...props} src={images.logo} className={`${className} w-auto dark:hidden`} />
      <img {...props} src={images.logoOnDark} className={`${className} w-auto hidden dark:block`} />
    </>
  )
}
