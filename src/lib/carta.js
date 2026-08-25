const API =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://server-en-palabras.vercel.app'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarPersona({ nombre, email }) {
  const e = {}
  if (!nombre.trim()) e.nombre = 'Contanos cómo te llamás'
  if (!EMAIL.test(email.trim())) e.email = 'Revisá el e-mail, parece incompleto'
  return e
}

export function validarEnvio(envio) {
  const e = {}

  if (!envio.envioCalle.trim()) e.envioCalle = 'Calle y número'
  if (!envio.envioLocalidad.trim()) e.envioLocalidad = 'Localidad'
  if (!envio.envioProvincia) e.envioProvincia = 'Elegí una provincia'
  if (envio.envioCp.replace(/\D/g, '').length !== 4) e.envioCp = 'Son 4 números'

  const telefono = envio.envioTelefono.replace(/\D/g, '')
  if (telefono.length < 8) e.envioTelefono = 'Falta la característica'
  else if (telefono.length > 15) e.envioTelefono = 'Tiene números de más'

  return e
}

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
