import { useState } from 'react'
import { useApi } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const api = useApi()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await api.post('/auth/register', { email, password, name })
      navigate('/login')
    } catch (err) {
      setError('Registration failed')
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>Register</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Create account</button>
      </form>
    </div>
  )
}


