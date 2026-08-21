import { useEffect, useRef, useState } from 'react'
import { Campo } from '@/Components/Campos'

// Key de browser: va en el bundle y es publica por diseño. Lo que la protege es
// la restriccion por referrer y el cap de cuota en la consola de Google.
const KEY =
  process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY ??
  'AIzaSyDdnq_nT018z-HfUerlgtzGLUZrNdz0Pik'

const AUTOCOMPLETE = 'https://places.googleapis.com/v1/places:autocomplete'
const DETALLE = (placeId) => `https://places.googleapis.com/v1/places/${placeId}`

const MINIMO = 4
const ESPERA = 350

// Google devuelve la provincia con variantes que no matchean nuestro select.
// Si ninguna coincide dejamos el campo vacio para que elija: preferimos que
// complete un dato a mano antes que cargarle una provincia equivocada.
const ALIAS_PROVINCIA = {
  caba: 'Ciudad Autónoma de Buenos Aires',
  'capital federal': 'Ciudad Autónoma de Buenos Aires',
  'buenos aires city': 'Ciudad Autónoma de Buenos Aires',
  'ciudad de buenos aires': 'Ciudad Autónoma de Buenos Aires',
  'autonomous city of buenos aires': 'Ciudad Autónoma de Buenos Aires',
  'tierra del fuego, antártida e islas del atlántico sur':
    'Tierra del Fuego',
}

function normalizarProvincia(texto, provincias) {
  if (!texto) return ''
  // "Provincia de Buenos Aires" -> "Buenos Aires"
  const limpio = texto.replace(/^provincia\s+de\s+/i, '').trim()
  const exacta = provincias.find(
    (p) => p.toLowerCase() === limpio.toLowerCase()
  )
  if (exacta) return exacta

  const alias = ALIAS_PROVINCIA[limpio.toLowerCase()]
  if (alias && provincias.includes(alias)) return alias

  // Ultimo intento: que empiece igual ("Tierra del Fuego, Antártida...").
  const parcial = provincias.find(
    (p) =>
      limpio.toLowerCase().startsWith(p.toLowerCase()) ||
      p.toLowerCase().startsWith(limpio.toLowerCase())
  )
  return parcial ?? ''
}

function componente(componentes, tipo) {
  return componentes.find((c) => c.types?.includes(tipo))
}

function armarDatos(componentes, provincias) {
  const texto = (tipo, campo = 'longText') =>
    componente(componentes, tipo)?.[campo] ?? ''

  const calle = texto('route')
  const numero = texto('street_number')

  // En Argentina el numero va despues de la calle.
  const linea = [calle, numero].filter(Boolean).join(' ')

  // CABA manda el barrio en sublocality y la ciudad en locality; el interior
  // suele traer la localidad en locality y el partido en el nivel 2.
  const localidad =
    texto('locality') ||
    texto('administrative_area_level_2') ||
    texto('sublocality_level_1') ||
    texto('sublocality')

  // Puede venir como CPA ("C1425DGH"): nos quedamos con los 4 digitos.
  const cpCrudo = texto('postal_code')
  const digitos = cpCrudo.replace(/\D/g, '')
  const cp = digitos.length >= 4 ? digitos.slice(0, 4) : digitos

  return {
    calle: linea,
    localidad,
    provincia: normalizarProvincia(
      texto('administrative_area_level_1'),
      provincias
    ),
    cp,
  }
}

