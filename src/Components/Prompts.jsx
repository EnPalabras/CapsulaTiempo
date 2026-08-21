import { PROMPTS } from '@/constants/campana'

export default function Prompts() {
  return (
    <aside className="rounded-lg border border-gray-200 bg-gray-50 p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
        Si no sabés por dónde empezar
      </h3>
      <ul className="space-y-2">
        {PROMPTS.map((prompt) => (
          <li
            key={prompt}
            className="text-sm font-light leading-relaxed text-gray-600"
          >
            <span aria-hidden="true" className="mr-2 text-gray-400">
              -
            </span>
            {prompt}
          </li>
        ))}
      </ul>
    </aside>
  )
}
