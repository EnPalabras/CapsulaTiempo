import { useEffect, useRef } from 'react'
import { ETIQUETAS } from '@/constants/campana'

// Lienzo del asset, en píxeles del archivo.
const ANCHO = 1232
const ALTO = 1700

// Cuánto aire de arriba se descuenta. 498 es todo el que hay sobre la punta de
// la solapa: deja el sobre pegado al borde de su caja (equivale a -250px con el
// sobre renderizado a 620 de ancho, pero en proporción, así no se rompe en
// otras pantallas).
//
// OJO: de esos 498 el papel usa 414 al salir. Mientras corre el video el papel
// se dibuja por encima del borde de la caja, sobre el logo. Si molesta, este es
// el número a bajar —84 es el aire que no usa ningún frame.
const AIRE = 498

export default function Sobre({ valores, abriendo, onAbierto }) {
  const video = useRef(null)
  const nombre = valores.nombre.trim()
  const email = valores.email.trim()

  useEffect(() => {
    if (!abriendo) return
    const el = video.current
    if (!el) return
    // React no escribe el atributo `muted` en el HTML del server (bug viejo y
    // conocido), así que al hidratar el video queda con sonido y la política de
    // autoplay le rechaza el play(). Se pone a mano antes de arrancar.
    el.muted = true
    el.currentTime = 0
    // Si el navegador igual lo rechaza, no pasa nada: el flujo tiene su propio
    // temporizador de respaldo y sigue de largo.
    el.play().catch(() => {})
  }, [abriendo])

  return (
    <div className="flex items-center justify-center">
      {/* Esta caja fija el ancho del asset; el margen negativo de `.sobre` se
          calcula contra ella, así que las dos tienen que medir lo mismo.

          El ancho va en vw y no en %: si dependiera de la columna, al cerrarse
          la primera el sobre se agrandaría de golpe hasta ocupar la pantalla
          entera. 36vw está calibrado para dar casi exactamente lo que mide la
          columna en el layout de a dos, así que el sobre no cambia de tamaño
          cuando se va al centro. */}
      <div className="w-full max-w-[700px] md:w-[36vw]">
        <div className="sobre relative" style={{ '--aire': AIRE }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sobre-abierto.webp"
            alt=""
            width={ANCHO}
            height={ALTO}
            className="w-full"
          />

          {/* El primer frame del video es exactamente esta imagen, así que
              aparecer encima no se nota: el sobre no salta. Se precarga desde
              el primer paso para que al momento de reproducir ya esté. */}
          <video
            ref={video}
            className={`absolute inset-0 h-full w-full transition-opacity duration-200 ${
              abriendo ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={onAbierto}
          >
            <source src="/video/sobre-abriendo.webm" type="video/webm" />
            <source src="/video/sobre-abriendo.mp4" type="video/mp4" />
          </video>

          {/* Escrito sobre el sobre. El 62% del lienzo es el centro del cuerpo
              del sobre, que es donde caían los ~550px a ojo. Se va cuando
              arranca el video: si no, el papel al salir le pasa por encima. */}
          <div
            className={`absolute inset-x-0 bottom-[3%] -translate-y-1/2 text-center text-tinta transition-opacity duration-300 ${
              abriendo ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <p
              className={`text-[12px] font-light transition-opacity duration-300 ${
                nombre ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {ETIQUETAS.para}
            </p>
            <p className="text-[16px] font-light">{nombre}</p>

            <p
              className={`mt-3 text-[12px] font-light transition-opacity duration-300 ${
                email ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {ETIQUETAS.email}
            </p>
            <p className="text-[16px] font-light">{email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
