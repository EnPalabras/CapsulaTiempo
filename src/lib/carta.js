// Espejo de la validación del backend (server_en_palabras,
// src/app/api/carta-futuro/route.ts). Acá es para no hacer viajar un envío que
// ya sabemos que va a rebotar: la validación que manda es la del server.

// NEXT_PUBLIC_API_URL solo hace falta para apuntar a otro lado (un localhost,
// una preview). Se hornea en el build, no se lee en runtime.
const API =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://server-en-palabras.vercel.app'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Solo se le exige dirección a quien pidió la carta impresa.
export function validarEnvio(envio) {
  const e = {}

  if (!envio.envioCalle.trim()) e.envioCalle = 'Calle y número'
  if (!envio.envioLocalidad.trim()) e.envioLocalidad = 'Localidad'
  if (!envio.envioProvincia) e.envioProvincia = 'Elegí una provincia'
  if (envio.envioCp.replace(/\D/g, '').length !== 4) e.envioCp = 'Son 4 números'

  // Igual de flojo que el backend: no vale perder una carta porque alguien
  // escribió el 0, el 15 o el +54.
  const telefono = envio.envioTelefono.replace(/\D/g, '')
  if (telefono.length < 8) e.envioTelefono = 'Falta la característica'
  else if (telefono.length > 15) e.envioTelefono = 'Tiene números de más'

  return e
}

// El backend nombra los campos anidados como "envio.cp": los pasamos a los ids
// planos que usan los inputs.
function aplanar(errores) {
  const mapeados = {}
  for (const [campo, mensaje] of Object.entries(errores)) {
    const plano = campo.startsWith('envio.')
      ? 'envio' + campo.slice(6).charAt(0).toUpperCase() + campo.slice(7)
      : campo
    mapeados[plano] = mensaje
  }
  return mapeados
}

// Devuelve siempre lo mismo: o salió, o hay errores por campo, o hay un error
// para mostrar entero. Nunca tira.
export async function enviarCarta(cuerpo) {
  try {
    const res = await fetch(`${API}/api/carta-futuro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
    })

    const data = await res.json()

    if (res.ok) return { ok: true, data }
    if (data?.errores) return { ok: false, errores: aplanar(data.errores) }
    return {
      ok: false,
      error: data?.error ?? 'Algo salió mal. Probá de nuevo en un momento.',
    }
  } catch {
    return {
      ok: false,
      error: 'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.',
    }
  }
}

// Cuántas cartas impresas quedan. Devuelve null para cualquier problema —el
// endpoint caído, sin conexión, una respuesta rara— y ese null significa "no
// sé": la landing muestra las dos opciones, que es lo que hacía antes de que
// esto existiera. Nunca frena el flujo.
export async function consultarCupo() {
  try {
    const control = new AbortController()
    const reloj = setTimeout(() => control.abort(), 4000)
    const res = await fetch(`${API}/api/carta-futuro/cupo`, {
      signal: control.signal,
    })
    clearTimeout(reloj)

    if (!res.ok) return null
    const data = await res.json()
    return typeof data?.disponible === 'boolean' ? data : null
  } catch {
    return null
  }
}
