import { ETIQUETAS, MAX_MENSAJE, PASO_CARTA } from '@/constants/campana'

function Dato({ etiqueta, valor }) {
  return (
    <p className="text-[14px] font-light leading-relaxed text-black">
      {etiqueta}
      <br />
      {valor}
    </p>
  )
}

export default function Carta({ valores, texto, onCambiar, onEnviar }) {
  const listo = texto.trim().length > 0

  return (
    <section className="flex flex-1 items-center justify-center px-4">
      <form
        className="flex w-full max-w-[720px] flex-col items-center text-center text-tinta"
        onSubmit={(e) => {
          e.preventDefault()
          if (listo) onEnviar()
        }}
      >
        {/* italic junto con font-ivy: es el único corte que tenemos. */}
        <h2 className="font-ivy text-[32px] font-medium italic leading-[1.15] md:text-[48px]">
          {PASO_CARTA.titulo}
        </h2>

        <div className="relative mt-8 w-full">
          {/* Los dos datos van juntos del mismo lado, en absolute, para que el
              textarea siga centrado en la pantalla y no se corra por el largo
              de un nombre. Abajo de md no hay lugar al costado: van arriba. */}
          <div className="mb-4 flex flex-col gap-3 text-left md:absolute md:left-full md:top-0 md:mb-0 md:ml-6 md:w-40">
            <Dato etiqueta={ETIQUETAS.nombre} valor={valores.nombre} />
            <Dato etiqueta={ETIQUETAS.email} valor={valores.email} />
          </div>

          <textarea
            value={texto}
            onChange={(e) => onCambiar(e.target.value)}
            rows={12}
            // El backend rechaza cualquier cosa más larga que esto.
            maxLength={MAX_MENSAJE}
            className="w-full resize-none rounded-xl border border-borde bg-white p-5 font-sans text-[16px] font-light leading-relaxed text-black outline-none focus:border-tinta focus:ring-0"
          />
        </div>

        {/* TODO: todavía no manda nada a ningún lado. */}
        <button
          type="submit"
          disabled={!listo}
          className="mt-8 rounded-full bg-tinta px-14 py-4 font-sans text-[20px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {PASO_CARTA.cta}
        </button>
      </form>
    </section>
  )
}
