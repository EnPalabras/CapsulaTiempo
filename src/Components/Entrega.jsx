import { useEffect, useState } from 'react'
import { validarEnvio, validarPersona } from '@/lib/carta'
import { Input, Select } from '@/Components/Campos'
import AutocompleteCalle from '@/Components/AutocompleteCalle'
import {
  CONFIRMACION_ONLINE,
  CUPO_COMPLETO,
  DESTACADO_PAPEL,
  MICROTEXTO_DIRECCION,
  DATOS,
  OPCIONES_FORMATO,
  CONSENTIMIENTO,
  CONSENTIMIENTO_LINK,
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

function Campo({ campo, valor, onCambiar, error }) {
  return (
    <label className="block w-full text-left">
      <span className="text-[14px] font-normal">{campo.label}</span>
      <input
        id={campo.clave}
        name={campo.clave}
        type={campo.tipo}
        autoComplete={campo.autoComplete}
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder={campo.placeholder}
        aria-invalid={error ? 'true' : undefined}
        className="mt-2 w-full rounded-xl border border-borde bg-white px-5 py-4 font-sans text-[16px] font-light text-black outline-none placeholder:text-borde focus:border-tinta focus:ring-0"
      />
      {error && (
        <span className="mt-1 block text-[13px] font-light text-red-600">
          {error}
        </span>
      )}
    </label>
  )
}

export default function Entrega({
  onEnviar,
  enviando,
  erroresServidor,
  errorGeneral,
  cupoPapel,
}) {
  const [persona, setPersona] = useState({ nombre: '', email: '' })
  const [preferencia, setPreferencia] = useState('')
  const [envio, setEnvio] = useState(ENVIO_INICIAL)
  const [consentimiento, setConsentimiento] = useState(false)
  const [erroresLocales, setErroresLocales] = useState({})

  useEffect(() => {
    if (!cupoPapel) setPreferencia('ONLINE')
  }, [cupoPapel])

  const opciones = cupoPapel
    ? OPCIONES_FORMATO
    : OPCIONES_FORMATO.filter((o) => o.valor !== 'PAPEL')

  const quierePapel = preferencia === 'PAPEL'
  const listo =
    Boolean(preferencia) &&
    consentimiento &&
    persona.nombre.trim().length > 0 &&
    persona.email.trim().length > 0 &&
    !enviando

  const errores = { ...erroresLocales, ...erroresServidor }
  const onPersona = (clave) => (valor) => {
    setPersona((previos) => ({ ...previos, [clave]: valor }))
    setErroresLocales((previos) =>
      previos[clave] ? { ...previos, [clave]: undefined } : previos
    )
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setEnvio((previos) => ({ ...previos, [name]: value }))

    setErroresLocales((previos) =>
      previos[name] ? { ...previos, [name]: undefined } : previos
    )
  }

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

          const encontrados = {
            ...validarPersona(persona),
            ...(quierePapel ? validarEnvio(envio) : {}),
          }
          if (Object.keys(encontrados).length > 0) {
            setErroresLocales(encontrados)

            document.getElementById(Object.keys(encontrados)[0])?.focus()
            return
          }

          setErroresLocales({})
          onEnviar({ ...persona, preferencia, envio, consentimiento })
        }}
      >

        <h2 className="font-ivy text-[32px] font-medium italic leading-[1.15] md:text-[48px]">
          {PASO_ENTREGA.titulo}
        </h2>

        <img
          src="/sobre-cerrado.webp"
          alt=""
          width={985}
          height={707}
          className="mt-6 w-full max-w-[300px]"
        />

        {!cupoPapel && (
          <p className="mt-6 w-full text-left text-[14px] font-light">
            {CUPO_COMPLETO}
          </p>
        )}

        <div className="mt-6 w-full space-y-3">
          {opciones.map((opcion) => {
            const destacada = opcion.valor === 'PAPEL'

            const eleccion = (
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl bg-white p-4 text-left ${
                  destacada ? '' : 'border border-borde'
                }`}
              >
                <input
                  type="radio"
                  name="preferencia"
                  value={opcion.valor}
                  checked={preferencia === opcion.valor}
                  onChange={(e) => setPreferencia(e.target.value)}

                  className="mt-0.5 h-5 w-5 shrink-0 border-borde text-black accent-black focus:ring-0"
                />
                <span className="text-[16px] font-light">{opcion.label}</span>
              </label>
            )

            if (!destacada) {
              return <div key={opcion.valor}>{eleccion}</div>
            }

            // La opción en papel va dentro de un marco violeta con el cartel
            // del cupo arriba. El marco crece hacia afuera (-mx-2) para que la
            // fila blanca quede del mismo ancho que la otra opción.
            return (
              <div
                key={opcion.valor}
                className="-mx-2 rounded-[18px] bg-[#6F437C] p-2"
              >
                <p className="px-2 pb-2 pt-1 text-center text-[13px] font-medium uppercase leading-tight tracking-[0.08em] text-white">
                  {DESTACADO_PAPEL}
                </p>
                {eleccion}
              </div>
            )
          })}
        </div>

        <div className="mt-6 grid w-full gap-4 sm:grid-cols-2">
          <Campo
            campo={DATOS.nombre}
            valor={persona.nombre}
            onCambiar={onPersona('nombre')}
            error={errores.nombre}
          />
          <Campo
            campo={DATOS.email}
            valor={persona.email}
            onCambiar={onPersona('email')}
            error={errores.email}
          />
        </div>

        {quierePapel && (
          <fieldset className="mt-6 w-full space-y-6 rounded-xl border border-borde p-5 text-left">
            <legend className="px-2 text-base font-semibold text-tinta">
              ¿A dónde te la enviamos?
            </legend>

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
            {CONSENTIMIENTO}
            <a
              href="/privacidad"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {CONSENTIMIENTO_LINK}
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
