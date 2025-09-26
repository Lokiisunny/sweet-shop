import { useEffect, useMemo, useState } from 'react'
import { useApi } from '../../utils/api'
import { useAuth } from '../../utils/AuthContext'

export const Dashboard = () => {
  const api = useApi()
  const { user } = useAuth()
  const [sweets, setSweets] = useState([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [loading, setLoading] = useState(true)

  const filtered = useMemo(() => {
    return sweets.filter((s) => (!q || s.name.toLowerCase().includes(q.toLowerCase())) && (!cat || s.category.toLowerCase().includes(cat.toLowerCase())))
  }, [sweets, q, cat])

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const data = await api.get('/sweets')
        setSweets(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const purchase = async (id) => {
    const updated = await api.post(`/sweets/${id}/purchase`, { quantity: 1 })
    setSweets((prev) => prev.map((s) => (s.id === id || s._id === id ? updated : s)))
  }

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>

  return (
    <div style={{ padding: 24 }}>
      <h2>Welcome {user?.name}</h2>
      <div style={{ display: 'flex', gap: 12, margin: '12px 0' }}>
        <input placeholder="Search by name" value={q} onChange={(e) => setQ(e.target.value)} />
        <input placeholder="Filter by category" value={cat} onChange={(e) => setCat(e.target.value)} />
      </div>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {filtered.map((s) => (
          <div key={s.id || s._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{s.name}</div>
            <div>{s.category}</div>
            <div>${Number(s.price).toFixed(2)}</div>
            <div>In stock: {s.quantity}</div>
            <button onClick={() => purchase(s.id || s._id)} disabled={s.quantity === 0}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  )
}


