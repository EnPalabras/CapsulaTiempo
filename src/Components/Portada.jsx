import { PORTADA } from '@/constants/campana'

export default function Portada({ onEmpezar }) {
  return (
    // flex-1 + min-h-0: el bloque se come todo el alto que sobra sin empujar
    // la página más allá del viewport.
    <section className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl">
      {/* El poster es el primer frame: mientras el .webm baja se ve el fondo
          quieto en lugar de un rectángulo vacío. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/fondo-cartas-desktop.webm"
        poster="/video/fondo-cartas-desktop.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div className="relative flex max-w-[620px] flex-col items-center px-6 py-16 text-center text-tinta">
        <p className="text-[16px] font-light leading-relaxed">
          {PORTADA.intro}
        </p>

        {/* italic va junto con font-ivy: del titular tenemos un solo corte,
            medium italic, y así se usa el real y no el sintético. */}
        <h1 className="mt-6 font-ivy text-[34px] font-medium italic leading-[1.15] md:text-[56px]">
          {PORTADA.titulo}
        </h1>

        <p className="mt-6 text-[16px] font-light leading-relaxed">
          {PORTADA.invitacion}
        </p>

        <button
          type="button"
          onClick={onEmpezar}
          className="mt-12 rounded-full bg-tinta px-14 py-4 font-sans text-[20px] font-medium text-white transition-opacity hover:opacity-90"
        >
          {PORTADA.cta}
        </button>

        <p className="mt-8 text-[12px] font-light leading-relaxed">
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
