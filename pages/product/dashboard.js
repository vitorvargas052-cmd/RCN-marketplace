"use client"
import { useEffect, useState } from "react"
import SellerDashboard from "../components/sellerdashboard"

export default function Dashboard() {
  const [stats, setStats] = useState({
    sales: 0,
    clicks: 0,
    comments: 0,
    history: [],
  })

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/ranking")
      const data = await res.json()
      setStats(data)
    }
    loadStats()
  }, [])

  return (
    <div className="p-6">
      <SellerDashboard stats={stats} />
    </div>
  )
}
