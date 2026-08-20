import Landing from '@/Components/Landing'
import { ORIGENES, RECIBIENDO_CARTAS } from '@/constants/campana'

export default Landing

export async function getServerSideProps({ params, query, res }) {
  const nombre = params.origen

  // Whitelist: si alguien inventa una URL, 404. No queremos orígenes fantasma
  // ensuciando el tracking.
  if (!Object.hasOwn(ORIGENES, nombre)) {
    return { notFound: true }
  }

  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  const utm = { ...ORIGENES[nombre] }
  // Una UTM en la querystring pisa la default: así sirve para distinguir
  // puntos de pegado de cartel (?utm_content=palermo).
  for (const clave of ['source', 'medium', 'campaign', 'content']) {
    const desdeUrl = query[`utm_${clave}`]
    if (typeof desdeUrl === 'string' && desdeUrl) utm[`utm_${clave}`] = desdeUrl
  }

  return {
    props: {
      abierta: RECIBIENDO_CARTAS,
      origen: {
        nombre,
        utm: {
          source: utm.utm_source ?? null,
          medium: utm.utm_medium ?? null,
          campaign: utm.utm_campaign ?? null,
          content: utm.utm_content ?? null,
        },
      },
    },
  }
}
