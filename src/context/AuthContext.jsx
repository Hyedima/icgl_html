import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.checkAuth()
      .then(({ user: authenticatedUser }) => setUser(authenticatedUser))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const signIn = async (credentials) => {
    const result = await api.login(credentials)
    setUser(result.user)
    return result
  }

  const signUp = async (details) => {
    const result = await api.signup(details)
    setUser(result.user)
    return result
  }

  const signOut = async () => {
    await api.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
