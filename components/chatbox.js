"use client";
import { useEffect, useRef, useState } from "react";
import { Paperclip, Smile, Send, Mic } from "lucide-react";

export default function ChatBox({ user = "Usuário", recipient = "Vendedor" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Envia mensagem de texto
  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: user, text: input, type: "text" },
    ]);
    setInput("");
  };

  // Simula envio de arquivo/imagem
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: user,
          text: file.name,
          type: "file",
        },
      ]);
    }
  };

  // Simula gravação de áudio
  const handleMicClick = () => {
    if (recording) {
      setRecording(false);
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: user,
          text: "🎤 Áudio enviado (simulação)",
          type: "audio",
        },
      ]);
    } else {
      setRecording(true);
    }
  };

  return (
    <div className="flex flex-col bg-[#121212] border border-gray-800 rounded-2xl p-4 h-[80vh] max-h-[700px] shadow-md">
      {/* Cabeçalho */}
      <div className="border-b border-gray-800 pb-3 mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-emerald-400">
          Chat com {recipient}
        </h2>
        <span className="text-sm text-gray-500">🟢 Online</span>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === user ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-3 py-2 rounded-xl ${
                msg.sender === user
                  ? "bg-emerald-600 text-white"
                  : "bg-[#1a1a1a] text-gray-200 border border-gray-800"
              }`}
            >
              {msg.type === "file" ? (
                <span>📎 {msg.text}</span>
              ) : msg.type === "audio" ? (
                <span>{msg.text}</span>
              ) : (
                <span>{msg.text}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Barra de envio */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-gray-400 hover:text-emerald-400"
        >
          <Paperclip size={22} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />

        <button
          onClick={() => alert("Escolher emoji (função simulada)")}
          className="text-gray-400 hover:text-yellow-400"
        >
          <Smile size={22} />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-[#181818] border border-gray-700 text-gray-200 rounded-xl p-2 focus:outline-none"
        />

        <button
          onClick={handleMicClick}
          className={`text-gray-400 hover:text-red-500 ${
            recording ? "animate-pulse text-red-500" : ""
          }`}
        >
          <Mic size={22} />
        </button>

        <button
          onClick={sendMessage}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
  }
