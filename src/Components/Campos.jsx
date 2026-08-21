// Los estilos de input estaban repetidos en cada campo del form viejo. Con 12
// campos ya no daba, así que quedan acá una sola vez.

const claseInput =
  'shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-primary-500 focus:border-primary-500'

const claseLabel = 'block mb-2 text-sm font-medium text-gray-900'

const claseError = 'mt-1 text-xs text-red-600'

export function Campo({
  id,
  label,
  error,
  opcional = false,
  ayuda,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={claseLabel}>
        {label}
        {opcional && (
          <span className="ml-1 font-normal text-gray-400">(opcional)</span>
        )}
      </label>
      {children}
      {ayuda && !error && <p className="mt-1 text-xs text-gray-500">{ayuda}</p>}
      {error && <p className={claseError}>{error}</p>}
    </div>
  )
}

export function Input({
  id,
  label,
  value,
  onChange,
  error,
  opcional,
  ayuda,
  className,
  ...props
}) {
  return (
    <Campo
      id={id}
      label={label}
      error={error}
      opcional={opcional}
      ayuda={ayuda}
      className={className}
    >
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${claseInput} ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
    </Campo>
  )
}

export function RadioGrupo({ name, label, value, onChange, opciones, error }) {
  return (
    <fieldset>
      <legend className={`${claseLabel} mb-3`}>{label}</legend>
      <div className="space-y-3">
        {opciones.map((o) => {
          const elegida = value === o.valor
          return (
            <label
              key={o.valor}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                elegida
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.valor}
                checked={elegida}
                onChange={onChange}
                className="mt-0.5 h-4 w-4 shrink-0 border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-light leading-relaxed text-gray-700">
                {o.label}
              </span>
            </label>
          )
        })}
      </div>
      {error && <p className={`${claseError} mt-2`}>{error}</p>}
    </fieldset>
  )
}

export function Select({
  id,
  label,
  value,
  onChange,
  error,
  opciones,
  placeholder,
  className,
}) {
  return (
    <Campo id={id} label={label} error={error} className={className}>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : undefined}
        className={`${claseInput} ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">{placeholder}</option>
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Campo>
  )
}
