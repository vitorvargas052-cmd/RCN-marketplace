"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Vitor Vargas",
    description: "Empreendedor e vendedor no RCN Marketplace 🚀",
    avatar: "/default-avatar.png",
    banner: "/default-banner.jpg",
    verified: true,
  });

  const [section, setSection] = useState("overview");

  useEffect(() => {
    // Aqui futuramente podemos buscar os dados reais do usuário (via Supabase)
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden shadow-md">
        {/* Banner */}
        <div className="relative">
          <img
            src={user.banner}
            alt="Banner do perfil"
            className="w-full h-48 object-cover"
          />
          <div className="absolute -bottom-10 left-6 flex items-center gap-4">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-[#121212] object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {user.name}
                {user.verified && (
                  <span className="text-emerald-400 text-sm">✔️ Verificado</span>
                )}
              </h1>
              <p className="text-gray-400">{user.description}</p>
            </div>
          </div>
        </div>

        {/* Espaçamento abaixo do banner */}
        <div className="h-16"></div>

        {/* Navegação lateral */}
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-1/4 bg-[#181818] border-r border-gray-800 p-4 space-y-3">
            <button
              onClick={() => setSection("overview")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                section === "overview"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-[#202020]"
              }`}
            >
              📋 Visão geral
            </button>

            <button
              onClick={() => setSection("ads")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                section === "ads"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-[#202020]"
              }`}
            >
              📦 Meus anúncios
            </button>

            <button
              onClick={() => setSection("favorites")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                section === "favorites"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-[#202020]"
              }`}
            >
              💚 Favoritos
            </button>

            <button
              onClick={() => setSection("ratings")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                section === "ratings"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-[#202020]"
              }`}
            >
              ⭐ Avaliações
            </button>

            <button
              onClick={() => setSection("history")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                section === "history"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-[#202020]"
              }`}
            >
              📜 Histórico
            </button>
          </aside>

          {/* Conteúdo principal */}
          <section className="flex-1 p-6">
            {section === "overview" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">
                  Visão geral
                </h2>
                <p className="text-gray-300">
                  Aqui você pode visualizar e editar suas informações de
                  perfil, ver seu desempenho como vendedor e acompanhar suas
                  atividades recentes.
                </p>
              </div>
            )}

            {section === "ads" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">
                  Meus anúncios
                </h2>
                <p className="text-gray-400">Você ainda não tem anúncios ativos.</p>
              </div>
            )}

            {section === "favorites" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">
                  Favoritos
                </h2>
                <p className="text-gray-400">
                  Seus produtos favoritos aparecerão aqui. ❤️
                </p>
              </div>
            )}

            {section === "ratings" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">
                  Avaliações
                </h2>
                <p className="text-gray-400">
                  Nenhuma avaliação recente. Peça feedback aos seus compradores!
                </p>
              </div>
            )}

            {section === "history" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-emerald-400">
                  Histórico
                </h2>
                <p className="text-gray-400">
                  Suas interações recentes e estatísticas aparecerão aqui. 📊
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
              }
