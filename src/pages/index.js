import Landing from '@/Components/Landing'
import { CAMPANA, RECIBIENDO_CARTAS } from '@/constants/campana'

// La raíz es donde vivía la cápsula de 2023. La dejamos sirviendo la landing
// nueva para que los links viejos que anden dando vueltas no caigan en un 404.
// Tiene su propio origen, 'directo', que es el cajón de lo que no sabemos de
// dónde viene: quien entra por un link nuestro cae siempre en un /c/algo.
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
