"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  "https://zqkksqfjwjznbkmivycc.supabase.com",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxa2tzcWZqd2p6bmJrbWl2eWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjU5NjMsImV4cCI6MjA3NzI0MTk2M30.wiAKtsG4-or0CwW1kjRBx3ljFLnRLKhR6TXD202BcF0"
);

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage("❌ Erro ao criar conta: " + error.message);
    } else {
      setMessage("✅ Conta criada! Verifique seu e-mail para confirmar.");
      setTimeout(() => router.push("/login"), 2500);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-6">
      <h1 className="text-3xl font-bold mb-6">📝 Criar Conta</h1>

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-zinc-800 p-6 rounded-xl shadow-lg"
      >
        <label className="block mb-2 text-sm font-semibold">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 rounded border border-zinc-600"
          required
        />

        <label className="block mb-2 text-sm font-semibold">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 rounded border border-zinc-600"
          required
        />

        {message && (
          <p className="text-center mb-3 text-gray-300 text-sm">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition"
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Já tem conta?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
