"use client";
import { useState } from "react";
import { Camera, Save } from "lucide-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

// 🔥 Configuração do Firebase (use a sua config original)
const firebaseConfig = {
  apiKey: "AIzaSyBiCDUq_Z7I4DVVmHMKdji-JqfC7J875q4",
  authDomain: "rcn-548e2.firebaseapp.com",
  projectId: "rcn-548e2",
  storageBucket: "rcn-548e2.firebasestorage.app",
  messagingSenderId: "90448332592",
  appId: "1:90448332592:web:1eeced84b5020657606af5",
  measurementId: "G-DKD2VBX0MV",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function EditProfile({ user, onSave }) {
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description);
  const [avatar, setAvatar] = useState(user.avatar);
  const [banner, setBanner] = useState(user.banner);
  const [saving, setSaving] = useState(false);

  const uploadImage = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageURL = await uploadImage(file, type === "avatar" ? "avatars" : "banners");
    if (type === "avatar") setAvatar(imageURL);
    if (type === "banner") setBanner(imageURL);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    alert("Perfil atualizado com sucesso!");
    onSave({ name, description, avatar, banner });
  };

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-emerald-400">
        ✏️ Editar Perfil
      </h2>

      {/* Banner */}
      <div className="relative mb-6">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-40 object-cover rounded-xl"
        />
        <label className="absolute bottom-2 right-2 bg-emerald-600 p-2 rounded-full cursor-pointer hover:bg-emerald-700">
          <Camera size={18} />
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e, "banner")}
            accept="image/*"
          />
        </label>
      </div>

      {/* Avatar */}
      <div className="relative mb-6 w-24 h-24">
        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-[#181818]"
        />
        <label className="absolute bottom-0 right-0 bg-emerald-600 p-2 rounded-full cursor-pointer hover:bg-emerald-700">
          <Camera size={18} />
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e, "avatar")}
            accept="image/*"
          />
        </label>
      </div>

      {/* Nome */}
      <label className="block text-sm text-gray-400 mb-1">Nome</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Seu nome"
        className="w-full bg-[#181818] border border-gray-700 text-gray-200 p-2 rounded-lg mb-4"
      />

      {/* Descrição */}
      <label className="block text-sm text-gray-400 mb-1">Descrição</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Escreva algo sobre você..."
        className="w-full bg-[#181818] border border-gray-700 text-gray-200 p-2 rounded-lg mb-4"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition ${
          saving
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 text-white"
        }`}
      >
        <Save size={18} />
        {saving ? "Salvando..." : "Salvar Alterações"}
      </button>
    </div>
  );
          }
