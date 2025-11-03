import { askSupportBot } from "@/lib/openai"

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" })

  try {
    const { message } = req.body
    const response = await askSupportBot(message)
    res.status(200).json({ response })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
