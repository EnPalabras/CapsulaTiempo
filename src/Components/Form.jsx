import { useState } from 'react'
import { Input, Select, Campo, RadioGrupo } from '@/Components/Campos'
import AutocompleteCalle from '@/Components/AutocompleteCalle'
import Prompts from '@/Components/Prompts'
import Confirmacion from '@/Components/Confirmacion'
import {
  MAX_MENSAJE,
  PROVINCIAS,
  AVISO_ENTREGA,
  OPCIONES_FORMATO,
  MICROTEXTO_DIRECCION,
} from '@/constants/campana'

// NEXT_PUBLIC_API_URL solo hace falta para apuntar a otro lado (un localhost,
// una preview). Se hornea en el build, no se lee en runtime.
const API =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://server-en-palabras.vercel.app'

const FORM_INICIAL = {
  mensaje: '',
  nombre: '',
  email: '',
  preferencia: '',
  envioCalle: '',
  envioPisoDepto: '',
  envioLocalidad: '',
  envioProvincia: '',
  envioCp: '',
  envioTelefono: '',
  consentimiento: false,
}

// Espejo de la validación del backend. Acá es para no hacer viajar un form que
// ya sabemos que va a rebotar; la validación que manda es la del server.
function validar(form) {
  const e = {}

  const largo = form.mensaje.trim().length
  if (largo === 0) e.mensaje = 'Escribile algo a tu yo del futuro'
  else if (largo > MAX_MENSAJE)
    e.mensaje = `Te pasaste por ${largo - MAX_MENSAJE} caracteres`

  if (!form.nombre.trim()) e.nombre = 'Contanos tu nombre y apellido'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    e.email = 'Revisá el email, parece incompleto'

  if (!form.preferencia)
    e.preferencia = 'Elegí cómo querés recibir tu carta'

  // La dirección solo se exige a quien pidió la carta impresa.
  if (form.preferencia === 'PAPEL') {
    if (!form.envioCalle.trim()) e.envioCalle = 'Calle y número'
    if (!form.envioLocalidad.trim()) e.envioLocalidad = 'Localidad'
    if (!form.envioProvincia) e.envioProvincia = 'Elegí una provincia'
    if (form.envioCp.replace(/\D/g, '').length !== 4)
      e.envioCp = 'Son 4 números'

    // Igual de flojo que el backend: no vale perder una carta porque alguien
    // escribió el 0, el 15 o el +54.
    const telefono = form.envioTelefono.replace(/\D/g, '')
    if (telefono.length < 8) e.envioTelefono = 'Falta la característica'
    else if (telefono.length > 15) e.envioTelefono = 'Tiene números de más'
  }

  if (!form.consentimiento)
    e.consentimiento = 'Necesitamos que aceptes el aviso de privacidad'

  return e
}

