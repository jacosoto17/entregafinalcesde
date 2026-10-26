import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { listarReservas, eliminarReserva } from '../services/servicioReservas.js'
import { mensajeError } from '../services/mensajeError.js'
import { Encabezado } from '../componentes/Encabezado'
import { Cargando, MensajeError, ListaVacia } from '../componentes/EstadoLista.jsx'

function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-').map(Number)
  const texto = new Date(anio, mes - 1, dia).toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export function ListaReservas() {
  const [reservas, setReservas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  async function cargarReservas() {
    try {
      const datos = await listarReservas()
      datos.sort((a, b) => (a.fecha + a.tiempo).localeCompare(b.fecha + b.tiempo))
      setReservas(datos)
    } catch (error) {
      setError(mensajeError(error, 'No fue posible cargar las reservas'))
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarReservas()
  }, [])

  async function borrar(reserva) {
    if (!window.confirm('¿Eliminar la reserva del ' + formatearFecha(reserva.fecha) + '?')) {
      return
    }
    try {
      await eliminarReserva(reserva.id)
      setReservas(reservas.filter((r) => r.id !== reserva.id))
    } catch (error) {
      setError(mensajeError(error, 'No fue posible eliminar la reserva'))
    }
  }

  function pintarReserva(reserva) {
    const [, mes, dia] = reserva.fecha.split('-')
    return (
      <li className="reserva" key={reserva.id}>
        <div className="reserva-dia">
          <strong>{dia}</strong>
          <span>{new Date(2000, Number(mes) - 1, 1).toLocaleDateString('es-CO', { month: 'short' })}</span>
        </div>
        <div className="reserva-datos">
          <span className="reserva-fecha">{formatearFecha(reserva.fecha)}</span>
          <span className="reserva-hora">{reserva.tiempo} h</span>
        </div>
        <button className="boton-icono boton-peligro" onClick={() => borrar(reserva)} title="Eliminar reserva">
          <i className="bi bi-trash3"></i>
        </button>
      </li>
    )
  }

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando reservas..." />
  } else if (error) {
    contenido = <MensajeError texto={error} />
  } else if (reservas.length === 0) {
    contenido = (
      <ListaVacia texto="Todavía no hay reservas.">
        <Link to="/reservas" className="boton boton-primario">Crear una reserva</Link>
      </ListaVacia>
    )
  } else {
    contenido = <ul className="lista-reservas">{reservas.map(pintarReserva)}</ul>
  }

  return (
    <>
      <Encabezado
        etiqueta="Administración"
        titulo="Reservas"
        descripcion="Todas las reservas de las zonas comunes de Hacienda Niquía."
      >
        <Link to="/reservas" className="boton boton-primario">
          Nueva reserva
        </Link>
      </Encabezado>
      {contenido}
    </>
  )
}
