import { Inter } from 'next/font/google'
import '@/styles/globals.css'

// El tailwind.config ya pide Inter como sans, pero nadie la cargaba: el form
// viejo terminaba renderizando con la fuente del sistema.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
