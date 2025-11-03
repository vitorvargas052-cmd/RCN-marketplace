"use client";
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-gray-200">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#121212] sticky top-0 z-50">
        <h1 className="text-xl font-semibold text-white">
          🚀 RCN <span className="text-emerald-400">Marketplace</span>
        </h1>

        {/* Menu hamburguer (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          ☰
        </button>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-emerald-400 transition">
            Início
          </Link>
          <Link href="/dashboard" className="hover:text-emerald-400 transition">
            Painel
          </Link>
          <Link href="/favorites" className="hover:text-emerald-400 transition">
            Favoritos
          </Link>
          <Link href="/login" className="hover:text-emerald-400 transition">
            Login
          </Link>
        </nav>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="flex flex-col md:hidden bg-[#181818] border-b border-gray-800 px-6 py-4 space-y-3">
          <Link href="/" className="hover:text-emerald-400 transition">
            Início
          </Link>
          <Link href="/dashboard" className="hover:text-emerald-400 transition">
            Painel
          </Link>
          <Link href="/favorites" className="hover:text-emerald-400 transition">
            Favoritos
          </Link>
          <Link href="/login" className="hover:text-emerald-400 transition">
            Login
          </Link>
        </nav>
      )}

      {/* Conteúdo principal */}
      <main className="flex-grow px-6 py-8">{children}</main>

      {/* Rodapé */}
      <footer className="text-center text-gray-500 text-sm border-t border-gray-800 py-4 bg-[#121212]">
        © {new Date().getFullYear()} RCN Marketplace — Desenvolvido por Vitor Vargas 🚀
      </footer>
    </div>
  );
            }
