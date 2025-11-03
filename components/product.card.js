"use client";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [fav, setFav] = useState(false);

  const toggleFavorite = () => setFav(!fav);

  return (
    <div className="bg-[#181818] border border-gray-800 rounded-xl p-4 shadow hover:shadow-emerald-500/10 transition relative">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-md font-semibold mb-1 text-white">
        {product.title}
      </h3>
      <p className="text-gray-400 text-sm mb-2">{product.category}</p>
      <p className="text-emerald-400 font-bold mb-3">R$ {product.price}</p>

      <button
        onClick={toggleFavorite}
        className={`absolute top-3 right-3 text-xl ${
          fav ? "text-red-500" : "text-gray-500"
        }`}
      >
        ♥
      </button>
    </div>
  );
}
