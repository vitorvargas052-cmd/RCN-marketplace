import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === "DELETE") {
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ message: "Produto excluído com sucesso" })
  }

  res.status(405).json({ error: "Método não permitido" })
      }
