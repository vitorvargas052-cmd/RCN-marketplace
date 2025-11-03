import { supabase } from "@/lib/supabaseClient"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" })

  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const buffer = Buffer.concat(chunks)
    const fileName = `${Date.now()}.jpg`

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, buffer, {
        contentType: "image/jpeg",
      })

    if (error) throw error

    const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/${fileName}`
    res.status(200).json({ url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
                        }
