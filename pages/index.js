"use client"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import ProductCard from "../components/productcard"
import ChatSupport from "../components/chatsupport"

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
      setFiltered(data)
    }
    loadProducts()
  }, [])

  const handleSearch = (query) => {
    const q = query.toLowerCase()
    const filteredItems = products.filter((p) =>
      p.title.toLowerCase().includes(q)
    )
    setFiltered(filteredItems)
  }

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <ChatSupport />
    </div>
  )
    }
