import { useState } from 'react'
import { validarEnvio } from '@/lib/carta'
import { Input, Select } from '@/Components/Campos'
import AutocompleteCalle from '@/Components/AutocompleteCalle'
import {
  CONFIRMACION_ONLINE,
  MICROTEXTO_DIRECCION,
  OPCIONES_FORMATO,
  PASO_ENTREGA,
  PROVINCIAS,
} from '@/constants/campana'

const ENVIO_INICIAL = {
  envioCalle: '',
  envioPisoDepto: '',
  envioLocalidad: '',
  envioProvincia: '',
  envioCp: '',
  envioTelefono: '',
}

export default function Entrega({ onEnviar, enviando, erroresServidor, errorGeneral }) {
  const [preferencia, setPreferencia] = useState('')
  const [envio, setEnvio] = useState(ENVIO_INICIAL)
  const [consentimiento, setConsentimiento] = useState(false)
  const [erroresLocales, setErroresLocales] = useState({})

  const quierePapel = preferencia === 'PAPEL'
  const listo = Boolean(preferencia) && consentimiento && !enviando
  // Lo que encontramos acá y lo que devolvió el server se muestran igual.
  const errores = { ...erroresLocales, ...erroresServidor }

  const onChange = (e) => {
    const { name, value } = e.target
    setEnvio((previos) => ({ ...previos, [name]: value }))
    // Se limpia el error del campo al tocarlo, no el del form entero.
    setErroresLocales((previos) =>
      previos[name] ? { ...previos, [name]: undefined } : previos
    )
  }

  // Cuando elige una sugerencia de Google, la calle viene resuelta y el resto
  // se completa solo. Lo que Google no trajo queda como estaba.
  const onElegirDireccion = ({ calle, localidad, provincia, cp }) => {
    setEnvio((previos) => ({
      ...previos,
      envioCalle: calle ?? previos.envioCalle,
      envioLocalidad: localidad || previos.envioLocalidad,
      envioProvincia: provincia || previos.envioProvincia,
      envioCp: cp || previos.envioCp,
    }))
  }

  return (
    <section className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-6">
      <form
        className="flex w-full max-w-[640px] flex-col items-center text-center text-tinta"
        onSubmit={(e) => {
          e.preventDefault()
          if (!listo) return

          const encontrados = quierePapel ? validarEnvio(envio) : {}
          if (Object.keys(encontrados).length > 0) {
            setErroresLocales(encontrados)
            // El foco va al primer campo con problema.
            document.getElementById(Object.keys(encontrados)[0])?.focus()
            return
          }

          setErroresLocales({})
          onEnviar({ preferencia, envio, consentimiento })
        }}
      >
        {/* italic junto con font-ivy: es el único corte que tenemos. */}
        <h2 className="font-ivy text-[32px] font-medium italic leading-[1.15] md:text-[48px]">
          {PASO_ENTREGA.titulo}
        </h2>

        {/* Este render va recortado al sobre: es la única vez que aparece y no
            se encadena con ningún video, así que no necesita el aire de arriba
            que comparten los demás. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sobre-cerrado.webp"
          alt=""
          width={985}
          height={707}
          className="mt-6 w-full max-w-[300px]"
        />

        <div className="mt-6 w-full space-y-3">
          {OPCIONES_FORMATO.map((opcion) => (
            <label
              key={opcion.valor}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-borde bg-white p-4 text-left"
            >
              <input
                type="radio"
                name="preferencia"
                value={opcion.valor}
                checked={preferencia === opcion.valor}
                onChange={(e) => setPreferencia(e.target.value)}
                // El relleno del radio de flowbite es `currentColor`: con
                // text-black queda negro en vez del azul que trae de fábrica.
                className="mt-0.5 h-5 w-5 shrink-0 border-borde text-black accent-black focus:ring-0"
              />
              <span className="text-[16px] font-light">{opcion.label}</span>
            </label>
          ))}
        </div>

        {/* El bloque de dirección es el que ya estaba, tal cual, con su estilo
            viejo. Queda para tunear cuando definamos cómo se ve acá adentro. */}
        {quierePapel && (
          <fieldset className="mt-6 w-full space-y-6 rounded-xl border border-borde p-5 text-left">
            <legend className="px-2 text-base font-semibold text-tinta">
              ¿A dónde te la enviamos?
            </legend>

            {/* El !mt-0 le gana al space-y-6 del fieldset, que si no le mete
                margen arriba por venir después del legend. */}
            <p className="!mt-0 text-sm font-light leading-relaxed text-gray-500">
              {MICROTEXTO_DIRECCION}
            </p>

            <div className="grid gap-6 sm:grid-cols-3">
              <AutocompleteCalle
                id="envioCalle"
                error={errores.envioCalle}
                label="Calle y número"
                value={envio.envioCalle}
                onChange={onChange}
                onElegir={onElegirDireccion}
                provincias={PROVINCIAS}
                className="sm:col-span-2"
              />
              <Input
                id="envioPisoDepto"
                label="Piso y depto"
                value={envio.envioPisoDepto}
                onChange={onChange}
                opcional
                autoComplete="address-line2"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="envioLocalidad"
                error={errores.envioLocalidad}
                label="Localidad"
                value={envio.envioLocalidad}
                onChange={onChange}
                autoComplete="address-level2"
              />
              <Select
                id="envioProvincia"
                error={errores.envioProvincia}
                label="Provincia"
                value={envio.envioProvincia}
                onChange={onChange}
                opciones={PROVINCIAS}
                placeholder="Elegí una provincia"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="envioCp"
                error={errores.envioCp}
                label="Código postal"
                value={envio.envioCp}
                onChange={onChange}
                inputMode="numeric"
                placeholder="1425"
                autoComplete="postal-code"
              />
              <Input
                id="envioTelefono"
                error={errores.envioTelefono}
                label="Teléfono"
                value={envio.envioTelefono}
                onChange={onChange}
                inputMode="tel"
                placeholder="11 2345 6789"
                autoComplete="tel"
                ayuda="Por si el correo necesita ubicarte."
              />
            </div>

            <p className="text-xs text-gray-400">
              Por ahora enviamos solo dentro de Argentina.
            </p>
          </fieldset>
        )}

        {/* Eligió mail: no hay nada que pedirle, pero el lugar no queda vacío.
            Que algo aparezca confirma que la opción se registró. */}
        {preferencia === 'ONLINE' && (
          <p
            aria-live="polite"
            className="mt-6 w-full rounded-xl border border-borde bg-white px-4 py-3 text-left text-[16px] font-light"
          >
            {CONFIRMACION_ONLINE}
          </p>
        )}

        <div className="mt-6 flex w-full items-start gap-3 text-left">
          <input
            type="checkbox"
            id="consentimiento"
            checked={consentimiento}
            onChange={(e) => setConsentimiento(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-borde text-black accent-black focus:ring-0"
          />
          <label htmlFor="consentimiento" className="text-[14px] font-light">
            Acepto que usen mis datos para enviarme esta carta, según el{' '}
            <a
              href="/privacidad"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              aviso de privacidad
            </a>
            .
          </label>
        </div>

        {errorGeneral && (
          <p
            role="alert"
            className="mt-6 w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-[14px] font-medium text-red-700"
          >
            {errorGeneral}
          </p>
        )}

        <button
          type="submit"
          disabled={!listo}
          className="mt-8 rounded-full bg-tinta px-14 py-4 font-sans text-[20px] font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {enviando ? PASO_ENTREGA.enviando : PASO_ENTREGA.cta}
        </button>
      </form>
    </section>
  )
}
