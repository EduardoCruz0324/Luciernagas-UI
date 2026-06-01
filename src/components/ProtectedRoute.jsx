/**
 * ProtectedRoute.jsx
 * Componente de ruta protegida.
 * Si el usuario no tiene sesión activa, redirige al Login (/).
 * Envuelve cualquier página que requiera autenticación.
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  // Si no hay sesión, redirige al login
  return user ? children : <Navigate to="/" replace />
}