"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext<{
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (auth === "true") setIsAuthenticated(true)
  }, [])

  const login = () => {
    localStorage.setItem("auth", "true")
    document.cookie = "auth=true; path=/"
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("auth")
    document.cookie = "auth=; Max-Age=0; path=/"
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
