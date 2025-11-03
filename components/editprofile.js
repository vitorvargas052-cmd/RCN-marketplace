"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔗 Conexão direta com seu projeto Supabase
const supabaseUrl = "https://zqkksqfjwjznbkmivycc.supabase.com";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxa2tzcWZqd2p6bmJrbWl2eWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NjU5NjMsImV4cCI6MjA3NzI0MTk2M30.wiAKtsG4-or0CwW1kjRBx3ljFLnRLKhR6TXD202BcF0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditProfile({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [description, setDescription] = useState(user?.description || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [banner, setBanner] = useState(user?.banner || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("users")
        .upsert({
          id: user.id,
          name,
          description,
          avatar,
          banner,
          updated_at: new Date(),
        });

      if (error) throw error;
      setMessage("✅ Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Erro ao atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-zinc-900 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        ✏️ Editar Perfil
      </h2>

      <label className="block mb-2">Nome:</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 bg-zinc-800 rounded border border-zinc-700"
      />

      <label className="block mb-2">Descrição:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 bg-zinc-800 rounded border border-zinc-700"
      />

      <label className="block mb-2">Avatar (URL da imagem):</label>
      <input
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        className="w-full p-2 mb-4 bg-zinc-800 rounded border border-zinc-700"
      />

      <label className="block mb-2">Banner (URL da imagem):</label>
      <input
        value={banner}
        onChange={(e) => setBanner(e.target.value)}
        className="w-full p-2 mb-4 bg-zinc-800 rounded border border-zinc-700"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
      >
        {loading ? "Salvando..." : "Salvar Alterações"}
      </button>

      {message && (
        <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
      )}
    </div>
  );
}
