/**
 * Explorar.jsx
 * Página de exploración de parques de EcoGlow.
 * Panel izquierdo: búsqueda, lista de parques con disponibilidad y tarjeta del seleccionado.
 * Panel derecho: mapa Leaflet con fly-to animado al seleccionar parque,
 * marcador resaltado para el parque activo y popup con info básica.
 * Requiere sesión activa (protegida por ProtectedRoute).
 */

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { parques } from '../data/parques'
import Navbar from '../components/Navbar'
import 'leaflet/dist/leaflet.css'
import './Explorar.css'

import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Ícono default de Leaflet
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
})

// Ícono resaltado para el parque seleccionado
const activeIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
  className: 'marker-active',
})

L.Marker.prototype.options.icon = defaultIcon

/**
 * FlyToParque - Componente auxiliar que anima el mapa hacia el parque seleccionado.
 * @param {{ parque: object }} props
 */
function FlyToParque({ parque }) {
  const map = useMap()
  if (parque) {
    map.flyTo([parque.lat, parque.lng], 13, { duration: 1.2 })
  }
  return null
}

/**
 * Calcula el total de lugares disponibles de un parque
 * y retorna el estado: 'disponible', 'limitado' o 'agotado'
 * @param {object} parque
 * @returns {'disponible' | 'limitado' | 'agotado'}
 */
function getDisponibilidad(parque) {
  const total = parque.disponibilidad.reduce((acc, d) => acc + d.lugares, 0)
  if (total === 0) return 'agotado'
  if (total < 50) return 'limitado'
  return 'disponible'
}

export default function Explorar() {
  const navigate = useNavigate()

  const [parqueSeleccionado, setParqueSeleccionado] = useState(parques[0])
  const [fotoIndex, setFotoIndex] = useState(0)
  const [busqueda, setBusqueda] = useState('')

  // Filtra parques según búsqueda
  const parquesFiltrados = parques.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Selecciona parque y resetea carrusel
  const seleccionar = (parque) => {
    setParqueSeleccionado(parque)
    setFotoIndex(0)
  }

  const fotoAnterior = () => {
    setFotoIndex((prev) =>
      prev === 0 ? parqueSeleccionado.fotos.length - 1 : prev - 1
    )
  }

  const fotoSiguiente = () => {
    setFotoIndex((prev) =>
      prev === parqueSeleccionado.fotos.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="explorar-container">
      <Navbar />

      <div className="explorar-body">
        {/* Panel izquierdo */}
        <aside className="explorar-panel">

          {/* Búsqueda */}
          <div className="explorar-search">
            <Search size={16} className="explorar-search__icon" />
            <input
              type="text"
              placeholder="Buscar parque o ubicación..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="explorar-search__input"
            />
          </div>

          {/* Tarjeta del parque seleccionado */}
          {parqueSeleccionado && (
            <div className="explorar-card">
              <div className="explorar-card__carousel">
                <button className="carousel-btn carousel-btn--left" onClick={fotoAnterior}>
                  <ChevronLeft size={18} />
                </button>
                <img
                  src={parqueSeleccionado.fotos[fotoIndex]}
                  alt={parqueSeleccionado.nombre}
                  className="explorar-card__img"
                />
                <button className="carousel-btn carousel-btn--right" onClick={fotoSiguiente}>
                  <ChevronRight size={18} />
                </button>

                {/* Indicadores del carrusel */}
                <div className="carousel-dots">
                  {parqueSeleccionado.fotos.map((_, i) => (
                    <span
                      key={i}
                      className={`carousel-dot ${i === fotoIndex ? 'activo' : ''}`}
                      onClick={() => setFotoIndex(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="explorar-card__info">
                <h3 className="explorar-card__nombre">{parqueSeleccionado.nombre}</h3>
                <p className="explorar-card__ubicacion">{parqueSeleccionado.ubicacion}</p>
                <p className="explorar-card__dato">
                  <span>Cupo:</span> {parqueSeleccionado.cupo} personas
                </p>
                <p className="explorar-card__dato">
                  <span>Tarifa:</span> {parqueSeleccionado.tarifa}
                </p>
                <p className="explorar-card__dato">
                  <span>Precio:</span> ${parqueSeleccionado.precio} MXN
                </p>
              </div>

              <button
                className="explorar-card__btn"
                onClick={() => navigate(`/parque/${parqueSeleccionado.slug}`)}
              >
                Detalles
              </button>
            </div>
          )}

          {/* Lista de parques */}
          <div className="explorar-lista">
            <p className="explorar-lista__titulo">Parques disponibles</p>
            {parquesFiltrados.map((p) => {
              const disp = getDisponibilidad(p)
              return (
                <div
                  key={p.id}
                  className={`explorar-lista__item ${parqueSeleccionado?.id === p.id ? 'activo' : ''}`}
                  onClick={() => seleccionar(p)}
                >
                  <div className="explorar-lista__item-info">
                    <p className="explorar-lista__item-nombre">{p.nombre}</p>
                    <p className="explorar-lista__item-ubicacion">{p.ubicacion}</p>
                  </div>
                  {/* Indicador de disponibilidad */}
                  <span className={`disp-dot disp-dot--${disp}`} title={disp} />
                </div>
              )
            })}
          </div>

        </aside>

        {/* Panel derecho — mapa */}
        <div className="explorar-mapa">
          <button className="explorar-filtros-btn">
            <SlidersHorizontal size={18} />
          </button>

          <MapContainer
            center={[parques[0].lat, parques[0].lng]}
            zoom={11}
            className="explorar-leaflet"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Anima el mapa al parque seleccionado */}
            <FlyToParque parque={parqueSeleccionado} />

            {parques.map((parque) => (
              <Marker
                key={parque.id}
                position={[parque.lat, parque.lng]}
                icon={parqueSeleccionado?.id === parque.id ? activeIcon : defaultIcon}
                eventHandlers={{
                  click: () => seleccionar(parque),
                }}
              >
                <Popup>
                  <strong>{parque.nombre}</strong>
                  <br />
                  {parque.ubicacion}
                  <br />
                  <span style={{ color: '#1a1a1a', fontSize: '0.85rem' }}>
                    ${parque.precio} MXN
                  </span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}