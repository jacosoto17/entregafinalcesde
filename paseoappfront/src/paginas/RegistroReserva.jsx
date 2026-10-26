import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { guardarReserva } from '../services/servicioReservas.js'
import { mensajeError } from '../services/mensajeError.js'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { Encabezado } from '../componentes/Encabezado'

export function RegistroReserva() {
  const navegar = useNavigate()
  const { esAdministrador } = useSesion()

  const [reserva, setReserva] = useState({ fecha: '', tiempo: '' })
  const [errores, setErrores] = useState({})
  const [errorApi, setErrorApi] = useState('')
  const [exito, setExito] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const hoy = new Date().toISOString().split('T')[0]

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setReserva({ ...reserva, [name]: value })
  }

  function validar() {
    const nuevosErrores = {}
    if (reserva.fecha === '') {
      nuevosErrores.fecha = 'La fecha es obligatoria'
    } else if (reserva.fecha < hoy) {
      nuevosErrores.fecha = 'La fecha no puede ser anterior a hoy'
    }
    if (reserva.tiempo === '') {
      nuevosErrores.tiempo = 'La hora es obligatoria'
    }
    return nuevosErrores
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()

    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    setErrorApi('')
    setEnviando(true)
    try {
      await guardarReserva(reserva)
      if (esAdministrador) {
        navegar('/listareservas')
      } else {
        setExito(true)
        setReserva({ fecha: '', tiempo: '' })
      }
    } catch (error) {
      setErrorApi(mensajeError(error, 'No fue posible guardar la reserva'))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <Encabezado
        etiqueta="Reservas"
        titulo="Nueva reserva"
        descripcion="Indica el día y la hora en que quieres usar el espacio."
      />

      <form className="panel panel-angosto" onSubmit={manejarEnvio} noValidate>
        {exito && (
          <div className="alerta alerta-exito">
            ¡Listo! Tu reserva quedó registrada.
          </div>
        )}
        {errorApi && <div className="alerta alerta-error">{errorApi}</div>}

        <div className="fila-campos">
          <div className={'campo' + (errores.fecha ? ' con-error' : '')}>
            <label htmlFor="fecha">Fecha</label>
            <input id="fecha" type="date" name="fecha" min={hoy}
              value={reserva.fecha} onChange={manejarCambio} />
            <small>{errores.fecha}</small>
          </div>

          <div className={'campo' + (errores.tiempo ? ' con-error' : '')}>
            <label htmlFor="tiempo">Hora</label>
            <input id="tiempo" type="time" name="tiempo"
              value={reserva.tiempo} onChange={manejarCambio} />
            <small>{errores.tiempo}</small>
          </div>
        </div>

        <button type="submit" className="boton boton-primario" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Confirmar reserva'}
        </button>
      </form>
    </>
  )
}
