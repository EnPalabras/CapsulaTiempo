import { useEffect, useRef, useState } from 'react'
import Portada from '@/Components/Portada'
import Datos from '@/Components/Datos'
import Carta from '@/Components/Carta'
import Cerrando from '@/Components/Cerrando'
import Entrega from '@/Components/Entrega'
import Confirmacion from '@/Components/Confirmacion'
import { CAMPOS } from '@/constants/campana'
import { consultarCupo, enviarCarta } from '@/lib/carta'

// Milisegundos del fundido. Tiene que coincidir con el `duration-500` de las
// clases: primero se apaga lo que está, recién ahí se cambia y se prende lo
// nuevo, así el cambio no es un corte seco.
const FUNDIDO = 500

// Lo que tarda el sobre en irse al centro, un poco más que el `duration-700`
// del grid para no pisar el final del movimiento con el video.
const CENTRADO = 800

// Si un video por lo que sea no arranca —autoplay rechazado, archivo que no
// cargó— nadie dispara su `onEnded` y el flujo se queda clavado ahí para
// siempre. Estos respaldos avanzan igual. El de apertura son los 2s del video;
// el de cierre suma el fundido de entrada y la espera antes de reproducir.
const APERTURA = 2600
const CIERRE = 2400

export default function Flujo({ origen }) {
  // portada → nombre → email → centrando → abriendo → carta → cerrando →
  // entrega → listo
  const [paso, setPaso] = useState('portada')
  const [datos, setDatos] = useState({ nombre: '', email: '' })
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erroresServidor, setErroresServidor] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [resultado, setResultado] = useState(null)
  // null = todavía no sabemos si queda cupo de papel.
  const [cupo, setCupo] = useState(null)
  // Dos fundidos distintos: salir de la portada cambia la pantalla entera, pero
  // pasar de nombre a e-mail cambia solo el campo —el sobre se queda quieto.
  const [panelVisible, setPanelVisible] = useState(true)
  const [campoVisible, setCampoVisible] = useState(true)
  const reloj = useRef(null)
  const relojVideo = useRef(null)
  // Cada video termina una sola vez: o lo avisa él, o lo da por terminado el
  // respaldo. El que llegue segundo no hace nada.
  const corriendo = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(reloj.current)
      clearTimeout(relojVideo.current)
    },
    []
  )

  // Se pregunta al entrar a escribir la carta y no al llegar a la entrega:
  // desde acá hay minutos de margen, así que la respuesta llega mucho antes de
  // que la pantalla se muestre y las opciones no parpadean. El dato queda un
  // rato viejo, pero la carrera por el último lugar la resuelve el backend, que
  // degrada a mail solo.
  useEffect(() => {
    if (paso !== 'carta') return
    let vivo = true
    consultarCupo().then((datos) => {
      if (vivo) setCupo(datos)
    })
    return () => {
      vivo = false
    }
  }, [paso])

  function fundir(prender, cambio) {
    prender(false)
    reloj.current = setTimeout(() => {
      cambio()
      prender(true)
    }, FUNDIDO)
  }

  function empezar() {
    // Si ya está fundiendo, un segundo click no arranca otro fundido encima.
    if (!panelVisible) return
    fundir(setPanelVisible, () => setPaso('nombre'))
  }

  function siguiente() {
    if (!campoVisible) return
    if (paso === 'nombre') {
      fundir(setCampoVisible, () => setPaso('email'))
      return
    }
    // Desde el e-mail: se apaga el campo, el sobre se va al centro y ahí
    // arranca el video de la carta saliendo.
    setCampoVisible(false)
    setPaso('centrando')
    reloj.current = setTimeout(() => {
      setPaso('abriendo')
      arrancarVideo('carta', APERTURA)
    }, CENTRADO)
  }

  // `destino` es el paso al que lleva ese video, y también sirve de guardia.
  function arrancarVideo(destino, respaldo) {
    corriendo.current = destino
    relojVideo.current = setTimeout(() => terminarVideo(destino), respaldo)
  }

  function terminarVideo(destino) {
    if (corriendo.current !== destino) return
    corriendo.current = null
    clearTimeout(relojVideo.current)
    fundir(setPanelVisible, () => setPaso(destino))
  }

  async function enviar({ preferencia, envio, consentimiento }) {
    setEnviando(true)
    setErroresServidor({})
    setErrorGeneral('')

    const respuesta = await enviarCarta({
      nombre: datos.nombre,
      email: datos.email,
      mensaje: texto,
      preferencia,
      // Quien eligió mail no manda dirección: es lo que le prometimos.
      envio:
        preferencia === 'PAPEL'
          ? {
              calle: envio.envioCalle,
              pisoDepto: envio.envioPisoDepto,
              localidad: envio.envioLocalidad,
              provincia: envio.envioProvincia,
              cp: envio.envioCp,
              telefono: envio.envioTelefono,
            }
          : undefined,
      consentimiento,
      origen: origen?.nombre,
      utm: origen?.utm,
    })

    setEnviando(false)

    if (respuesta.ok) {
      setResultado({
        formato: respuesta.data.formato,
        preferencia,
        duplicada: respuesta.data.duplicada,
        nombre: datos.nombre.trim(),
      })
      fundir(setPanelVisible, () => setPaso('listo'))
      return
    }

    if (respuesta.errores) {
      setErroresServidor(respuesta.errores)
      setErrorGeneral('Revisá los campos marcados.')
      return
    }

    setErrorGeneral(respuesta.error)
  }

  function cerrar() {
    fundir(setPanelVisible, () => setPaso('cerrando'))
    arrancarVideo('entrega', CIERRE)
  }

  const enDatos = paso === 'nombre' || paso === 'email'
  // Mientras el sobre se centra y se abre seguimos en la pantalla del e-mail,
  // ya sin el campo a la vista.
  const campo = CAMPOS[enDatos ? paso : 'email']

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-crema p-4 md:gap-6 md:p-6 xl:p-8 wide:gap-8 wide:p-10">
      <header>
        {/* El SVG ya viene en #301E11, no hace falta pintarlo. next/image no
            optimiza SVG (lo sirve tal cual), así que acá no aporta nada. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="En Palabras"
          width={121}
          height={41}
          className="h-8 w-auto md:h-[41px]"
        />
      </header>

      {/* El logo y el fondo crema no se tocan entre pasos: lo que funde es
          únicamente lo de acá adentro. */}
      <div
        className={`flex min-h-0 flex-1 flex-col transition-opacity duration-500 ${
          panelVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {paso === 'portada' ? (
          <Portada onEmpezar={empezar} />
        ) : paso === 'carta' ? (
          <Carta
            valores={datos}
            texto={texto}
            onCambiar={setTexto}
            onEnviar={cerrar}
          />
        ) : paso === 'cerrando' ? (
          <Cerrando onCerrado={() => terminarVideo('entrega')} />
        ) : paso === 'entrega' ? (
          <Entrega
            onEnviar={enviar}
            enviando={enviando}
            erroresServidor={erroresServidor}
            errorGeneral={errorGeneral}
            // Si no pudimos preguntar, se ofrecen las dos opciones: es mejor
            // pedir una dirección de más que esconder el papel habiendo cupo.
            cupoPapel={cupo ? cupo.disponible : true}
          />
        ) : paso === 'listo' ? (
          <Confirmacion {...resultado} />
        ) : (
          <Datos
            campo={campo}
            valor={datos[campo.clave]}
            onCambiar={(v) =>
              setDatos((previos) => ({ ...previos, [campo.clave]: v }))
            }
            onSiguiente={siguiente}
            valores={datos}
            campoVisible={campoVisible}
            centrado={!enDatos}
            abriendo={paso === 'abriendo'}
            onAbierto={() => terminarVideo('carta')}
          />
        )}
      </div>
    </div>
  )
}
