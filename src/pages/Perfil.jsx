/**
 * Perfil.jsx
 * Página de perfil del usuario en EcoGlow.
 * Muestra información del usuario, historial de reservaciones
 * y el código QR del boleto para el próximo evento confirmado.
 * Lee los datos del usuario desde AuthContext (incluyendo reservaciones guardadas).
 * Requiere sesión activa (protegida por ProtectedRoute).
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import { User, CalendarDays, MapPin, Users, Ticket } from 'lucide-react'
import './Perfil.css'

export default function Perfil() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Reservación seleccionada para mostrar su QR
  const [reservacionQR, setReservacionQR] = useState(
    user?.reservaciones?.length > 0 ? user.reservaciones[0] : null
  )

  if (!user) {
    navigate('/')
    return null
  }

  const reservaciones = user.reservaciones || []

  /**
   * getStatusColor - Retorna el color según el status de la reservación.
   * @param {string} status
   * @returns {string}
   */
  const getStatusColor = (status) => {
    if (status === 'confirmada') return 'status--confirmada'
    if (status === 'cancelada') return 'status--cancelada'
    return 'status--pendiente'
  }

  return (
    <div className="perfil-container">
      <Navbar />

      <div className="perfil-body">
        {/* Columna izquierda */}
        <div className="perfil-izquierda">

          {/* Info del usuario */}
          <div className="perfil-usuario">
            <div className="perfil-avatar">
              <User size={40} strokeWidth={1.5} />
            </div>
            <div className="perfil-usuario__info">
              <h2 className="perfil-usuario__nombre">{user.nombre}</h2>
              <p className="perfil-usuario__email">{user.email}</p>
            </div>
          </div>

          {/* Historial de reservaciones */}
          <div className="perfil-seccion">
            <h3 className="perfil-seccion__titulo">Mis Reservaciones</h3>
            <p className="perfil-seccion__subtitulo">Historial de reservaciones</p>

            {reservaciones.length === 0 ? (
              <div className="perfil-vacio">
                <Ticket size={40} strokeWidth={1.2} />
                <p>Aún no tienes reservaciones</p>
                <button
                  className="perfil-explorar-btn"
                  onClick={() => navigate('/explorar')}
                >
                  Explorar parques
                </button>
              </div>
            ) : (
              <div className="perfil-reservaciones-lista">
                {reservaciones.map((res) => (
                  <div
                    key={res.id}
                    className={`perfil-reservacion-item ${reservacionQR?.id === res.id ? 'activa' : ''}`}
                    onClick={() => setReservacionQR(res)}
                  >
                    {/* Indicador de color */}
                    <div className="reservacion-color" />

                    {/* Info */}
                    <div className="reservacion-info">
                      <p className="reservacion-nombre">{res.parqueNombre}</p>
                      <div className="reservacion-detalles">
                        <span>
                          <CalendarDays size={12} /> {res.fecha}
                        </span>
                        <span>
                          <Users size={12} /> {res.personas} persona{res.personas > 1 ? 's' : ''}
                        </span>
                        <span>
                          <MapPin size={12} /> {res.hospedaje}
                        </span>
                      </div>
                    </div>

                    {/* Precio y status */}
                    <div className="reservacion-derecha">
                      <p className="reservacion-precio">${res.total} MXN</p>
                      <span className={`reservacion-status ${getStatusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="perfil-derecha">

          {/* Boleto QR */}
          <div className="perfil-boleto">
            <h3 className="perfil-boleto__titulo">Boleto para próximo evento</h3>

            {reservacionQR ? (
              <>
                <div className="perfil-boleto__info">
                  <p><span>Parque:</span> {reservacionQR.parqueNombre}</p>
                  <p><span>Fecha:</span> {reservacionQR.fecha}</p>
                  <p><span>Hospedaje:</span> {reservacionQR.hospedaje}</p>
                  <p><span>Visitantes:</span> {reservacionQR.personas}</p>
                  <p><span>Total:</span> ${reservacionQR.total} MXN</p>
                  <p><span>ID:</span> {reservacionQR.id}</p>
                </div>

                {/* QR con los datos de la reservación */}
                <div className="perfil-qr">
                  <QRCodeSVG
                    value={JSON.stringify({
                      id: reservacionQR.id,
                      parque: reservacionQR.parqueNombre,
                      fecha: reservacionQR.fecha,
                      personas: reservacionQR.personas
                    })}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#0D1B2A"
                    level="H"
                  />
                  <p className="perfil-qr__texto">
                    Presenta este código en la entrada del parque
                  </p>
                </div>
              </>
            ) : (
              <div className="perfil-vacio">
                <Ticket size={40} strokeWidth={1.2} />
                <p>No hay boletos disponibles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}