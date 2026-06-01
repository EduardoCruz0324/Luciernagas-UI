/**
 * AuthContext.jsx
 * Contexto global de autenticación para EcoGlow.
 * Maneja el estado de sesión del usuario usando localStorage para persistencia.
 * Valida credenciales contra el mockdata de usuarios.
 * Expone: user, login, loginSocial, logout, agregarReservacion.
 */

import { createContext, useContext, useState } from 'react'
import { usuarios } from '../data/usuarios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecoglow_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    const encontrado = usuarios.find(
      (u) => u.email === email && u.password === password
    )
    if (encontrado) {
      const userData = {
        id: encontrado.id,
        nombre: encontrado.nombre,
        email: encontrado.email,
        reservaciones: encontrado.reservaciones
      }
      localStorage.setItem('ecoglow_user', JSON.stringify(userData))
      setUser(userData)
      return { ok: true }
    }
    return { ok: false, error: 'Correo o contraseña incorrectos' }
  }

  const loginSocial = (email) => {
    const userData = {
      id: null,
      nombre: email.split('@')[0],
      email,
      reservaciones: []
    }
    localStorage.setItem('ecoglow_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('ecoglow_user')
    setUser(null)
  }

  /**
   * agregarReservacion - Agrega una nueva reservación al usuario activo.
   * Persiste en localStorage para que sobreviva recargas.
   * @param {object} reservacion
   */
  const agregarReservacion = (reservacion) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        reservaciones: [...(prev.reservaciones || []), reservacion]
      }
      localStorage.setItem('ecoglow_user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, loginSocial, logout, agregarReservacion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}