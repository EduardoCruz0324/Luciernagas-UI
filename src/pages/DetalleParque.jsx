/**
 * DetalleParque.jsx
 * Página de detalle de un parque específico de EcoGlow.
 * Muestra información completa del parque: carrusel de fotos, calendario de disponibilidad,
 * accesos y servicios, y un panel lateral de reserva con stepper de 3 pasos:
 *   - Paso 1: Fechas y Hospedaje
 *   - Paso 2: Visitantes
 *   - Paso 3: Pago (abre modal de pago)
 * Al confirmar el pago guarda la reservación en el contexto y redirige a /perfil.
 * Requiere sesión activa (protegida por ProtectedRoute).
 */

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { parques } from '../data/parques'
import Navbar from '../components/Navbar'
import ModalPago from '../components/ModalPago'
import {
  Tent,
  Users,
  Flame,
  PersonStanding,
  CalendarDays,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import './DetalleParque.css'

// Mapeo de servicios a íconos de lucide
const servicioIconos = {
  'Camping': Tent,
  'Guía certificado': PersonStanding,
  'Área de fogata': Flame,
  'Zona de camping': Tent,
  'Glamping': Tent,
  'default': Users
}

// Nombres de los meses en español
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

// Días de la semana
const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

/**
 * getDiasDelMes - Genera los días del mes para el calendario.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {Array}
 */
function getDiasDelMes(year, month) {
  const primerDia = new Date(year, month, 1).getDay()
  const totalDias = new Date(year, month + 1, 0).getDate()
  const dias = []
  for (let i = 0; i < primerDia; i++) dias.push(null)
  for (let i = 1; i <= totalDias; i++) dias.push(i)
  return dias
}

export default function DetalleParque() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { agregarReservacion } = useAuth()

  // Busca el parque por slug en el mockdata
  const parque = parques.find((p) => p.slug === slug)

  // Estado del stepper
  const [pasoActivo, setPasoActivo] = useState(1)

  // Fecha seleccionada en el calendario
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null)

  // Hospedaje seleccionado
  const [hospedajeSeleccionado, setHospedajeSeleccionado] = useState(null)

  // Mes y año del calendario
  const hoy = new Date()
  const [mesCalendario, setMesCalendario] = useState(hoy.getMonth())
  const [anioCalendario, setAnioCalendario] = useState(hoy.getFullYear())

  // Número de visitantes
  const [visitantes, setVisitantes] = useState(1)

  // Índice de foto activa en el carrusel
  const [fotoActiva, setFotoActiva] = useState(0)

  // Control del modal de pago
  const [modalAbierto, setModalAbierto] = useState(false)

  if (!parque) {
    return (
      <div className="detalle-container">
        <Navbar />
        <div className="detalle-notfound">
          <p>Parque no encontrado.</p>
          <button onClick={() => navigate('/explorar')}>Volver a Explorar</button>
        </div>
      </div>
    )
  }

  const dias = getDiasDelMes(anioCalendario, mesCalendario)

  /**
   * getDisponibilidadDia - Verifica disponibilidad de un día en el mockdata.
   * @param {number} dia
   * @returns {{ disponible: boolean, lugares: number }}
   */
  const getDisponibilidadDia = (dia) => {
    if (!dia) return { disponible: false, lugares: 0 }
    const fechaStr = `${anioCalendario}-${String(mesCalendario + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
    const encontrado = parque.disponibilidad.find((d) => d.fecha === fechaStr)
    if (!encontrado) return { disponible: false, lugares: 0 }
    return { disponible: encontrado.lugares > 0, lugares: encontrado.lugares }
  }

  /**
   * handleConfirmarPago - Genera y guarda la reservación tras confirmar el pago.
   * Redirige a /perfil.
   */
  const handleConfirmarPago = () => {
    const nuevaReservacion = {
      id: `RES-${Date.now()}`,
      parqueId: parque.id,
      parqueNombre: parque.nombre,
      fecha: fechaSeleccionada,
      hospedaje: hospedajeSeleccionado,
      personas: visitantes,
      total: parque.precio * visitantes,
      status: 'confirmada'
    }
    agregarReservacion(nuevaReservacion)
    setModalAbierto(false)
    navigate('/perfil')
  }

  // Subtotal para el footer del panel
  const subtotal = hospedajeSeleccionado && fechaSeleccionada
    ? parque.precio * visitantes
    : 0

  const pasos = [
    { num: 1, label: 'Fechas y Hospedaje' },
    { num: 2, label: 'Visitantes' },
    { num: 3, label: 'Pago' }
  ]

  return (
    <div className="detalle-container">
      <Navbar />

      <div className="detalle-body">
        {/* Columna izquierda */}
        <div className="detalle-izquierda">
          <h1 className="detalle-titulo">{parque.nombre}</h1>

          {/* Carrusel de fotos */}
          <div className="detalle-carrusel">
            <button
              className="detalle-carrusel__btn detalle-carrusel__btn--left"
              onClick={() => setFotoActiva((prev) =>
                prev === 0 ? parque.fotos.length - 1 : prev - 1
              )}
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={parque.fotos[fotoActiva]}
              alt={parque.nombre}
              className="detalle-carrusel__img"
            />

            <button
              className="detalle-carrusel__btn detalle-carrusel__btn--right"
              onClick={() => setFotoActiva((prev) =>
                prev === parque.fotos.length - 1 ? 0 : prev + 1
              )}
            >
              <ChevronRight size={22} />
            </button>

            {/* Dots indicadores */}
            <div className="detalle-carrusel__dots">
              {parque.fotos.map((_, i) => (
                <span
                  key={i}
                  className={`detalle-carrusel__dot ${fotoActiva === i ? 'activo' : ''}`}
                  onClick={() => setFotoActiva(i)}
                />
              ))}
            </div>
          </div>

          {/* Calendario */}
          <div className="detalle-seccion">
            <h2 className="detalle-seccion__titulo">
              <CalendarDays size={18} />
              Calendario
            </h2>
            <div className="detalle-calendario">

              {/* Header del mes */}
              <div className="calendario-header">
                <button
                  className="calendario-nav"
                  onClick={() => {
                    if (mesCalendario === 0) {
                      setMesCalendario(11)
                      setAnioCalendario(anioCalendario - 1)
                    } else {
                      setMesCalendario(mesCalendario - 1)
                    }
                  }}
                >
                  ‹
                </button>
                <span className="calendario-mes">
                  {MESES[mesCalendario]} {anioCalendario}
                </span>
                <button
                  className="calendario-nav"
                  onClick={() => {
                    if (mesCalendario === 11) {
                      setMesCalendario(0)
                      setAnioCalendario(anioCalendario + 1)
                    } else {
                      setMesCalendario(mesCalendario + 1)
                    }
                  }}
                >
                  ›
                </button>
              </div>

              {/* Días de la semana */}
              <div className="calendario-grid">
                {DIAS.map((d) => (
                  <span key={d} className="calendario-dia-nombre">{d}</span>
                ))}

                {/* Días del mes */}
                {dias.map((dia, i) => {
                  if (!dia) {
                    return <button key={i} className="calendario-dia vacio" disabled />
                  }

                  const { disponible, lugares } = getDisponibilidadDia(dia)
                  const fechaStr = `${anioCalendario}-${String(mesCalendario + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
                  const seleccionado = fechaSeleccionada === fechaStr

                  return (
                    <button
                      key={i}
                      className={`calendario-dia ${disponible ? 'disponible' : 'agotado'} ${seleccionado ? 'seleccionado' : ''}`}
                      disabled={!disponible}
                      onClick={() => disponible && setFechaSeleccionada(fechaStr)}
                      title={disponible ? `${lugares} lugares disponibles` : 'Sin disponibilidad'}
                    >
                      {dia}
                    </button>
                  )
                })}
              </div>

              {/* Leyenda */}
              <div className="calendario-leyenda">
                <span><span className="leyenda-dot disponible" /> Disponible</span>
                <span><span className="leyenda-dot agotado" /> Sin disponibilidad</span>
                <span><span className="leyenda-dot seleccionado" /> Seleccionado</span>
              </div>
            </div>
          </div>

          {/* Accesos y Servicios */}
          <div className="detalle-seccion">
            <h2 className="detalle-seccion__titulo">Accesos y Servicios</h2>
            <div className="detalle-servicios">
              {parque.servicios.map((servicio, i) => {
                const Icono = servicioIconos[servicio] || servicioIconos['default']
                return (
                  <div key={i} className="detalle-servicio-item">
                    <Icono size={28} strokeWidth={1.5} />
                    <span>{servicio}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Panel derecho — Reserva */}
        <div className="detalle-reserva">

          {/* Stepper */}
          <div className="reserva-stepper">
            {pasos.map((paso, i) => (
              <div key={paso.num} className="reserva-stepper__item">
                <button
                  className={`stepper-circulo ${pasoActivo === paso.num ? 'activo' : ''} ${pasoActivo > paso.num ? 'completado' : ''}`}
                  onClick={() => setPasoActivo(paso.num)}
                >
                  {paso.num}
                </button>
                {i < pasos.length - 1 && <div className="stepper-linea" />}
              </div>
            ))}
          </div>

          {/* Contenido del paso activo */}
          <div className="reserva-contenido">

            {/* Paso 1: Fechas y Hospedaje */}
            {pasoActivo === 1 && (
              <div className="reserva-paso">
                <h3 className="reserva-paso__titulo">Fechas y Hospedaje</h3>
                <p className="reserva-paso__subtitulo">
                  {fechaSeleccionada
                    ? `Fecha seleccionada: ${fechaSeleccionada}`
                    : 'Selecciona una fecha en el calendario'}
                </p>

                <div className="reserva-hospedaje-lista">
                  {parque.hospedaje.map((tipo) => (
                    <div
                      key={tipo}
                      className={`reserva-hospedaje-item ${hospedajeSeleccionado === tipo ? 'activo' : ''}`}
                      onClick={() => setHospedajeSeleccionado(tipo)}
                    >
                      <span>{tipo}</span>
                      <button className="reserva-detalles-btn">Detalles</button>
                    </div>
                  ))}
                </div>

                <button
                  className="reserva-siguiente-btn"
                  disabled={!fechaSeleccionada || !hospedajeSeleccionado}
                  onClick={() => setPasoActivo(2)}
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Paso 2: Visitantes */}
            {pasoActivo === 2 && (
              <div className="reserva-paso">
                <h3 className="reserva-paso__titulo">Visitantes</h3>
                <p className="reserva-paso__subtitulo">¿Cuántas personas asistirán?</p>

                <div className="reserva-visitantes">
                  <button
                    className="visitantes-btn"
                    onClick={() => setVisitantes((v) => Math.max(1, v - 1))}
                  >
                    −
                  </button>
                  <span className="visitantes-num">{visitantes}</span>
                  <button
                    className="visitantes-btn"
                    onClick={() => setVisitantes((v) => Math.min(10, v + 1))}
                  >
                    +
                  </button>
                </div>

                <div className="reserva-resumen">
                  <p>{visitantes} × ${parque.precio} MXN</p>
                  <p className="reserva-resumen__total">
                    Total: ${parque.precio * visitantes} MXN
                  </p>
                </div>

                <button
                  className="reserva-siguiente-btn"
                  onClick={() => setPasoActivo(3)}
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Paso 3: Pago */}
            {pasoActivo === 3 && (
              <div className="reserva-paso">
                <h3 className="reserva-paso__titulo">Pago</h3>
                <p className="reserva-paso__subtitulo">Confirma tu reservación</p>

                <div className="reserva-resumen">
                  <p><span>Parque:</span> {parque.nombre}</p>
                  <p><span>Fecha:</span> {fechaSeleccionada}</p>
                  <p><span>Hospedaje:</span> {hospedajeSeleccionado}</p>
                  <p><span>Visitantes:</span> {visitantes}</p>
                  <p className="reserva-resumen__total">
                    Total: ${parque.precio * visitantes} MXN
                  </p>
                </div>

                <button
                  className="reserva-confirmar-btn"
                  onClick={() => setModalAbierto(true)}
                >
                  Pagar
                </button>
              </div>
            )}
          </div>

          {/* Subtotal fijo abajo */}
          <div className="reserva-subtotal">
            <span>Subtotal: ${subtotal} MXN</span>
            <ChevronRight size={18} />
          </div>
        </div>
      </div>

      {/* Modal de pago */}
      {modalAbierto && (
        <ModalPago
          reservacion={{
            parqueNombre: parque.nombre,
            fecha: fechaSeleccionada,
            hospedaje: hospedajeSeleccionado,
            personas: visitantes,
            total: parque.precio * visitantes
          }}
          onConfirmar={handleConfirmarPago}
          onCancelar={() => setModalAbierto(false)}
        />
      )}
    </div>
  )
}