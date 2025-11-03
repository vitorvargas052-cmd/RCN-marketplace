"use client"
import { useState } from "react"

export default function ChatSupport() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { sender: "user", text: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    const res = await fetch("/api/support-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    })

    const data = await res.json()
    const botMessage = { sender: "bot", text: data.response }
    setMessages((prev) => [...prev, botMessage])
    setLoading(false)
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg p-3">
      <h3 className="text-lg font-semibold mb-2">💬 Suporte RCN</h3>
      <div className="h-48 overflow-y-auto border p-2 mb-2 rounded">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`text-sm ${
              msg.sender === "user" ? "text-blue-600 text-right" : "text-gray-700"
            }`}
          >
            {msg.text}
          </p>
        ))}
        {loading && <p className="text-gray-400 text-sm">Digitando...</p>}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva uma mensagem..."
          className="flex-grow border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
        >
          Enviar
        </button>
      </div>
    </div>
  )
    }
