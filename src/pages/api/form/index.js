import { appendData } from '@/utils/Google'

export default async function handler(req, res) {
  const { method } = req

  if (method == 'POST') {
    const { name, email, subject, message } = req.body

    const values = [[name, email, subject, message, new Date().toISOString()]]
    const table_name = 'Hoja 1'

    try {
      await appendData(table_name, values)
      res.status(200).json({ message: 'ok' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error' })
    }
  }
}
