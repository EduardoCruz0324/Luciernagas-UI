/**
 * App.jsx
 * Configuración principal de rutas de EcoGlow.
 * Define las rutas públicas y protegidas de la aplicación.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Explorar from './pages/Explorar'
import DetalleParque from './pages/DetalleParque'
import ProtectedRoute from './components/ProtectedRoute'
import Perfil from './pages/Perfil'
import Acerca from './pages/Acerca'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/home" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/explorar" element={
          <ProtectedRoute><Explorar /></ProtectedRoute>
        } />
        <Route path="/parque/:slug" element={
          <ProtectedRoute><DetalleParque /></ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute><Perfil /></ProtectedRoute>
        } />
        <Route path="/acerca" element={
          <ProtectedRoute><Acerca /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}