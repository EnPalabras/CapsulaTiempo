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
