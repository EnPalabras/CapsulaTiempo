import Head from 'next/head'
import Flujo from '@/Components/Flujo'
import Cerrada from '@/Components/Cerrada'

const TITULO = 'Carta a tu yo del futuro · En Palabras'
const DESCRIPCION =
  'Escribile una carta a la persona que vas a ser. Te la hacemos llegar en los primeros días de enero.'
const SITIO = 'https://carta.enpalabras.com.ar'

export default function Landing({ abierta, origen }) {
  return (
    <>
      <Head>
        <title>{TITULO}</title>
        <meta name="description" content={DESCRIPCION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="robots" content="noindex, nofollow" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="En Palabras" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:title" content={TITULO} />
        <meta property="og:description" content={DESCRIPCION} />
        <meta property="og:url" content={SITIO} />

        <meta property="og:image" content={`${SITIO}/og.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="En Palabras" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITULO} />
        <meta name="twitter:description" content={DESCRIPCION} />
        <meta name="twitter:image" content={`${SITIO}/og.png`} />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <main>{abierta ? <Flujo origen={origen} /> : <Cerrada />}</main>
    </>
  )
}
