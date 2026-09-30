// Encabezado de sección centrado: eyebrow + título + bajada
export default function SectionHeading({ eyebrow, title, text, eyebrowColor = 'text-primary', as: Tag = 'h2', size = 'lg' }) {
  const titleClass =
    size === 'lg'
      ? 'font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg'
      : 'font-headline-md text-headline-md'
  return (
    <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
      <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
      <Tag className={`${titleClass} text-on-surface tracking-tight`}>{title}</Tag>
      {text && <p className="font-body-md text-body-md text-on-surface-variant">{text}</p>}
    </div>
  )
}
