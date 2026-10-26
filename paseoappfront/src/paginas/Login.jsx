import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { iniciarSesion } from '../services/servicioAuth.js'
import { mensajeError } from '../services/mensajeError.js'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { PanelFormulario } from '../componentes/PanelFormulario'

export function Login() {
  const navegar = useNavigate()
  const { estaLogueado, guardarSesion } = useSesion()

  const [datos, setDatos] = useState({ correo: '', contraseña: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (estaLogueado) {
    return <Navigate to="/home" replace />
  }

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    setError('')
    setEnviando(true)

    try {
      const usuario = await iniciarSesion(datos.correo, datos.contraseña)
      guardarSesion(usuario)
      navegar('/home')
    } catch (error) {
      setError(mensajeError(error, 'No fue posible iniciar sesión'))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PanelFormulario
      titulo="Bienvenido de nuevo"
      subtitulo="Ingresa para reservar la piscina, el gimnasio o el salón social de la unidad."
    >

      {error && <div className="alerta alerta-error">{error}</div>}

      <form onSubmit={manejarEnvio}>
        <div className="campo">
          <label htmlFor="correo">Correo</label>
          <input id="correo" type="email" name="correo" placeholder="correo@ejemplo.com"
            value={datos.correo} onChange={manejarCambio} required />
        </div>

        <div className="campo">
          <label htmlFor="contraseña">Contraseña</label>
          <input id="contraseña" type="password" name="contraseña"
            value={datos.contraseña} onChange={manejarCambio} required />
        </div>

        <button type="submit" className="boton boton-primario boton-ancho" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="form-pie">
        ¿No tienes cuenta? <Link to="/">Regístrate</Link>
      </p>
    </PanelFormulario>
  )
}
