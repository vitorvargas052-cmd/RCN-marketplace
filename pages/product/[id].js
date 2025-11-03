"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [fav, setFav] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) {
      async function loadData() {
        try {
          const res = await fetch(`/api/products/${id}`);
          const data = await res.json();
          setProduct(data);

          // Simula produtos recomendados (poderá vir do Supabase)
          const rec = await fetch("/api/products");
          const all = await rec.json();
          setRecommendations(all.filter((p) => p.id !== id).slice(0, 4));

          // Simula comentários
          setComments([
            { id: 1, author: "João", text: "Produto excelente!", likes: 4 },
            { id: 2, author: "Maria", text: "Chegou rápido!", likes: 2 },
          ]);
        } catch (error) {
          console.error("Erro ao carregar produto:", error);
        }
      }
      loadData();
    }
  }, [id]);

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const newC = {
      id: comments.length + 1,
      author: "Você",
      text: newComment,
      likes: 0,
    };
    setComments([newC, ...comments]);
    setNewComment("");
  };

  if (!product) {
    return (
      <Layout>
        <div className="text-center text-gray-400 py-20">
          Carregando produto...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Imagem do produto */}
        <div className="flex-1 bg-[#121212] border border-gray-800 rounded-2xl p-4 shadow-md">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>

        {/* Detalhes do produto */}
        <div className="flex-1 bg-[#121212] border border-gray-800 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-3">
              {product.title}
            </h1>
            <p className="text-gray-400 mb-3">{product.description}</p>
            <p className="text-emerald-400 text-2xl font-bold mb-4">
              R$ {product.price}
            </p>
            <button
              onClick={() => setFav(!fav)}
              className={`px-4 py-2 rounded-lg border ${
                fav
                  ? "bg-red-600 border-red-700"
                  : "bg-transparent border-gray-700"
              } hover:bg-red-700 transition`}
            >
              {fav ? "❤️ Favoritado" : "🤍 Favoritar"}
            </button>
          </div>

          <button className="mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
            Comprar agora
          </button>
        </div>
      </div>

      {/* Comentários */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3 text-emerald-400">
          Comentários ({comments.length})
        </h2>
        <form onSubmit={handleComment} className="flex gap-3 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva um comentário..."
            className="flex-1 p-2 rounded-lg bg-[#181818] border border-gray-700 text-gray-200"
          />
          <button className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600">
            Enviar
          </button>
        </form>

        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-[#121212] border border-gray-800 rounded-lg p-3"
            >
              <p className="text-sm text-gray-400 mb-1">{c.author}</p>
              <p className="text-gray-200">{c.text}</p>
              <p className="text-xs text-gray-500 mt-1">❤️ {c.likes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recomendados */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-emerald-400">
          Produtos recomendados
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendations.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </Layout>
  );
                }
