"use client"
import { useState } from "react"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    alert(data.message || "Conta criada com sucesso!")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white">
      <h1 className="text-2xl mb-4">Criar nova conta</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-72">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-600 py-2 rounded hover:bg-green-700">
          Criar conta
        </button>
      </form>
    </div>
  )
            }
