"use client";
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { supabase } from "../utils/supabaseClient";
import useAuth from "../hooks/useAuth";

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // 🔴 Escuta eventos em tempo real no Supabase
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("realtime:notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <div className="relative">
      {/* Ícone de sino */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition"
      >
        <Bell size={22} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        )}
      </button>

      {/* Lista de notificações */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
          <div className="p-3 border-b border-zinc-700 text-sm text-gray-300">
            🔔 Notificações
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-gray-500 text-sm text-center">
              Nenhuma notificação.
            </p>
          ) : (
            notifications.map((n, i) => (
              <div
                key={i}
                className="p-3 border-b border-zinc-800 text-sm hover:bg-zinc-800 cursor-pointer"
              >
                <p className="text-gray-200">{n.message}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(n.created_at).toLocaleString("pt-BR")}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
        }
