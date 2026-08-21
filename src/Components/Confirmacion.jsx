import { CUPO_PAPEL } from '@/constants/campana'

// Tres casos, no dos: pidió papel y entró, pidió papel y el cupo ya estaba
// completo, o eligió mail desde el principio. El del medio es el que hay que
// decir con cuidado, porque le prometimos que no se quedaba sin carta.
function contenido({ formato, preferencia }) {
  if (formato === 'PAPEL') {
    return {
      emoji: '✉️',
      titulo: 'Entraste. Tu carta se imprime.',
      cuerpo: (
        <>
          Sos una de las {CUPO_PAPEL} personas que la reciben{' '}
          <b>en papel</b>. Te la enviamos impresa por correo a la dirección que
          nos dejaste, en los <b>primeros días de enero</b>.
        </>
      ),
    }
  }

  if (preferencia === 'PAPEL') {
    return {
      emoji: '📬',
      titulo: 'El cupo de cartas impresas ya se completó.',
      cuerpo: (
        <>
          Llegaste unos minutos tarde para el papel, pero{' '}
          <b>no te quedás sin carta</b>: te la enviamos <b>por mail</b>, al
          correo que nos dejaste, en los <b>primeros días de enero</b>.
        </>
      ),
    }
  }

  return {
    emoji: '📬',
    titulo: 'Listo. Tu carta ya está guardada.',
    cuerpo: (
      <>
        Te la enviamos <b>por mail</b>, al correo que nos dejaste, en los{' '}
        <b>primeros días de enero</b>.
      </>
    ),
  }
}

export default function Confirmacion({
  formato,
  preferencia,
  nombre,
  duplicada,
}) {
  const { emoji, titulo, cuerpo } = contenido({ formato, preferencia })
  // "Listo, María Fernanda García" queda raro: usamos el primer nombre.
  const primerNombre = nombre?.trim().split(/\s+/)[0]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-md px-4 py-16 text-center lg:py-24">
        <p className="mb-4 text-5xl" aria-hidden="true">
          {emoji}
        </p>

        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {duplicada ? 'Ya teníamos tu carta guardada' : titulo}
        </h1>

        {primerNombre && !duplicada && (
          <p className="mb-4 text-lg font-light text-gray-500">
            Gracias, {primerNombre}.
          </p>
        )}

        <p className="mb-8 text-lg font-light text-gray-600 sm:text-xl">
          {cuerpo}
        </p>

        {duplicada && (
          <p className="mb-8 text-sm font-light text-gray-500">
            Con ese mail ya habías participado, así que no cargamos una carta
            nueva. Tranqui: la que escribiste antes está a salvo.
          </p>
        )}

        <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm font-light leading-relaxed text-gray-600">
            No leemos las cartas. Se imprimen o se envían selladas, y después
            del envío borramos lo que escribiste.
          </p>
        </div>
      </div>
    </section>
  )
}
