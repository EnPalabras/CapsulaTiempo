import Datepicker from 'tailwind-datepicker-react'
import { useState } from 'react'

const DemoComponent = ({ date }) => {
  const [show, setShow] = useState(false)
  const handleChange = (selectedDate) => {
    console.log(selectedDate)
  }
  const handleClose = (state) => {
    setShow(state)
  }

  const options = {
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    defaultDate: new Date(date),
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
          class="w-6 h-6 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          ></path>
        </svg>
      ),
      next: () => (
        <svg
          class="w-6 h-6 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            fillRule="evenodd"
            clipRule="evenodd"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          ></path>
        </svg>
      ),
    },
    datepickerClassNames: 'top-50 ',
    defaultDate: new Date('2022-01-01'),
    language: 'sp',
  }

  return (
    <Datepicker
      options={options}
      onChange={handleChange}
      show={show}
      setShow={handleClose}
    />
  )
}

export default DemoComponent
