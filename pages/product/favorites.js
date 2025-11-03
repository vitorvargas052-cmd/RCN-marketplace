"use client"
import { useEffect, useState } from "react"
import FavoritesList from "../components/favoriteslist"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    async function loadFavorites() {
      const res = await fetch("/api/favorites?user_id=1")
      const data = await res.json()
      setFavorites(data)
    }
    loadFavorites()
  }, [])

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">💖 Meus Favoritos</h2>
      <FavoritesList favorites={favorites} />
    </div>
  )
}
