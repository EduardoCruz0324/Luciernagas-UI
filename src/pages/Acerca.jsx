/**
 * Acerca.jsx
 * Página informativa sobre el Festival Internacional de las Luciérnagas.
 * Contiene:
 *   - Hero con gradiente animado y datos clave del festival
 *   - Sección ¿Qué es el festival? con tarjetas de datos
 *   - Sección ¿Por qué ir? con razones visuales
 *   - Reglas de reservación con lista visual
 *   - FAQ con acordeón interactivo
 *   - CTA final para explorar parques
 * Requiere sesión activa (protegida por ProtectedRoute).
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  CalendarDays,
  TreePine,
  Users,
  Sparkles,
  Leaf,
  Heart,
  CheckCircle,
  ChevronDown,
  ArrowRight
} from 'lucide-react'
import './Acerca.css'

// Datos clave del festival
const DATOS_CLAVE = [
  { icono: CalendarDays, valor: '3', label: 'Días de recorridos' },
  { icono: TreePine, valor: '5', label: 'Parques participantes' },
  { icono: Users, valor: '+2000', label: 'Visitantes esperados' },
]

// Razones para ir
const RAZONES = [
  {
    icono: Sparkles,
    titulo: 'Bioluminiscencia única',
    descripcion: 'Contempla miles de luciérnagas iluminando el bosque en uno de los fenómenos naturales más espectaculares de México.'
  },
  {
    icono: Leaf,
    titulo: 'Ecoturismo responsable',
    descripcion: 'Todos los parques participantes están certificados y siguen estrictos protocolos de conservación del hábitat natural.'
  },
  {
    icono: Heart,
    titulo: 'Experiencia para todos',
    descripcion: 'Ideal para familias, parejas y grupos de amigos. Actividades complementarias para todos los gustos y edades.'
  }
]

// Reglas de reservación
const REGLAS = [
  'Reserva con anticipación, los cupos son limitados por parque y fecha.',
  'Se recomienda asistir a mayores de 10 años en recorridos nocturnos.',
  'No se permite el uso de linternas, flash o luz blanca durante el avistamiento.',
  'Los recorridos inician puntualmente, no se permiten retrasos.',
  'Está prohibido tocar, capturar o dañar a las luciérnagas.',
  'Se recomienda ropa oscura y calzado cómodo para caminar.',
  'Las cancelaciones deben realizarse con al menos 48 horas de anticipación.',
  'Los menores de edad deben ir acompañados de un adulto responsable.',
]

// Preguntas frecuentes
const FAQS = [
  {
    pregunta: '¿A qué hora empieza el recorrido nocturno?',
    respuesta: 'Los recorridos nocturnos generalmente inician entre las 7:30 y 8:00 pm, cuando comienza la actividad de las luciérnagas. Cada parque puede tener horarios específicos, por lo que se recomienda revisar los detalles al momento de reservar.'
  },
  {
    pregunta: '¿Puedo llevar niños al festival?',
    respuesta: 'Sí, el festival es apto para familias. Se recomienda que los niños tengan al menos 10 años para los recorridos nocturnos, ya que implican caminatas en terreno irregular y oscuridad. Durante el día hay actividades para todas las edades.'
  },
  {
    pregunta: '¿Qué debo llevar al festival?',
    respuesta: 'Ropa oscura y abrigadora (las noches en el bosque pueden ser frías), calzado cómodo para caminar, repelente de insectos sin fragancia fuerte, agua y snacks. No olvides tu código QR de reservación para el acceso.'
  },
  {
    pregunta: '¿Cómo llego a los parques?',
    respuesta: 'Los parques se ubican principalmente en Nanacamilpa, Tlaxcala y Amecameca, Estado de México. Puedes llegar en vehículo propio o en autobús desde la Ciudad de México. En la sección Explorar puedes ver la ubicación exacta de cada parque en el mapa.'
  },
  {
    pregunta: '¿Puedo cancelar o modificar mi reservación?',
    respuesta: 'Sí, puedes cancelar o modificar tu reservación desde la sección Mi Perfil con al menos 48 horas de anticipación para obtener un reembolso completo. Cancelaciones con menos tiempo pueden aplicar penalizaciones según las políticas de cada parque.'
  }
]

export default function Acerca() {
  const navigate = useNavigate()

  // Índice del FAQ abierto
  const [faqAbierto, setFaqAbierto] = useState(null)

  const toggleFaq = (index) => {
    setFaqAbierto(faqAbierto === index ? null : index)
  }

  return (
    <div className="acerca-container">
      <Navbar />

      {/* Hero */}
      <section className="acerca-hero">
        <div className="acerca-hero__overlay" />
        <div className="acerca-hero__contenido">
          <p className="acerca-hero__etiqueta">Festival Internacional</p>
          <h1 className="acerca-hero__titulo">
            De las <span>Luciérnagas</span>
          </h1>
          <p className="acerca-hero__fecha">
            Junio 2026 · Tlaxcala y Estado de México
          </p>
          <div className="acerca-hero__datos">
            {DATOS_CLAVE.map(({ icono: Icono, valor, label }) => (
              <div key={label} className="acerca-hero__dato">
                <Icono size={20} />
                <span className="acerca-hero__dato-valor">{valor}</span>
                <span className="acerca-hero__dato-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="acerca-body">

        {/* ¿Qué es el festival? */}
        <section className="acerca-seccion">
          <h2 className="acerca-seccion__titulo">¿Qué es el festival?</h2>
          <p className="acerca-seccion__texto">
            El Festival Internacional de las Luciérnagas es un evento ecoturístico único en México
            que reúne a miles de visitantes cada año para contemplar el fenómeno natural de la
            bioluminiscencia de las luciérnagas en su hábitat natural. Durante tres días, los parques
            oficiales abren sus puertas para ofrecer recorridos guiados nocturnos, talleres, actividades
            culturales, gastronomía local y opciones de hospedaje en plena naturaleza.
          </p>
          <p className="acerca-seccion__texto">
            El festival promueve un turismo responsable y ecológico, con estrictos protocolos de
            conservación para proteger el hábitat de estos insectos y garantizar que las generaciones
            futuras puedan disfrutar de este espectáculo natural.
          </p>
        </section>

        {/* ¿Por qué ir? */}
        <section className="acerca-seccion">
          <h2 className="acerca-seccion__titulo">¿Por qué ir?</h2>
          <div className="acerca-razones">
            {RAZONES.map(({ icono: Icono, titulo, descripcion }) => (
              <div key={titulo} className="acerca-razon-card">
                <div className="acerca-razon-card__icono">
                  <Icono size={28} strokeWidth={1.5} />
                </div>
                <h3 className="acerca-razon-card__titulo">{titulo}</h3>
                <p className="acerca-razon-card__descripcion">{descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reglas de reservación */}
        <section className="acerca-seccion">
          <h2 className="acerca-seccion__titulo">Reglas de Reservación</h2>
          <div className="acerca-reglas">
            {REGLAS.map((regla, i) => (
              <div key={i} className="acerca-regla-item">
                <CheckCircle size={18} className="acerca-regla-item__icono" />
                <p>{regla}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="acerca-seccion">
          <h2 className="acerca-seccion__titulo">Preguntas Frecuentes</h2>
          <div className="acerca-faq">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`acerca-faq__item ${faqAbierto === i ? 'abierto' : ''}`}
              >
                <button
                  className="acerca-faq__pregunta"
                  onClick={() => toggleFaq(i)}
                >
                  <span>{faq.pregunta}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-chevron ${faqAbierto === i ? 'rotado' : ''}`}
                  />
                </button>
                {faqAbierto === i && (
                  <p className="acerca-faq__respuesta">{faq.respuesta}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="acerca-cta">
          <h2 className="acerca-cta__titulo">¿Listo para vivir la experiencia?</h2>
          <p className="acerca-cta__texto">
            Explora los parques participantes, consulta disponibilidad y reserva tu lugar.
          </p>
          <button
            className="acerca-cta__btn"
            onClick={() => navigate('/explorar')}
          >
            Explorar parques <ArrowRight size={18} />
          </button>
        </section>

      </div>
    </div>
  )
}