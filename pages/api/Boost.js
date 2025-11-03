import { createBoostCheckout } from "@/lib/stripe"

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" })

  try {
    const { productId, days, pricePerDay } = req.body
    const checkoutUrl = await createBoostCheckout(productId, days, pricePerDay)
    res.status(200).json({ url: checkoutUrl })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
