"use client"

export default function ProductCard({ product, onFavorite }) {
  return (
    <div className="border rounded-lg p-3 bg-white shadow-md hover:shadow-lg transition">
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="font-bold text-lg mt-1">R$ {product.price}</p>

      <div className="flex justify-between mt-2">
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          Ver detalhes
        </button>
        <button
          onClick={() => onFavorite(product.id)}
          className="bg-pink-500 text-white px-3 py-1 rounded"
        >
          ❤️
        </button>
      </div>
    </div>
  )
          }
