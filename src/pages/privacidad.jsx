import Head from 'next/head'

export default function Privacidad() {
  return (
    <>
      <Head>
        <title>Aviso de privacidad · Carta a tu yo del futuro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-screen-md space-y-4 px-4 py-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Aviso de privacidad
          </h1>
          <div className="space-y-4 text-sm font-light leading-relaxed text-gray-600">
            <p>
              Los datos que nos dejás, que son tu nombre, tu e-mail, tu
              dirección de envío, tu teléfono y el texto de tu carta, los usamos
              para hacerte llegar la carta que escribiste, en papel o por
              e-mail, en los primeros días de enero de 2027. No se los cedemos a
              terceros, salvo al correo o servicio de mensajería que necesitamos
              para poder enviarte la carta física.
            </p>
            <p>
              También usamos tu e-mail para enviarte comunicaciones de En
              Palabras, como novedades, contenidos y promociones. Podés darte de
              baja de estos envíos en cualquier momento, desde el enlace que va
              al pie de cada mail o escribiéndonos.
            </p>
            <p>
              Conservamos tu dirección de envío y el texto de tu carta solo el
              tiempo necesario para hacerte el envío, y una vez enviada los
              eliminamos. Tu e-mail lo conservamos mientras sigas suscripto a
              nuestras comunicaciones.
            </p>
            <p>
              En cualquier momento podés pedirnos acceder a tus datos,
              rectificarlos o solicitar que los eliminemos, escribiéndonos a{' '}
              <a
                href="mailto:info@enpalabras.com.ar"
                className="underline"
              >
                info@enpalabras.com.ar
              </a>
              . Como titular de los datos, tenés ese derecho conforme a la Ley
              25.326 de Protección de los Datos Personales.
            </p>
            <p>
              La Agencia de Acceso a la Información Pública, como órgano de
              control de la Ley 25.326, tiene la atribución de atender las
              denuncias y reclamos de quienes resulten afectados en sus
              derechos.
            </p>
            <p>
              Al enviar tu carta y tildar la casilla de consentimiento, aceptás
              este aviso y el uso de tus datos para las finalidades que te
              contamos acá.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
