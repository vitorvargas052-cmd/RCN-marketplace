"use client";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import useAuth from "../hooks/useAuth";
import EditProfile from "../components/EditProfile";

export default function ProfilePage() {
  const { user, loading } = useAuth(true); // 🔒 Protege a rota — só usuários logados
  const [userData, setUserData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // 🧠 Busca dados do perfil do usuário logado
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    setLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setUserData(data);
      } else {
        // Se o perfil ainda não existir, cria um básico
        const newProfile = {
          id: user.id,
          name: user.email.split("@")[0],
          description: "Novo usuário do RCN Marketplace 🚀",
          avatar:
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          banner:
            "https://i.imgur.com/Q9LgH2F.jpeg",
          updated_at: new Date(),
        };
        await supabase.from("users").insert(newProfile);
        setUserData(newProfile);
      }
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
    } finally {
      setLoadingProfile(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading || loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-gray-400">
        Carregando perfil...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-red-400">
        Erro ao carregar informações do usuário.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      {/* 🔵 Banner */}
      <div className="relative w-full h-44 md:h-60">
        <img
          src={userData.banner}
          alt="Banner do perfil"
          className="object-cover w-full h-full opacity-90"
        />
        <div className="absolute bottom-4 left-6 bg-black/60 px-4 py-2 rounded-xl">
          <h1 className="text-2xl font-bold text-blue-400">
            {userData.name}
          </h1>
          <p className="text-sm text-gray-300">@{user.email}</p>
        </div>
      </div>

      {/* 🧑 Avatar */}
      <div className="flex flex-col items-center -mt-10 z-10">
        <img
          src={userData.avatar}
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-zinc-900 shadow-lg"
        />
        <button
          onClick={() => setEditMode(!editMode)}
          className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
        >
          {editMode ? "Fechar edição" : "Editar perfil"}
        </button>
      </div>

      {/* ✏️ Modo de Edição */}
      {editMode ? (
        <div className="p-4">
          <EditProfile
            user={userData}
            onSave={(updatedData) => {
              setUserData({ ...userData, ...updatedData });
              setEditMode(false);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center px-6 mt-6">
          <p className="text-gray-300 text-sm mb-4 max-w-md">
            {userData.description}
          </p>

          <div className="flex gap-4 mt-3">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
            >
              Sair
            </button>
            <a
              href="/"
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg font-semibold"
            >
              Voltar
            </a>
          </div>
        </div>
      )}

      {/* ⚙️ Rodapé / Layout */}
      <footer className="mt-auto text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} RCN Marketplace — Perfil do usuário
      </footer>
    </div>
  );
                     }
