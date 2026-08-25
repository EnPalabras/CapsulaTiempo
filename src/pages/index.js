import Landing from '@/Components/Landing'
import { CAMPANA, RECIBIENDO_CARTAS } from '@/constants/campana'

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
          campaign: CAMPANA,
          content: null,
        },
      },
    },
  }
}
