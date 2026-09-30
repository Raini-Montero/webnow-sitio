// Ilustración vectorial del hero: un monitor con un sitio web que se arma en bucle (.wf-build en index.css).
// Queda quieto con "reducir movimiento".

const C = {
  purple: '#7b42f5',
  lilac: '#9d6bff',
  cyan: '#12b5d6',
  orange: '#ff8a1f',
  ink: '#1c1633',
  night: '#140a33',
  deep: '#2c1866',
  paper: '#ffffff',
  paperSoft: '#f7f5fd',
  line: '#ddd7ee',
}

// Bloque del sitio que aparece en secuencia
const b = (order) => ({ className: 'wf-build', style: { '--d': `${order * 0.18}s` } })

export default function HeroIllustration() {
  return (
    <svg viewBox="130 22 300 256" className="w-full h-auto" role="img" aria-label="Ilustración de un monitor con un sitio web en construcción">
      <defs>
        <linearGradient id="il-photo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.lilac} />
          <stop offset="0.55" stopColor={C.purple} />
          <stop offset="1" stopColor={C.cyan} />
        </linearGradient>
      </defs>

      {/* Monitor con el sitio que se está maquetando */}
      <rect x="140" y="30" width="280" height="190" rx="16" fill={C.night} stroke="#fff" strokeOpacity="0.14" />
      <rect x="150" y="40" width="260" height="168" rx="8" fill={C.paper} />
      <rect x="150" y="40" width="260" height="14" rx="7" fill="#f1ecfe" />
      <circle cx="160" cy="47" r="2.5" fill="#ff5f57" />
      <circle cx="168" cy="47" r="2.5" fill="#febc2e" />
      <circle cx="176" cy="47" r="2.5" fill="#28c840" />
      <g {...b(0)}><circle cx="170" cy="68" r="5" fill={C.purple} /></g>
      <g {...b(0.5)}><rect x="180" y="65" width="30" height="5" rx="2.5" fill={C.ink} opacity="0.75" /></g>
      <g {...b(1)}><rect x="316" y="65" width="18" height="4" rx="2" fill={C.ink} opacity="0.25" /></g>
      <g {...b(1.3)}><rect x="340" y="65" width="18" height="4" rx="2" fill={C.ink} opacity="0.25" /></g>
      <g {...b(1.8)}><rect x="364" y="62" width="30" height="10" rx="5" fill={C.orange} /></g>
      <g {...b(3)}><rect x="166" y="86" width="112" height="9" rx="4.5" fill={C.ink} /></g>
      <g {...b(3.4)}><rect x="166" y="100" width="78" height="9" rx="4.5" fill={C.purple} /></g>
      <g {...b(4)}><rect x="166" y="116" width="112" height="3.5" rx="1.75" fill={C.ink} opacity="0.2" /></g>
      <g {...b(4.3)}><rect x="166" y="123" width="96" height="3.5" rx="1.75" fill={C.ink} opacity="0.2" /></g>
      <g {...b(5)}><rect x="166" y="134" width="46" height="14" rx="7" fill={C.purple} /></g>
      <g {...b(5.3)}><rect x="217" y="134" width="36" height="14" rx="7" fill="none" stroke={C.purple} strokeOpacity="0.45" /></g>
      <g {...b(2.4)}>
        <rect x="294" y="82" width="100" height="68" rx="8" fill="url(#il-photo)" />
        <circle cx="378" cy="96" r="7" fill="#ffb27a" />
        <path d="M294 150 L294 128 L320 106 L340 124 L356 112 L394 138 L394 150 Z" fill="#fff" opacity="0.35" />
      </g>
      {[166, 245, 324].map((x, i) => (
        <g key={x} {...b(6.2 + i * 0.4)}>
          <rect x={x} y="160" width="70" height="36" rx="6" fill={C.paperSoft} stroke={C.line} />
          <rect x={x + 8} y="167" width="10" height="10" rx="3" fill={[C.purple, C.cyan, C.orange][i]} />
          <rect x={x + 8} y="182" width="40" height="3.5" rx="1.75" fill={C.ink} opacity="0.5" />
          <rect x={x + 8} y="188" width="52" height="3" rx="1.5" fill={C.ink} opacity="0.15" />
        </g>
      ))}
      <rect x="266" y="220" width="28" height="34" fill={C.deep} />
      <rect x="232" y="252" width="96" height="9" rx="4.5" fill={C.deep} />
      <ellipse cx="280" cy="268" rx="110" ry="6" fill="#000" opacity="0.25" />
    </svg>
  )
}
