"use client"

export default function FavoritesList({ favorites }) {
  if (!favorites.length)
    return <p className="text-gray-500 text-center">Nenhum favorito ainda.</p>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {favorites.map((fav) => (
        <div
          key={fav.id}
          className="border p-3 rounded-lg bg-white shadow hover:shadow-lg"
        >
          <img
            src={fav.products?.image_url}
            alt={fav.products?.title}
            className="w-full h-32 object-cover rounded"
          />
          <p className="mt-2 font-semibold">{fav.products?.title}</p>
          <p className="text-sm text-gray-600">
            R$ {fav.products?.price?.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )
      }