export default function Form({ origen }) {
  const [form, setForm] = useState(FORM_INICIAL)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState('')
  const [resultado, setResultado] = useState(null)

  const onChange = (e) => {
    const { name, type, checked, value } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    // Limpiamos el error del campo al tocarlo, no en cada tecla del form entero.
    setErrores((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const restantes = MAX_MENSAJE - form.mensaje.length
  const quierePapel = form.preferencia === 'PAPEL'

  // Cuando elige una sugerencia de Google, la calle viene resuelta y el resto
  // se completa solo. Lo que Google no trajo queda como estaba, para que lo
  // pueda cargar a mano.
  const onElegirDireccion = ({ calle, localidad, provincia, cp }) => {
    setForm((f) => ({
      ...f,
      envioCalle: calle ?? f.envioCalle,
      envioLocalidad: localidad || f.envioLocalidad,
      envioProvincia: provincia || f.envioProvincia,
      envioCp: cp || f.envioCp,
    }))
    setErrores((prev) => ({
      ...prev,
      envioCalle: undefined,
      envioLocalidad: localidad ? undefined : prev.envioLocalidad,
      envioProvincia: provincia ? undefined : prev.envioProvincia,
      envioCp: cp ? undefined : prev.envioCp,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorGeneral('')

    const encontrados = validar(form)
    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados)
      // Llevamos el foco al primer campo con problema.
      document.getElementById(Object.keys(encontrados)[0])?.focus()
      return
    }

    setEnviando(true)
    try {
      const res = await fetch(`${API}/api/carta-futuro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
          preferencia: form.preferencia,
          // Quien eligió mail no manda dirección: es lo que le prometimos.
          envio: quierePapel
            ? {
                calle: form.envioCalle,
                pisoDepto: form.envioPisoDepto,
                localidad: form.envioLocalidad,
                provincia: form.envioProvincia,
                cp: form.envioCp,
                telefono: form.envioTelefono,
              }
            : undefined,
          consentimiento: form.consentimiento,
          origen: origen?.nombre,
          utm: origen?.utm,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setResultado({
          formato: data.formato,
          preferencia: form.preferencia,
          duplicada: data.duplicada,
          nombre: form.nombre.trim(),
        })
        return
      }

      if (data?.errores) {
        // El backend nombra los campos anidados como "envio.cp": los mapeamos
        // a los ids planos del form.
        const mapeados = {}
        for (const [campo, mensaje] of Object.entries(data.errores)) {
          const plano = campo.startsWith('envio.')
            ? 'envio' + campo.slice(6).charAt(0).toUpperCase() + campo.slice(7)
            : campo
          mapeados[plano] = mensaje
        }
        setErrores(mapeados)
        setErrorGeneral('Revisá los campos marcados.')
      } else {
        setErrorGeneral(
          data?.error ?? 'Algo salió mal. Probá de nuevo en un momento.'
        )
      }
    } catch {
      setErrorGeneral(
        'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.'
      )
    } finally {
      setEnviando(false)
    }
  }

  if (resultado) return <Confirmacion {...resultado} />

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900">
          ¿Qué te gustaría decirle a tu <i>&quot;yo del futuro&quot;</i>?
        </h1>
        <p className="mb-8 text-center text-lg font-light text-gray-500 sm:text-xl">
          Los días pasan tan rápido que es muy fácil perder de vista nuestros
          deseos personales, aprendizajes y el camino recorrido. Te invitamos a
          escribirte una carta contándote eso que creés que a tu{' '}
          <i>&quot;yo del futuro&quot;</i> le gustaría recordar.
        </p>

        <p className="mb-10 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-center text-sm font-medium text-primary-900">
          {AVISO_ENTREGA}
        </p>

        <form onSubmit={handleSubmit} className="space-y-10" noValidate>
          {/* La carta va primera: es el CTA. Los datos vienen después. */}
          <div className="space-y-6">
            <Prompts />

            <Campo id="mensaje" label="Tu carta" error={errores.mensaje}>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="10"
                value={form.mensaje}
                onChange={onChange}
                maxLength={MAX_MENSAJE}
                placeholder="Escribile a la persona que vas a ser en unos meses."
                aria-invalid={errores.mensaje ? 'true' : undefined}
                className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                  errores.mensaje ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <p
                aria-live="polite"
                className={`mt-1 text-right text-xs ${
                  restantes <= 100 ? 'text-amber-600' : 'text-gray-500'
                }`}
              >
                {restantes} caracteres disponibles
              </p>
            </Campo>
          </div>

          <div className="space-y-6 border-t border-gray-200 pt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                id="nombre"
                label="Nombre y apellido"
                value={form.nombre}
                onChange={onChange}
                error={errores.nombre}
                autoComplete="name"
              />
              <Input
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={onChange}
                error={errores.email}
                placeholder="tunombre@mail.com"
                autoComplete="email"
                ayuda="Acá te mandamos la confirmación."
              />
            </div>

            <RadioGrupo
              name="preferencia"
              label="¿Cómo querés recibir tu carta?"
              value={form.preferencia}
              onChange={onChange}
              opciones={OPCIONES_FORMATO}
              error={errores.preferencia}
            />

            {quierePapel && (
              <fieldset className="space-y-6 rounded-lg border border-gray-200 p-5">
                <legend className="px-2 text-sm font-semibold text-gray-900">
                  ¿A dónde te la enviamos?
                </legend>

                <p className="text-sm font-light leading-relaxed text-gray-500">
                  {MICROTEXTO_DIRECCION}
                </p>

                <div className="grid gap-6 sm:grid-cols-3">
                  <AutocompleteCalle
                    id="envioCalle"
                    label="Calle y número"
                    value={form.envioCalle}
                    onChange={onChange}
                    onElegir={onElegirDireccion}
                    error={errores.envioCalle}
                    provincias={PROVINCIAS}
                    className="sm:col-span-2"
                  />
                  <Input
                    id="envioPisoDepto"
                    label="Piso y depto"
                    value={form.envioPisoDepto}
                    onChange={onChange}
                    opcional
                    autoComplete="address-line2"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    id="envioLocalidad"
                    label="Localidad"
                    value={form.envioLocalidad}
                    onChange={onChange}
                    error={errores.envioLocalidad}
                    autoComplete="address-level2"
                  />
                  <Select
                    id="envioProvincia"
                    label="Provincia"
                    value={form.envioProvincia}
                    onChange={onChange}
                    error={errores.envioProvincia}
                    opciones={PROVINCIAS}
                    placeholder="Elegí una provincia"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    id="envioCp"
                    label="Código postal"
                    value={form.envioCp}
                    onChange={onChange}
                    error={errores.envioCp}
                    inputMode="numeric"
                    placeholder="1425"
                    autoComplete="postal-code"
                  />
                  <Input
                    id="envioTelefono"
                    label="Teléfono"
                    value={form.envioTelefono}
                    onChange={onChange}
                    error={errores.envioTelefono}
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

            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentimiento"
                  name="consentimiento"
                  checked={form.consentimiento}
                  onChange={onChange}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="consentimiento"
                  className="text-sm font-light text-gray-600"
                >
                  Acepto que usen mis datos para enviarme esta carta, según el{' '}
                  <a
                    href="/privacidad"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary-700 underline"
                  >
                    aviso de privacidad
                  </a>
                  .
                </label>
              </div>
              {errores.consentimiento && (
                <p className="mt-1 text-xs text-red-600">
                  {errores.consentimiento}
                </p>
              )}
            </div>

            {errorGeneral && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {errorGeneral}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-lg bg-primary-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {enviando ? 'Guardando tu carta...' : 'Enviar mi carta al futuro'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
