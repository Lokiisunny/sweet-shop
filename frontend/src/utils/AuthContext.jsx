import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('auth')
    if (stored) {
      const parsed = JSON.parse(stored)
      setToken(parsed.token)
      setUser(parsed.user)
    }
  }, [])

  const login = (tk, usr) => {
    setToken(tk)
    setUser(usr)
    localStorage.setItem('auth', JSON.stringify({ token: tk, user: usr }))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