export default function AutocompleteCalle({
  id,
  label,
  value,
  onChange,
  onElegir,
  error,
  provincias,
  className,
}) {
  const [sugerencias, setSugerencias] = useState([])
  const [abierto, setAbierto] = useState(false)
  const [resaltada, setResaltada] = useState(-1)
  const [buscando, setBuscando] = useState(false)

  // Un token por sesion de busqueda. Cerrarla con el detalle es lo que hace que
  // las pulsaciones caigan en el SKU gratis en vez de cobrarse por request.
  const token = useRef(null)
  const contenedor = useRef(null)
  // Para descartar respuestas que llegan fuera de orden.
  const ultimaBusqueda = useRef(0)

  useEffect(() => {
    const afuera = (e) => {
      if (contenedor.current && !contenedor.current.contains(e.target)) {
        setAbierto(false)
      }
    }
    document.addEventListener('mousedown', afuera)
    return () => document.removeEventListener('mousedown', afuera)
  }, [])

  useEffect(() => {
    const texto = value?.trim() ?? ''
    if (texto.length < MINIMO) {
      setSugerencias([])
      return
    }

    const timer = setTimeout(async () => {
      if (!token.current) token.current = crypto.randomUUID()
      const marca = ++ultimaBusqueda.current
      setBuscando(true)

      try {
        const res = await fetch(AUTOCOMPLETE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': KEY,
          },
          body: JSON.stringify({
            input: texto,
            sessionToken: token.current,
            includedRegionCodes: ['ar'],
            languageCode: 'es',
          }),
        })
        if (!res.ok) throw new Error(`autocomplete ${res.status}`)
        const data = await res.json()
        if (marca !== ultimaBusqueda.current) return

        const items = (data.suggestions ?? [])
          .map((s) => s.placePrediction)
          .filter(Boolean)
          .map((p) => ({
            id: p.placeId,
            principal: p.structuredFormat?.mainText?.text ?? p.text?.text ?? '',
            secundario: p.structuredFormat?.secondaryText?.text ?? '',
          }))

        setSugerencias(items)
        setAbierto(items.length > 0)
        setResaltada(-1)
      } catch (e) {
        // Si Google falla el campo sigue siendo un input de texto comun: nadie
        // se queda sin poder cargar su direccion por esto.
        console.warn('[autocomplete] no pudimos buscar sugerencias:', e.message)
        setSugerencias([])
        setAbierto(false)
      } finally {
        if (marca === ultimaBusqueda.current) setBuscando(false)
      }
    }, ESPERA)

    return () => clearTimeout(timer)
  }, [value])

  const elegir = async (sug) => {
    setAbierto(false)
    setSugerencias([])

    try {
      const res = await fetch(`${DETALLE(sug.id)}?languageCode=es`, {
        headers: {
          'X-Goog-Api-Key': KEY,
          'X-Goog-FieldMask': 'addressComponents,formattedAddress',
        },
      })
      if (!res.ok) throw new Error(`detalle ${res.status}`)
      const data = await res.json()

      const datos = armarDatos(data.addressComponents ?? [], provincias)
      // Si Google no trajo la calle nos quedamos con lo que eligió la persona.
      onElegir({ ...datos, calle: datos.calle || sug.principal })
    } catch (e) {
      console.warn('[autocomplete] no pudimos traer el detalle:', e.message)
      // Al menos dejamos la calle que eligió; el resto lo completa a mano.
      onElegir({ calle: sug.principal })
    } finally {
      // El detalle cierra la sesión: la próxima búsqueda arranca una nueva.
      token.current = null
    }
  }

  const onKeyDown = (e) => {
    if (!abierto || sugerencias.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setResaltada((i) => (i + 1) % sugerencias.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setResaltada((i) => (i <= 0 ? sugerencias.length - 1 : i - 1))
    } else if (e.key === 'Enter' && resaltada >= 0) {
      e.preventDefault()
      elegir(sugerencias[resaltada])
    } else if (e.key === 'Escape') {
      setAbierto(false)
    }
  }

  return (
    <div ref={contenedor} className={`relative ${className ?? ''}`}>
      <Campo
        id={id}
        label={label}
        error={error}
        ayuda={
          buscando
            ? 'Buscando...'
            : 'Empezá a escribir y elegí de la lista, así completamos el resto.'
        }
      >
        <input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => sugerencias.length > 0 && setAbierto(true)}
          autoComplete="off"
          role="combobox"
          aria-expanded={abierto}
          aria-autocomplete="list"
          aria-invalid={error ? 'true' : undefined}
          className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </Campo>

      {abierto && sugerencias.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {sugerencias.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => elegir(s)}
                onMouseEnter={() => setResaltada(i)}
                className={`block w-full px-4 py-2.5 text-left text-sm ${
                  i === resaltada ? 'bg-primary-50' : 'bg-white'
                }`}
              >
                <span className="font-medium text-gray-900">{s.principal}</span>
                {s.secundario && (
                  <span className="ml-1 font-light text-gray-500">
                    {s.secundario}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
