import { useEffect, useRef, useState } from 'react'
import Portada from '@/Components/Portada'
import Animacion from '@/Components/Animacion'
import Carta from '@/Components/Carta'
import Entrega from '@/Components/Entrega'
import Confirmacion from '@/Components/Confirmacion'
import { consultarCupo, enviarCarta } from '@/lib/carta'

const FUNDIDO = 500
const APERTURA = 3400
const CIERRE = 2200

export default function Flujo({ origen }) {
  const [paso, setPaso] = useState('portada')
  const [texto, setTexto] = useState('')
  const [visible, setVisible] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erroresServidor, setErroresServidor] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [cupo, setCupo] = useState(null)
  const reloj = useRef(null)
  const relojVideo = useRef(null)
  const corriendo = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(reloj.current)
      clearTimeout(relojVideo.current)
    },
    []
  )

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

  function fundir(cambio) {
    setVisible(false)
    reloj.current = setTimeout(() => {
      cambio()
      setVisible(true)
    }, FUNDIDO)
  }

  function arrancarVideo(destino, respaldo) {
    corriendo.current = destino
    relojVideo.current = setTimeout(() => terminarVideo(destino), respaldo)
  }

  function terminarVideo(destino) {
    if (corriendo.current !== destino) return
    corriendo.current = null
    clearTimeout(relojVideo.current)
    fundir(() => setPaso(destino))
  }

  function empezar() {
    if (!visible) return
    fundir(() => setPaso('abriendo'))
    arrancarVideo('carta', APERTURA)
  }

  function cerrar() {
    fundir(() => setPaso('cerrando'))
    arrancarVideo('entrega', CIERRE)
  }

  async function enviar({ nombre, email, preferencia, envio, consentimiento }) {
    setEnviando(true)
    setErroresServidor({})
    setErrorGeneral('')

    const respuesta = await enviarCarta({
      nombre,
      email,
      mensaje: texto,
      preferencia,

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
      fundir(() => setPaso('listo'))
      return
    }

    if (respuesta.errores) {
      setErroresServidor(respuesta.errores)
      setErrorGeneral('Revisá los campos marcados.')
      return
    }

    setErrorGeneral(respuesta.error)
  }

  return (
    <div
      className={`flex flex-col gap-4 bg-crema p-4 md:gap-6 md:p-6 xl:p-8 wide:gap-8 wide:p-10 ${
        paso === 'portada' ? 'una-pantalla' : 'min-h-screen'
      }`}
    >
      <header className="flex justify-center">
        <img
          src="/logo.svg"
          alt="En Palabras"
          width={121}
          height={41}
          className="h-8 w-auto md:h-[41px]"
        />
      </header>

      <div
        className={`flex min-h-0 flex-1 flex-col transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {paso === 'portada' ? (
          <Portada onEmpezar={empezar} />
        ) : paso === 'abriendo' || paso === 'cerrando' ? (
          <Animacion
            cual={paso}
            onTerminada={() =>
              terminarVideo(paso === 'abriendo' ? 'carta' : 'entrega')
            }
          />
        ) : paso === 'carta' ? (
          <Carta texto={texto} onCambiar={setTexto} onEnviar={cerrar} />
        ) : paso === 'entrega' ? (
          <Entrega
            onEnviar={enviar}
            enviando={enviando}
            erroresServidor={erroresServidor}
            errorGeneral={errorGeneral}

            cupoPapel={cupo ? cupo.disponible : true}
          />
        ) : (
          <Confirmacion />
        )}
      </div>
    </div>
  )
}
