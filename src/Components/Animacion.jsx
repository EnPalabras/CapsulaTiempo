import { useEffect, useRef } from 'react'

const ANIMACIONES = {
  abriendo: { archivo: 'sobre-abriendo', aire: 84 },
  cerrando: { archivo: 'sobre-cerrando', aire: 402 },
}

const RETRASO = 500

export default function Animacion({ cual, onTerminada }) {
  const video = useRef(null)
  const { archivo, aire } = ANIMACIONES[cual]

  useEffect(() => {
    const el = video.current
    if (!el) return
    const reloj = setTimeout(() => {
      el.muted = true
      el.play().catch(() => {})
    }, RETRASO)
    return () => clearTimeout(reloj)
  }, [cual])

  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-[700px] md:w-[36vw]">
        <div className="sobre" style={{ '--aire': aire }}>
          <video
            key={cual}
            ref={video}
            className="w-full"
            poster="/sobre-abierto.webp"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={onTerminada}
          >
            <source src={`/video/${archivo}.webm`} type="video/webm" />
            <source src={`/video/${archivo}.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
