import { useEffect, useState } from 'react'
import { useApi } from '../../utils/api'

export const Admin = () => {
  const api = useApi()
  const [sweets, setSweets] = useState([])
  const [form, setForm] = useState({ name: '', category: '', price: 0, quantity: 0 })

  const load = async () => {
    const data = await api.get('/sweets')
    setSweets(data)
  }

  useEffect(() => { load() }, [])

  const create = async () => {
    await api.post('/sweets', form)
    setForm({ name: '', category: '', price: 0, quantity: 0 })
    await load()
  }
  const update = async (id, data) => {
    const upd = await api.put(`/sweets/${id}`, data)
    setSweets((prev) => prev.map((s) => ((s.id || s._id) === id ? upd : s)))
  }
  const del = async (id) => {
    await api.del(`/sweets/${id}`)
    setSweets((prev) => prev.filter((s) => (s.id || s._id) !== id))
  }
  const restock = async (id) => {
    const upd = await api.post(`/sweets/${id}/restock`, { quantity: 5 })
    setSweets((prev) => prev.map((s) => ((s.id || s._id) === id ? upd : s)))
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin</h2>
      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
        <button onClick={create}>Add Sweet</button>
      </div>

      <h3 style={{ marginTop: 24 }}>Inventory</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((s) => {
            const id = s.id || s._id
            return (
              <tr key={id}>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td align="center">${Number(s.price).toFixed(2)}</td>
                <td align="center">{s.quantity}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => restock(id)}>Restock +5</button>
                  <button onClick={() => update(id, { price: Number(s.price) + 0.5 })}>+ Price</button>
                  <button onClick={() => del(id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}


