"use client";
import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Notificações simuladas
    const initial = [
      {
        id: 1,
        type: "message",
        text: "💬 Você recebeu uma nova mensagem no chat.",
        time: "Agora mesmo",
        read: false,
      },
      {
        id: 2,
        type: "sale",
        text: "🛒 Parabéns! Você fez uma nova venda.",
        time: "10 min atrás",
        read: false,
      },
      {
        id: 3,
        type: "rating",
        text: "⭐ Seu perfil recebeu uma nova avaliação.",
        time: "1h atrás",
        read: true,
      },
    ];

    setNotifications(initial);
    setUnreadCount(initial.filter((n) => !n.read).length);
  }, []);

  const togglePanel = () => setShowPanel(!showPanel);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((count) => Math.max(0, count - 1));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      {/* Ícone do sino */}
      <button
        onClick={togglePanel}
        className="relative text-gray-400 hover:text-emerald-400 transition"
      >
        <Bell size={26} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Painel lateral */}
      {showPanel && (
        <div className="absolute right-0 mt-3 w-80 bg-[#121212] border border-gray-800 rounded-2xl shadow-lg z-50">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <h2 className="text-emerald-400 font-semibold text-lg">
              Notificações
            </h2>
            <button
              onClick={togglePanel}
              className="text-gray-400 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">
                Nenhuma notificação no momento.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-xl border ${
                    n.read
                      ? "border-gray-800 bg-[#181818]"
                      : "border-emerald-700 bg-[#0f0f0f]"
                  }`}
                >
                  <p className="text-sm text-gray-200">{n.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 mt-1"
                    >
                      Marcar como lida
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-gray-800 p-3 text-center">
              <button
                onClick={clearAll}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Limpar todas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
    }
