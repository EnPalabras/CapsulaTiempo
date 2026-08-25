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

        {/* Se llega solo por QR o por DM: no queremos esta página en buscadores.
            Open Graph es otra cosa — los scrapers de WhatsApp, Instagram y
            Twitter leen estas etiquetas y no miran `robots`, así que el link
            compartido por DM muestra una preview igual. */}
        <meta name="robots" content="noindex, nofollow" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="En Palabras" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:title" content={TITULO} />
        <meta property="og:description" content={DESCRIPCION} />
        <meta property="og:url" content={SITIO} />
        {/* Absoluta y PNG a proposito: los scrapers no resuelven rutas
            relativas, y el soporte de WebP en las previews es irregular
            (WhatsApp historicamente no la renderiza). */}
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
