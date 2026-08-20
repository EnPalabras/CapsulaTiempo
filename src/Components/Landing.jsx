import Head from 'next/head'
import Form from '@/Components/Form'
import Cerrada from '@/Components/Cerrada'

export default function Landing({ abierta, origen }) {
  return (
    <>
      <Head>
        <title>Carta a tu yo del futuro · En Palabras</title>
        {/* Se llega solo por QR o por DM: no queremos esta página en buscadores. */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-white">
        {abierta ? <Form origen={origen} /> : <Cerrada />}
      </main>
    </>
  )
}
