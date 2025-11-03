import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user_id, product_id } = req.body
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ user_id, product_id }])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
  }

  if (req.method === "GET") {
    const { user_id } = req.query
    const { data, error } = await supabase
      .from("favorites")
      .select("*, products(*)")
      .eq("user_id", user_id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  res.status(405).json({ error: "Método não permitido" })
      }
