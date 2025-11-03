import { supabase } from "@/lib/supabaseClient"

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Método não permitido" })

  try {
    const { data, error } = await supabase
      .from("sellers")
      .select("*, stats:stats(count_clicks, count_sales)")
      .order("count_sales", { ascending: false })
      .limit(10)

    if (error) throw error
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
      }
