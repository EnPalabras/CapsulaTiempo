import { useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'

const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  weekDays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
  theme: {
    // background: 'bg-gray-700 dark:bg-gray-800',
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: '',
    disabledText: 'text-gray-300',
    input: '',
    inputIcon: '',
    selected: 'hover:bg-primary-500',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
      <svg
        className="w-6 h-6 dark:text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        ></path>
      </svg>
    ),
    next: () => (
      <svg
        className="w-6 h-6 dark:text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          fillRule="evenodd"
          clipRule="evenodd"
          strokeLinejoin="round"
          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        ></path>
      </svg>
    ),
  },
  datepickerClassNames: 'top-50 ',
  defaultDate: new Date('2023-07-21'),
  language: 'sp',
}

export default function Form() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(
    'Oops! Algo salió mal. Intentá de nuevo más tarde'
  )

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    date: new Date(),
  })

  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    if (!form.name || !form.email || !form.message || !form.date) {
      setError('Completa todos los campos')
      setLoading(false)
      return
    }

    if (form.email.indexOf('@') === -1) {
      setError('El email no es válido')
      setLoading(false)
      return
    }

    try {
      const uploadForm = await fetch(
        'https://capsulabackend-production.up.railway.app/api/capsula',
        {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const response = await uploadForm.json()
      if (uploadForm.status === 200) {
        setSuccess(true)
      } else {
        setError('Oops! Algo salió mal. Intentá de nuevo más tarde')
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleDateChange = (selectedDate) => {
    setForm({
      ...form,
      date: new Date(selectedDate).toISOString().slice(0, 10),
    })
  }
  const [show, setShow] = useState(false)

  const handleClose = (state) => {
    setShow(state)
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          En Palabras
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
          Acá (o en cualquier lado) podría ir un texto que explique de qué se
          trata la acción o lo que sea
        </p>

        <form className="space-y-8">
          <div className="flex flex-row w-full gap-8">
            <div className="w-1/2">
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre
              </label>
              <input
                type="name"
                id="name"
                name="name"
                value={form.name}
                onChange={onInputChange}
                className="shadow-sm bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg w-fullfocus:ring-primary-500 focus:border-primary-500 block p-2.5"
                placeholder="Taylor Swift"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                for="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha
              </label>
              <Datepicker
                options={options}
                onChange={handleDateChange}
                show={show}
                setShow={handleClose}
              />{' '}
            </div>
          </div>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={onInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="nombre@enpalabras.com"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Mensaje para el futuro
            </label>
            <textarea
              id="message"
              rows="6"
              name="message"
              value={form.message}
              onChange={onInputChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="In a year"
            ></textarea>
          </div>
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}
          {success ? (
            <button
              type="submit"
              disabled
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
            >
              Mail Programado ✅
            </button>
          ) : loading ? (
            <button
              disabled
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
            >
              Programar Mail
            </button>
          )}
        </form>
      </div>
    </section>
  )
}
