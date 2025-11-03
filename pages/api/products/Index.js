import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("products").select("*")
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    const { title, description, price, image_url, seller_id } = req.body
    const { data, error } = await supabase.from("products").insert([
      { title, description, price, image_url, seller_id },
    ])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
  }

  res.status(405).json({ error: "Método não permitido" })
}
