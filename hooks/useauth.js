"use client";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function useAuth(protectedRoute = false) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      } else if (protectedRoute) {
        router.push("/login");
      }
      setLoading(false);
    }

    getSession();

    // Atualiza estado se o usuário logar/deslogar
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session && protectedRoute) router.push("/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router, protectedRoute]);

  return { user, loading };
        }
