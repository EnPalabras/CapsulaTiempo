import { appendData } from '@/utils/Google'

export default async function handler(req, res) {
  const { method } = req

  console.log(req.body)

  if (method == 'POST') {
    const { name, email, subject, message } = req.body

    const values = [[name, email, subject, message, new Date().toISOString()]]
    const table_name = 'Hoja 1'
    await appendData(table_name, values)
    res.status(200).json({ message: 'ok' })
  }
}
