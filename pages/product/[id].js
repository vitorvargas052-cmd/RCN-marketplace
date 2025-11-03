"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then(setProduct)
    }
  }, [id])

  if (!product) return <p>Carregando...</p>

  return (
    <div className="p-5">
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-60 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-3">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="font-bold text-xl mt-3">R$ {product.price}</p>
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-3">
        Adicionar ao carrinho
      </button>
    </div>
  )
    }
