/**
 * ModalPago.jsx
 * Modal de proceso de pago de EcoGlow.
 * Muestra un formulario con datos de tarjeta:
 *   - Nombre del tarjetahabiente
 *   - Número de tarjeta (16 dígitos, formato automático)
 *   - Fecha de vencimiento
 *   - CVC
 * Al confirmar llama a onConfirmar() con los datos de pago.
 * Al cancelar llama a onCancelar().
 */

import { useState } from 'react'
import { CreditCard, Lock } from 'lucide-react'
import './ModalPago.css'

export default function ModalPago({ reservacion, onConfirmar, onCancelar }) {
  const [form, setForm] = useState({
    nombre: '',
    tarjeta: '',
    vencimiento: '',
    cvc: ''
  })
  const [errores, setErrores] = useState({})
  const [procesando, setProcesando] = useState(false)

  /**
   * formatTarjeta - Formatea el número de tarjeta con espacios cada 4 dígitos.
   * @param {string} value
   * @returns {string}
   */
  const formatTarjeta = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim()
  }

  /**
   * formatVencimiento - Formatea la fecha de vencimiento como MM/AA.
   * @param {string} value
   * @returns {string}
   */
  const formatVencimiento = (value) => {
    const clean = value.replace(/\D/g, '').slice(0, 4)
    if (clean.length >= 2) {
      return clean.slice(0, 2) + '/' + clean.slice(2)
    }
    return clean
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let formatted = value

    if (name === 'tarjeta') formatted = formatTarjeta(value)
    if (name === 'vencimiento') formatted = formatVencimiento(value)
    if (name === 'cvc') formatted = value.replace(/\D/g, '').slice(0, 3)

    setForm((prev) => ({ ...prev, [name]: formatted }))
    setErrores((prev) => ({ ...prev, [name]: '' }))
  }

  /**
   * validar - Valida los campos del formulario de pago.
   * @returns {boolean}
   */
  const validar = () => {
    const nuevosErrores = {}
    if (!form.nombre.trim()) nuevosErrores.nombre = 'Ingresa el nombre del tarjetahabiente'
    if (form.tarjeta.replace(/\s/g, '').length < 16) nuevosErrores.tarjeta = 'Ingresa un número de tarjeta válido'
    if (form.vencimiento.length < 5) nuevosErrores.vencimiento = 'Ingresa la fecha de vencimiento'
    if (form.cvc.length < 3) nuevosErrores.cvc = 'Ingresa el CVC'
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  /**
   * handleConfirmar - Valida y simula el procesamiento del pago.
   * Llama a onConfirmar() si todo es correcto.
   */
  const handleConfirmar = async () => {
    if (!validar()) return
    setProcesando(true)

    // Simula procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setProcesando(false)
    onConfirmar()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-pago">

        {/* Header */}
        <div className="modal-pago__header">
          <div className="modal-pago__header-icon">
            <CreditCard size={22} />
          </div>
          <div>
            <h2 className="modal-pago__titulo">Datos de pago</h2>
            <p className="modal-pago__subtitulo">Total: ${reservacion.total} MXN</p>
          </div>
        </div>

        {/* Resumen de reservación */}
        <div className="modal-pago__resumen">
          <p><span>Parque:</span> {reservacion.parqueNombre}</p>
          <p><span>Fecha:</span> {reservacion.fecha}</p>
          <p><span>Hospedaje:</span> {reservacion.hospedaje}</p>
          <p><span>Visitantes:</span> {reservacion.personas}</p>
        </div>

        {/* Formulario */}
        <div className="modal-pago__form">

          {/* Nombre */}
          <div className="modal-campo">
            <label className="modal-label">Nombre del tarjetahabiente</label>
            <input
              className={`modal-input ${errores.nombre ? 'error' : ''}`}
              type="text"
              name="nombre"
              placeholder="Como aparece en la tarjeta"
              value={form.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <p className="modal-error">{errores.nombre}</p>}
          </div>

          {/* Número de tarjeta */}
          <div className="modal-campo">
            <label className="modal-label">Número de tarjeta</label>
            <input
              className={`modal-input ${errores.tarjeta ? 'error' : ''}`}
              type="text"
              name="tarjeta"
              placeholder="1234 5678 9012 3456"
              value={form.tarjeta}
              onChange={handleChange}
            />
            {errores.tarjeta && <p className="modal-error">{errores.tarjeta}</p>}
          </div>

          {/* Vencimiento y CVC */}
          <div className="modal-fila">
            <div className="modal-campo">
              <label className="modal-label">Vencimiento</label>
              <input
                className={`modal-input ${errores.vencimiento ? 'error' : ''}`}
                type="text"
                name="vencimiento"
                placeholder="MM/AA"
                value={form.vencimiento}
                onChange={handleChange}
              />
              {errores.vencimiento && <p className="modal-error">{errores.vencimiento}</p>}
            </div>
            <div className="modal-campo">
              <label className="modal-label">CVC</label>
              <input
                className={`modal-input ${errores.cvc ? 'error' : ''}`}
                type="text"
                name="cvc"
                placeholder="123"
                value={form.cvc}
                onChange={handleChange}
              />
              {errores.cvc && <p className="modal-error">{errores.cvc}</p>}
            </div>
          </div>
        </div>

        {/* Nota de seguridad */}
        <div className="modal-pago__seguridad">
          <Lock size={13} />
          <span>Pago simulado — tus datos no se almacenan</span>
        </div>

        {/* Botones */}
        <div className="modal-pago__acciones">
          <button
            className="modal-btn-cancelar"
            onClick={onCancelar}
            disabled={procesando}
          >
            Cancelar
          </button>
          <button
            className="modal-btn-confirmar"
            onClick={handleConfirmar}
            disabled={procesando}
          >
            {procesando ? 'Procesando...' : 'Confirmar pago'}
          </button>
        </div>
      </div>
    </div>
  )
}