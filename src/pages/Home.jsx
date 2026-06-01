/**
 * Home.jsx
 * Página principal de EcoGlow tras iniciar sesión.
 * Muestra la imagen del Festival Internacional de las Luciérnagas,
 * una descripción del evento y dos botones de acción principales:
 * Explorar parques y Acerca del evento.
 * Requiere sesión activa (protegida por ProtectedRoute).
 */

import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        {/* Imagen del festival */}
        <div className="home-festival-img-wrapper">
          <img
            src="/Festival.png"
            alt="Festival Internacional de las Luciérnagas"
            className="home-festival-img"
          />
        </div>

        {/* Descripción general del evento */}
        <p className="home-description">
          Tres días de recorridos nocturnos para contemplar la bioluminiscencia de
          luciérnagas, combinados con talleres, arte, música, deportes y gastronomía
          local, en áreas naturales y ecoparques certificados. Ideal para familias,
          parejas y amantes de la naturaleza. Recomendado para mayores de 10 años en
          recorridos nocturnos. El festival promueve un turismo responsable y ecológico.
        </p>

        {/* Botones de acción principales */}
        <div className="home-actions">
          <button className="home-btn" onClick={() => navigate('/explorar')}>
            Explorar parques
          </button>
          <button className="home-btn" onClick={() => navigate('/acerca')}>
            Acerca del evento
          </button>
        </div>
      </main>
    </div>
  )
}