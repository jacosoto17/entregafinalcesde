import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProveedorSesion } from './contexto/ContextoSesion'
import { RutaPrivada } from './rutas/RutaPrivada'
import { RutaPorRol } from './rutas/RutaPorRol'
import { Layout } from './componentes/Layout'

import { RegistroUsuario } from './paginas/RegistroUsuario'
import { Login } from './paginas/Login'
import { Home } from './paginas/Home'
import { RegistroEspacio } from './paginas/RegistroEspacio'
import { RegistroReserva } from './paginas/RegistroReserva'
import { ListaEspacios } from './paginas/ListaEspacios'
import { ListaUsuarios } from './paginas/ListaUsuarios'
import { ListaReservas } from './paginas/ListaReservas'

export function App() {
  return (
    <ProveedorSesion>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistroUsuario />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RutaPrivada />}>
            <Route element={<Layout />}>

              <Route path="/home" element={<Home />} />
              <Route path="/listaespacios" element={<ListaEspacios />} />
              <Route path="/reservas" element={<RegistroReserva />} />

              <Route element={<RutaPorRol rolesPermitidos={['ADMINISTRADOR']} />}>
                <Route path="/espacios" element={<RegistroEspacio />} />
                <Route path="/listareservas" element={<ListaReservas />} />
                <Route path="/listausuarios" element={<ListaUsuarios />} />
              </Route>

            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ProveedorSesion>
  )
}
