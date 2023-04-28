import { Inter } from 'next/font/google'
import Form from '@/Components/Form'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="bg-white">
      <Form />
    </main>
  )
}
