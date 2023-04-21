import { appendData } from '@/utils/Google'

export default async function handler(req, res) {
  const { method } = req

  console.log(req.body)

  if (method == 'POST') {
    const { table_name, values } = req.body
    await appendData(table_name, values)
    res.status(200).json({ message: 'ok' })
  }
}
