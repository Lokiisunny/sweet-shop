import { useAuth } from './AuthContext'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options)
  if (!res.ok) throw new Error(await res.text())
  const isJson = (res.headers.get('content-type') || '').includes('application/json')
  return isJson ? res.json() : res.text()
}

export function useApi() {
  const { token } = useAuth()
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}
  return {
    get: (p) => http(p, { headers: { ...authHeaders } }),
    post: (p, body) => http(p, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders }, body: JSON.stringify(body || {}) }),
    put: (p, body) => http(p, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeaders }, body: JSON.stringify(body || {}) }),
    del: (p) => http(p, { method: 'DELETE', headers: { ...authHeaders } })
  }
}


