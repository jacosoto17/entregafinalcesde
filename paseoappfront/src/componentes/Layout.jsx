import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSesion } from '../contexto/ContextoSesion.jsx'

const OPCIONES_MENU = [
  { ruta: '/home', texto: 'Inicio', roles: ['USUARIO', 'ADMINISTRADOR'] },
  { ruta: '/listaespacios', texto: 'Espacios', roles: ['USUARIO', 'ADMINISTRADOR'] },
  { ruta: '/reservas', texto: 'Reservar', roles: ['USUARIO', 'ADMINISTRADOR'] },
  { ruta: '/espacios', texto: 'Nuevo espacio', roles: ['ADMINISTRADOR'] },
  { ruta: '/listareservas', texto: 'Reservas', roles: ['ADMINISTRADOR'] },
  { ruta: '/listausuarios', texto: 'Usuarios', roles: ['ADMINISTRADOR'] },
]

export function Layout() {
  const navegar = useNavigate()
  const { usuario, esAdministrador, cerrarSesion } = useSesion()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const opcionesVisibles = OPCIONES_MENU.filter((opcion) => opcion.roles.includes(usuario.rol))

  function salir() {
    cerrarSesion()
    navegar('/login')
  }

  function pintarOpcion(opcion) {
    return (
      <li key={opcion.ruta}>
        <NavLink
          to={opcion.ruta}
          className={({ isActive }) => 'menu-enlace' + (isActive ? ' activo' : '')}
          onClick={() => setMenuAbierto(false)}
        >
          {opcion.texto}
        </NavLink>
      </li>
    )
  }

  return (
    <div className="app">
      <header className="cabecera">
        <div className="cabecera-fila contenedor">
          <button className="boton-icono solo-movil" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menú">
            <i className={'bi ' + (menuAbierto ? 'bi-x-lg' : 'bi-list')}></i>
          </button>

          <Link to="/home" className="marca">
            <span className="marca-nombre">Hacienda Niquía</span>
            <span className="marca-lema">Unidad cerrada · Ciudad Niquía · Bello</span>
          </Link>

          <div className="cabecera-usuario">
            <div className="cabecera-usuario-datos">
              <span className="cabecera-usuario-nombre">{usuario.nombres}</span>
              <span className="cabecera-usuario-rol">{esAdministrador ? 'Administrador' : 'Residente'}</span>
            </div>
            <button className="boton-icono" onClick={salir} title="Cerrar sesión" aria-label="Cerrar sesión">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>

        <nav className={'menu-contenedor' + (menuAbierto ? ' abierto' : '')}>
          <ul className="menu">{opcionesVisibles.map(pintarOpcion)}</ul>
        </nav>
      </header>

      <main className="contenido contenedor">
        <Outlet />
      </main>

      <footer className="pie">
        <span className="marca-nombre">Hacienda Niquía</span>
        <p>Unidad cerrada · Ciudad Niquía, Bello, Antioquia · © 2026</p>
      </footer>
    </div>
  )
}
