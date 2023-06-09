import { appendData } from '@/utils/Google'

export default async function handler(req, res) {
  const { method } = req

  console.log(req.body)

  if (method == 'POST') {
    try {
      const { table_name, values } = req.body
      const upload = await appendData(table_name, values)
      console.log(upload)
      res.status(200).json({ message: 'ok' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error' })
    }
  }
}
