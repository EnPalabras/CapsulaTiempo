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

        <div className="mt-8 w-full rounded-[18px] bg-[#6F437C] px-6 py-6 text-center">
          <p className="text-[16px] font-semibold leading-snug text-white md:text-[18px]">
            {PASO_LISTO.marca.texto}
          </p>

          <a
            href={PASO_LISTO.marca.href}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full bg-white px-8 py-3 font-sans text-[14px] font-semibold text-[#6F437C] transition-opacity hover:opacity-90"
          >
            {PASO_LISTO.marca.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
