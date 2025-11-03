"use client"
import StatsChart from "./StatsChart"

export default function SellerDashboard({ stats }) {
  return (
    <div className="p-5 bg-zinc-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Painel do Vendedor</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold">{stats.sales}</p>
          <p className="text-gray-600">Vendas</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.clicks}</p>
          <p className="text-gray-600">Cliques</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.comments}</p>
          <p className="text-gray-600">Comentários</p>
        </div>
      </div>

      <div className="mt-6">
        <StatsChart stats={stats} />
      </div>
    </div>
  )
    }
