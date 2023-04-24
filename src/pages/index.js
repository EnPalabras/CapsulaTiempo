import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from '@/Components/Form'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ VITE_GOOGLE_KEY }) {
  const uploadData = async () => {
    const response = await fetch('/api/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        table_name: 'Hoja 1',
        values: [['Juan', 'Hola', null, null, '2023-22-01']],
      }),
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <main className="bg-white">
      <Form />
    </main>
  )
}

export async function getServerSideProps(context) {
  const { VITE_GOOGLE_KEY } = process.env

  return {
    props: {
      VITE_GOOGLE_KEY,
    },
  }
}
