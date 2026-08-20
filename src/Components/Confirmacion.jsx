// La persona se entera acá de qué formato le tocó: es lo primero que busca al
// llegar a esta pantalla, así que va arriba y en grande.

export default function Confirmacion({ formato, nombre, duplicada }) {
  const esPapel = formato === 'PAPEL'

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-md px-4 py-16 text-center lg:py-24">
        <p className="mb-4 text-5xl" aria-hidden="true">
          {esPapel ? '✉️' : '📬'}
        </p>

        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {duplicada
            ? 'Ya teníamos tu carta guardada'
            : `Listo${nombre ? `, ${nombre}` : ''}. Tu carta ya está guardada.`}
        </h1>

        <p className="mb-8 text-lg font-light text-gray-600 sm:text-xl">
          {esPapel ? (
            <>
              Entraste en el grupo que la recibe <b>en papel</b>. Te la
              enviamos impresa por correo a la dirección que nos dejaste, en los{' '}
              <b>primeros días de enero</b>.
            </>
          ) : (
            <>
              Tu carta te llega <b>por mail</b>, al correo que nos dejaste, en
              los <b>primeros días de enero</b>.
            </>
          )}
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
