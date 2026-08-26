import { MAX_MENSAJE, PASO_CARTA } from '@/constants/campana'

export default function Carta({ texto, onCambiar, onEnviar }) {
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

        <p className="mt-3 text-[14px] font-light md:text-[16px]">
          {PASO_CARTA.subtitulo}
        </p>

        <textarea
          value={texto}
          onChange={(e) => onCambiar(e.target.value)}
          rows={12}

          maxLength={MAX_MENSAJE}
          className="mt-8 w-full resize-none rounded-xl border border-borde bg-white p-5 font-sans text-[16px] font-light leading-relaxed text-black outline-none focus:border-tinta focus:ring-0"
        />

        <button
          type="submit"
          disabled={!listo}
          className="mt-8 rounded-full bg-tinta px-14 py-4 font-sans text-[20px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
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
