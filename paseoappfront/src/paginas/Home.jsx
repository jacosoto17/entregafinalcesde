import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSesion } from '../contexto/ContextoSesion.jsx'
import { listarEspacios } from '../services/servicioEspacios.js'
import { listarReservas } from '../services/servicioReservas.js'
import { listarUsuarios } from '../services/servicioUsuarios.js'

const ACCESOS = [
  {
    ruta: '/listaespacios', titulo: 'Ver espacios',
    texto: 'Piscina, gimnasio, salón social y parque infantil, con su aforo.', roles: ['USUARIO', 'ADMINISTRADOR'],
  },
  {
    ruta: '/reservas', titulo: 'Hacer una reserva',
    texto: 'Elige la fecha y la hora para usar un espacio.', roles: ['USUARIO', 'ADMINISTRADOR'],
  },
  {
    ruta: '/espacios', titulo: 'Registrar espacio',
    texto: 'Agrega una nueva zona común de la unidad.', roles: ['ADMINISTRADOR'],
  },
  {
    ruta: '/listareservas', titulo: 'Ver reservas',
    texto: 'Revisa todas las reservas de la unidad.', roles: ['ADMINISTRADOR'],
  },
  {
    ruta: '/listausuarios', titulo: 'Ver usuarios',
    texto: 'Consulta los residentes y administradores.', roles: ['ADMINISTRADOR'],
  },
]

export function Home() {
  const { usuario, esAdministrador } = useSesion()

  const [totales, setTotales] = useState({ espacios: null, reservas: null, usuarios: null })

  async function cargarTotales() {
    try {
      const espacios = await listarEspacios()
      const nuevosTotales = { espacios: espacios.length, reservas: null, usuarios: null }

      if (esAdministrador) {
        const reservas = await listarReservas()
        const usuarios = await listarUsuarios()
        nuevosTotales.reservas = reservas.length
        nuevosTotales.usuarios = usuarios.length
      }
      setTotales(nuevosTotales)
    } catch {
      setTotales({ espacios: '–', reservas: '–', usuarios: '–' })
    }
  }

  useEffect(() => {
    cargarTotales()
  }, [])

  const accesosVisibles = ACCESOS.filter((acceso) => acceso.roles.includes(usuario.rol))
  const primerNombre = usuario.nombres.split(' ')[0]

  const FOTO_PORTADA = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1800&q=80'

  function pintarAcceso(acceso, posicion) {
    return (
      <Link to={acceso.ruta} className="acceso" key={acceso.ruta}>
        <span className="acceso-numero">{String(posicion + 1).padStart(2, '0')}</span>
        <div className="acceso-texto">
          <h3>{acceso.titulo}</h3>
          <p>{acceso.texto}</p>
        </div>
        <i className="bi bi-arrow-right acceso-flecha"></i>
      </Link>
    )
  }

  return (
    <>
      <section className="portada" style={{ backgroundImage: `url(${FOTO_PORTADA})` }}>
        <div className="portada-texto">
          <span className="etiqueta etiqueta-clara">{esAdministrador ? 'Administración · Hacienda Niquía' : 'Hacienda Niquía · Ciudad Niquía'}</span>
          <h1>Hola, {primerNombre}</h1>
          <span className="adorno" aria-hidden="true"></span>
          <p>
            {esAdministrador
              ? 'Gestiona las zonas comunes, las reservas y los residentes de Hacienda Niquía.'
              : '¿Piscina, gimnasio o salón social? Aparta tu espacio en Hacienda Niquía.'}
          </p>
          <Link to="/reservas" className="boton boton-dorado">Reservar un espacio</Link>
        </div>
      </section>

      <section className="totales">
        <div className="total">
          <span className="total-numero">{totales.espacios ?? '…'}</span>
          <span className="etiqueta">Espacios</span>
        </div>
        {esAdministrador && (
          <>
            <div className="total">
              <span className="total-numero">{totales.reservas ?? '…'}</span>
              <span className="etiqueta">Reservas</span>
            </div>
            <div className="total">
              <span className="total-numero">{totales.usuarios ?? '…'}</span>
              <span className="etiqueta">Usuarios</span>
            </div>
          </>
        )}
      </section>

      <section className="seccion-accesos">
        <div className="seccion-accesos-titulo">
          <span className="etiqueta">Servicios</span>
          <h2>¿Qué deseas hacer?</h2>
          <span className="adorno" aria-hidden="true"></span>
        </div>
        <div className="accesos">{accesosVisibles.map(pintarAcceso)}</div>
      </section>
    </>
  )
}
