"use client";
import Layout from "../components/Layout";
import ChatBox from "../components/ChatBox";

export default function ChatPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-emerald-400">
        💬 Mensagens
      </h1>
      <ChatBox user="Você" recipient="Vendedor" />
    </Layout>
  );
}
