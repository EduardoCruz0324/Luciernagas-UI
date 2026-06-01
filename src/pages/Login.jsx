/**
 * Login.jsx
 * Página de autenticación de EcoGlow.
 * Flujo en dos pasos:
 *   - Paso 1: captura el correo electrónico
 *   - Paso 2: captura la contraseña y valida contra el mockdata
 * Al autenticarse correctamente redirige a /home.
 * Soporta login social simulado (Google / Apple).
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1) // 1 = email, 2 = contraseña
  const [error, setError] = useState('')

  const { login, loginSocial } = useAuth()
  const navigate = useNavigate()

  /**
   * handleContinue - Maneja el avance entre pasos del formulario.
   * Paso 1: valida que el email no esté vacío y avanza al paso 2.
   * Paso 2: llama a login() y redirige si las credenciales son correctas.
   */
  const handleContinue = (e) => {
    e.preventDefault()

    if (step === 1) {
      if (!email.trim()) {
        setError('Por favor ingresa tu correo electrónico')
        return
      }
      setError('')
      setStep(2)
      return
    }

    if (step === 2) {
      const result = login(email, password)
      if (result.ok) {
        navigate('/home')
      } else {
        setError(result.error)
      }
    }
  }

  /**
   * handleSocial - Simula autenticación con proveedor social.
   * @param {string} provider - 'google' o 'apple'
   */
  const handleSocial = (provider) => {
    loginSocial(`usuario@${provider}.com`)
    navigate('/home')
  }

  return (
    <div className="login-container">
      <Navbar />

      <main className="login-main">
        <h1 className="login-title">
          <span className="brand-eco">Eco</span>
          <span className="brand-glow">Glow</span>
        </h1>

        <div className="login-logo">
          <img src="/logo.png" alt="EcoGlow" className="login-logo__img" />
        </div>

        <form className="login-form" onSubmit={handleContinue}>
          {/* Campo de email — deshabilitado en paso 2 para mostrar a qué cuenta pertenece */}
          <input
            className={`login-input ${error && step === 1 ? 'login-input--error' : ''}`}
            type="email"
            placeholder="correoelectrónico@dominio.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            disabled={step === 2}
          />

          {/* Campo de contraseña — solo visible en paso 2 */}
          {step === 2 && (
            <input
              className={`login-input ${error && step === 2 ? 'login-input--error' : ''}`}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              autoFocus
            />
          )}

          {/* Mensaje de error de validación */}
          {error && <p className="login-error">{error}</p>}

          <button className="login-btn-primary" type="submit">
            {step === 1 ? 'Continuar' : 'Iniciar sesión'}
          </button>

          {/* Botón para regresar al paso 1 */}
          {step === 2 && (
            <button
              className="login-btn-back"
              type="button"
              onClick={() => { setStep(1); setError(''); setPassword('') }}
            >
              ← Usar otro correo
            </button>
          )}

          {/* Opciones de login social — solo visibles en paso 1 */}
          {step === 1 && (
            <>
              <div className="login-divider">
                <span />
                <p>o</p>
                <span />
              </div>

              <button className="login-btn-social" type="button" onClick={() => handleSocial('google')}>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={20}
                />
                Continuar con Google
              </button>

              <button className="login-btn-social" type="button" onClick={() => handleSocial('apple')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Continuar con Apple
              </button>
            </>
          )}

          <p className="login-terms">
            Al hacer clic en continuar, aceptas nuestros{' '}
            <a href="#">Términos de servicio</a> y{' '}
            <a href="#">Política de privacidad</a>
          </p>
        </form>
      </main>
    </div>
  )
}