import { useState } from 'react'
import { MAX_MENSAJE, PASO_CARTA } from '@/constants/campana'
import Info from '../assets/Info.svg'

export default function Carta({ texto, onCambiar, onEnviar }) {
  const [ayudaAbierta, setAyudaAbierta] = useState(false)
  const listo = texto.trim().length > 0
  return (
    <section className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-6">
      <form
        className="flex w-full max-w-[760px] flex-col items-center text-center text-tinta"
        onSubmit={(e) => {
          e.preventDefault()
          if (listo) onEnviar()
        }}
      >

        <h2 className="font-ivy text-[32px] font-medium italic leading-[1.15] md:text-[48px]">
          {PASO_CARTA.titulo}
        </h2>

        <p className="mt-3 text-[16px] font-light md:text-[19px]">
          {PASO_CARTA.subtitulo}
        </p>

        <textarea
          value={texto}
          onChange={(e) => onCambiar(e.target.value)}
          rows={12}

          maxLength={MAX_MENSAJE}
          className="mt-8 w-full resize-none rounded-xl border border-borde bg-white p-5 font-sans text-[16px] font-light leading-relaxed text-black outline-none focus:border-tinta focus:ring-0"
        />

        <div className="group relative mt-6">
          <button
            type="button"
            onClick={() => setAyudaAbierta((valorActual) => !valorActual)}
            onBlur={() => setAyudaAbierta(false)}
            className="text-[14px] font-semibold text-[#B71D1D] md:text-[16px]"
            aria-expanded={ayudaAbierta}
            aria-describedby="ayuda-carta-tooltip"
          >
            ¿Te trabaste? Te ayudamos a arrancar{' '}
            <img src={Info.src} alt="Info" className="inline-block h-5 w-5" />
          </button>

          <div
            id="ayuda-carta-tooltip"
            role="tooltip"
            aria-hidden={!ayudaAbierta}
            className={`absolute flex flex-col gap-1 text-left bottom-full left-1/2 mb-2 w-max max-w-[280px] -translate-x-1/2 rounded-md bg-arena p-5 text-[12px] font-normal leading-relaxed text-tinta shadow-lg transition-opacity duration-150 md:text-[14px] ${ayudaAbierta ? 'opacity-100' : 'pointer-events-none opacity-0'
              } group-hover:opacity-100 group-focus-within:opacity-100`}
          >
            <span className="font-semibold mb-2">¿Te trabaste? Estas preguntas te pueden ayudar a arrancar:</span>
            <span>"¿Qué quiero lograr, y por qué es importante para mí?"</span>
            <span className="text-[10px] md:text-[12px] mb-1">- del Journal de Productividad</span>
            <span>"¿A qué nuevo 'Yo soy' te gustaría llegar?"</span>
            <span className="text-[10px] md:text-[12px]">- del Journal Original</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!listo}
          className="mt-4 rounded-full bg-tinta px-14 py-4 font-sans text-[20px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {PASO_CARTA.cta}
        </button>

        <p className="mt-8 w-full rounded-md bg-arena px-5 py-3 text-[12px] font-normal leading-relaxed md:text-[14px]">
          {PASO_CARTA.aviso}
        </p>

        <h3 className="mt-8 text-[16px] font-medium md:text-[18px]">
          {PASO_CARTA.porqueTitulo}
        </h3>

        <p className="mt-3 max-w-[620px] text-[12px] font-normal leading-relaxed md:text-[14px]">
          {PASO_CARTA.porque}
        </p>
      </form>
    </section>
  )
}
