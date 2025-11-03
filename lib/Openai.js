import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Chat de suporte da IA (somente sobre o site)
export async function askSupportBot(question) {
  const prompt = `
  Você é o assistente de suporte do RCN Marketplace.
  Responda perguntas apenas relacionadas ao funcionamento do site,
  ajuda com anúncios, compras, vendas e suporte técnico. 
  Se a dúvida não for sobre o site, explique que você só pode ajudar
  com questões do RCN Marketplace.

  Pergunta do usuário: ${question}
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
  })

  return response.choices[0].message.content.trim()
}
