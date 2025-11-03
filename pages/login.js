"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  "https://zqkksqfjwjznbkmivycc.supabase.com",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxa2tzcWZqd2p6bmJrbWl2eWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjU5NjMsImV4cCI6MjA3NzI0MTk2M30.wiAKtsG4-or0CwW1kjRBx3ljFLnRLKhR6TXD202BcF0"
);

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("❌ E-mail ou senha incorretos");
    } else {
      router.push("/profile"); // redireciona para o perfil
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-6">
      <h1 className="text-3xl font-bold mb-6">🚀 Login - RCN Marketplace</h1>

      <form
        onSubmit={handleLogin}
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

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Ainda não tem conta?{" "}
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
