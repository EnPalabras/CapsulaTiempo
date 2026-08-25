import { useEffect, useState } from 'react'
import { PORTADA } from '@/constants/campana'

export default function Portada({ onEmpezar }) {
  const [fondo, setFondo] = useState(null)

  useEffect(() => {
    const consulta = window.matchMedia('(min-width: 768px)')
    const elegir = () => setFondo(consulta.matches ? 'horizontal' : 'vertical')
    elegir()
    consulta.addEventListener('change', elegir)
    return () => consulta.removeEventListener('change', elegir)
  }, [])

  return (
    <section className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-[url('/video/fondo-vertical.jpg')] bg-cover bg-center md:bg-[url('/video/fondo-horizontal.jpg')]">
      {fondo && (
        <video
          key={fondo}
          className="absolute inset-0 h-full w-full object-cover"
          poster={`/video/fondo-${fondo}.jpg`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={`/video/fondo-${fondo}.webm`} type="video/webm" />
          <source src={`/video/fondo-${fondo}.mp4`} type="video/mp4" />
        </video>
      )}

      <div className="relative flex h-full max-w-[620px] flex-col items-center justify-center px-6 py-6 text-center text-tinta md:py-10">
        <h1 className="font-ivy text-[44px] font-medium italic leading-[1.15] md:text-[56px]">
          {PORTADA.titulo}
        </h1>

        <p className="mt-4 text-[12px] font-normal leading-relaxed md:mt-6 md:text-[16px]">
          {PORTADA.invitacion}
        </p>

        <img
          src="/sobre-violeta.webp"
          alt=""
          width={741}
          height={811}
          className="mt-6 min-h-0 max-h-[306px] w-auto max-w-[280px] flex-1 object-contain object-bottom md:mt-8 md:max-h-[416px] md:max-w-[380px]"
        />

        <button
          type="button"
          onClick={onEmpezar}
          className="relative z-10 -mt-9 rounded-full bg-tinta px-14 py-4 font-sans text-[16px] font-medium text-white transition-opacity hover:opacity-90 md:-mt-11 md:text-[20px]"
        >
          {PORTADA.cta}
        </button>

        <p className="mt-6 text-[10px] font-light leading-relaxed md:mt-8 md:text-[12px]">
          {PORTADA.aviso.map((linea) => (
            <span key={linea} className="block">
              {linea}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
