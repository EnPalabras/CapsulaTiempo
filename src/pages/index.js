import Landing from '@/Components/Landing'
import { RECIBIENDO_CARTAS } from '@/constants/campana'

// La raíz es donde vivía la cápsula de 2023. La dejamos sirviendo la landing
// nueva para que los links viejos que anden dando vueltas no caigan en un 404,
// con su propio origen para no mezclarla con el QR ni con los DMs.
export default Landing

export async function getServerSideProps({ res }) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  return {
    props: {
      abierta: RECIBIENDO_CARTAS,
      origen: {
        nombre: 'directo',
        utm: {
          source: 'directo',
          medium: 'directo',
          campaign: null,
          content: null,
        },
      },
    },
  }
}
