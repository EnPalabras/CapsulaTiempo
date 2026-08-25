import { useState } from 'react'
import Sobre from '@/Components/Sobre'

// Los pasos de datos son todos la misma pantalla: cambia el texto del campo y
// nada más. El sobre de la derecha no se vuelve a montar entre pasos, así que
// se queda quieto mientras el campo funde.
export default function Datos({
  campo,
  valor,
  onCambiar,
  onSiguiente,
  valores,
  campoVisible,
  centrado,
  abriendo,
  onAbierto,
}) {
  // El error se guarda con su campo: así no queda pegado al pasar al
  // siguiente paso, que reusa este mismo componente.
  const [error, setError] = useState(null)
  const listo = valor.trim().length > 0
  const mensajeError = error?.clave === campo.clave ? error.mensaje : null

  // Cuando el campo se apaga, la primera columna se cierra hasta 0 y el sobre
  // queda solo, en el medio de la pantalla. Las dos columnas son minmax() en
  // los dos estados para que el navegador pueda interpolar entre ellos: eso es
  // lo que hace que el sobre se deslice en lugar de saltar. Donde no se pueda
  // interpolar, salta y sigue funcionando igual.
  const columnas = centrado
    ? 'md:grid-cols-[minmax(0,0fr)_minmax(0,1fr)] md:gap-0 wide:gap-0'
    : 'md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 wide:gap-24'

  return (
    <section
      className={`grid flex-1 gap-10 transition-all duration-700 md:px-12 xl:px-20 wide:px-28 ${columnas}`}
    >
      <form
        className={`flex min-w-0 flex-col justify-center overflow-hidden text-tinta transition-opacity duration-500 ${
          campoVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onSubmit={(e) => {
          e.preventDefault()
          if (!listo) return
          if (!campo.valido(valor)) {
            setError({ clave: campo.clave, mensaje: campo.error })
            return
          }
          onSiguiente()
        }}
      >
        <div className="w-full">
          {/* italic junto con font-ivy: es el único corte que tenemos. */}
          <label
            htmlFor={campo.clave}
            className="block font-ivy text-[32px] font-medium italic leading-[1.15] md:text-[48px]"
          >
            {campo.pregunta}
          </label>

          <input
            id={campo.clave}
            name={campo.clave}
            type={campo.tipo}
            autoComplete={campo.autoComplete}
            value={valor}
            onChange={(e) => {
              setError(null)
              onCambiar(e.target.value)
            }}
            aria-invalid={mensajeError ? 'true' : undefined}
            placeholder={campo.placeholder}
            className="mt-4 w-full rounded-xl border border-borde bg-white px-5 py-4 font-sans text-[16px] font-light text-black outline-none placeholder:text-borde focus:border-tinta focus:ring-0"
          />

          {mensajeError && (
            <p className="mt-2 text-[14px] font-light text-red-600">
              {mensajeError}
            </p>
          )}

          <button
            type="submit"
            disabled={!listo}
            className="mt-8 rounded-full bg-tinta px-14 py-4 font-sans text-[20px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {campo.cta}
          </button>
        </div>
      </form>

      <Sobre valores={valores} abriendo={abriendo} onAbierto={onAbierto} />
    </section>
  )
}
