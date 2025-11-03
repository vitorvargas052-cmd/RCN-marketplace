import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { user_id } = req.query
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user_id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    const { user_id, message } = req.body
    const { data, error } = await supabase
      .from("notifications")
      .insert([{ user_id, message }])
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
  }

  res.status(405).json({ error: "Método não permitido" })
  }
