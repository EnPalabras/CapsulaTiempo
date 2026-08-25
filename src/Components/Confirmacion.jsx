import { PASO_LISTO } from '@/constants/campana'

export default function Confirmacion() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-6">
      <div className="flex max-w-[620px] flex-col items-center text-center text-tinta">
        <h2 className="font-ivy text-[48px] font-medium italic leading-[1.15] md:text-[52px]">
          {PASO_LISTO.titulo}
        </h2>

        <p className="mt-6 text-[16px] font-normal leading-relaxed md:mt-8 md:text-[20px]">
          {PASO_LISTO.texto}
        </p>

        <p className="mt-6 text-[16px] font-normal leading-relaxed md:text-[20px]">
          {PASO_LISTO.cierre}
        </p>
      </div>
    </section>
  )
}
