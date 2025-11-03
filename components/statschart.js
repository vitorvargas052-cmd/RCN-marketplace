"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

export default function StatsChart({ stats }) {
  return (
    <LineChart
      width={320}
      height={180}
      data={stats.history}
      margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="sales" stroke="#2563eb" />
      <Line type="monotone" dataKey="clicks" stroke="#10b981" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
      }
