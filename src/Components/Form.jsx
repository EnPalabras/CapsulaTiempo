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
      console.log('Success')
    } else {
      console.log('Error')
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
          {/* <div>
            <label
              for="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Asunto del Mail
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={onInputChange}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
          </div> */}
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
          <button
            type="submit"
            onClick={handleSubmit}
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Programar Mail
          </button>
        </form>
      </div>
    </section>
  )
}
