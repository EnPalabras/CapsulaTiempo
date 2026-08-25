import { useEffect, useRef } from 'react'

// El sobre cerrándose. Mismo lienzo que el resto de los renders, así que el
// `.sobre` le descuenta el aire de arriba igual que en los pasos anteriores;
// acá el papel nunca sube, el frame más alto de la animación es el 492.
const AIRE = 492

// El video dura 833ms y la pantalla entra con un fundido de 500. Si arrancara
// al montarse, más de la mitad de la animación pasaría mientras todavía se está
// prendiendo. Espera a que termine el fundido.
const RETRASO = 500

export default function Cerrando({ onCerrado }) {
  const video = useRef(null)

  useEffect(() => {
    const el = video.current
    if (!el) return
    const reloj = setTimeout(() => {
      // React no escribe el atributo `muted` en el HTML del server, así que la
      // política de autoplay rechazaría el play(). Se pone a mano.
      el.muted = true
      el.play().catch(() => {})
    }, RETRASO)
    return () => clearTimeout(reloj)
  }, [])

  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[700px] md:w-[36vw]">
        <div className="sobre" style={{ '--aire': AIRE }}>
          <video
            ref={video}
            className="w-full"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={onCerrado}
          >
            <source src="/video/sobre-cerrando.webm" type="video/webm" />
            <source src="/video/sobre-cerrando.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
