/**
 * Navbar.jsx
 * Barra de navegación principal compartida en todas las páginas.
 * Muestra el logo, nombre de la app y links de navegación.
 * Si hay sesión activa muestra el botón de cerrar sesión.
 * Usa AuthContext para acceder al estado de sesión.
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  /**
   * handleLogout - Cierra la sesión y redirige al login.
   */
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      {/* Brand — clic lleva al home */}
      <div className="navbar__brand" onClick={() => navigate('/home')}>
        <img src="/logo.png" alt="EcoGlow logo" className="navbar__logo" />
        <span className="brand-name">
          <span className="brand-eco">Eco</span>
          <span className="brand-glow">Glow</span>
        </span>
      </div>

      {/* Links de navegación */}
      <ul className="navbar__links">
        <li onClick={() => navigate('/explorar')}>Explorar</li>
        <li onClick={() => navigate('/explorar')}>Reservar</li>
        <li onClick={() => navigate('/perfil')}>Mi Perfil</li>
        <li onClick={() => navigate('/acerca')}>Acerca De</li>

        {/* Cerrar sesión — solo visible si hay sesión activa */}
        {user && (
          <li className="navbar__logout" onClick={handleLogout}>
            Cerrar sesión
          </li>
        )}
      </ul>
    </nav>
  )
}