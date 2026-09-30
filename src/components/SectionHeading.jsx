// Encabezado de sección centrado: eyebrow + título + bajada.
// `wide` da más ancho al bloque para que un título largo quepa en una línea en escritorio.
export default function SectionHeading({ eyebrow, title, text, eyebrowColor = 'text-primary', as: Tag = 'h2', size = 'lg', wide = false }) {
  const titleClass =
    size === 'lg'
      ? 'font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg'
      : 'font-headline-md text-headline-md'
  return (
    <div className={`text-center ${wide ? 'max-w-4xl' : 'max-w-2xl'} mx-auto flex flex-col items-center gap-3`}>
      <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
      <Tag className={`${titleClass} text-on-surface tracking-tight`}>{title}</Tag>
      {text && <p className="font-body-md text-body-md text-on-surface-variant">{text}</p>}
    </div>
  )
}
