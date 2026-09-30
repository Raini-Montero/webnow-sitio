import { clientLogos } from '../data/site.js'

// Franja de logos de clientes que se desplaza en bucle (se pausa al pasar el mouse).
// Va dentro del hero (comparte su fondo); los logos se muestran en blanco.
// Con "reducir movimiento" los logos quedan quietos y centrados.
function LogoList({ hidden = false }) {
  return (
    <ul className="logo-marquee-track flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16" aria-hidden={hidden || undefined}>
      {clientLogos.map((c) => (
        <li key={c.name} className="shrink-0">
          <img
            src={c.logo}
            alt={hidden ? '' : c.name}
            width="106"
            height="69"
            loading="lazy"
            className={`${c.size ?? 'h-14'} w-auto object-contain brightness-0 invert opacity-70 transition-opacity duration-300 hover:opacity-100`}
          />
        </li>
      ))}
    </ul>
  )
}

export default function ClientLogos() {
  return (
    <div role="region" aria-label="Clientes" className="flex flex-col gap-6">
      <p className="text-center eyebrow text-on-surface-variant">Marcas que confían en nosotros</p>
      <div className="logo-marquee group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <LogoList />
        {/* Copia para que el desplazamiento sea continuo */}
        <LogoList hidden />
      </div>
    </div>
  )
}
