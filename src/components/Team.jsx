import useCarousel from '../lib/useCarousel.js'
import { team } from '../data/site.js'

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

// En móvil el equipo es un carrusel que avanza solo y se arrastra; desde tablet, una grilla
export default function Team() {
  const { trackRef, trackProps } = useCarousel()
  return (
    <section className="w-full py-20 bg-surface dark:bg-transparent" id="equipo">
      <div className="container-page flex flex-col gap-12">
        <h2 className="text-center font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface tracking-tight">
          +10 años de experiencia y profesionalismo
        </h2>

        <ul
          ref={trackRef}
          {...trackProps}
          aria-label="Equipo"
          className="-mx-margin-mobile flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile py-3 scroll-px-margin-mobile cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:py-0 md:cursor-auto md:select-auto lg:grid-cols-4"
        >
          {team.map((m) => (
            <li
              key={m.name}
              className="card-edge group flex w-[82%] shrink-0 snap-center md:w-auto flex-col rounded-2xl overflow-hidden bg-surface-container hover:bg-surface-container-high transition-all duration-300 md:hover:-translate-y-2 shadow-md"
            >
              <div className="overflow-hidden">
                <img
                  src={m.photo}
                  alt={`Foto de ${m.name}`}
                  width="370"
                  height="441"
                  loading="lazy"
                  draggable="false"
                  className="w-full aspect-[370/441] object-cover bg-surface-container-high group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-start justify-between gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">{m.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{m.role}</p>
                </div>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${m.name}`}
                  title={`LinkedIn de ${m.name}`}
                  className="shrink-0 w-10 h-10 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:bg-[#0a66c2] hover:text-white transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
