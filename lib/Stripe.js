import Stripe from 'stripe'

// Inicializa o Stripe com a chave secreta
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

// Cria link de pagamento para impulsionamento de anúncio
export async function createBoostCheckout(productId, days, pricePerDay) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: { name: `Impulsionamento ${days} dias` },
          unit_amount: Math.round(pricePerDay * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/sucesso`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancelado`,
    metadata: { productId, days },
  })
  return session.url
}
