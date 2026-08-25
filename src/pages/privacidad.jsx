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
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Texto pendiente. Va el aviso definitivo antes de publicar.
          </p>
          <div className="space-y-4 text-sm font-light leading-relaxed text-gray-600">
            <p>
              Usamos tus datos con un solo fin: hacerte llegar la carta que
              escribiste, en papel o por mail, en los primeros días de enero.
            </p>
            <p>
              Guardamos tu nombre, tu email, tu dirección de envío, tu teléfono
              y el texto de tu carta. No leemos las cartas: se imprimen o se
              envían selladas.
            </p>
            <p>
              Después del envío borramos la dirección y el texto. Podés pedirnos
              acceso, rectificación o supresión de tus datos en cualquier momento
              escribiendo a <b>[mail de contacto]</b>, conforme a la Ley 25.326
              de Protección de los Datos Personales.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
