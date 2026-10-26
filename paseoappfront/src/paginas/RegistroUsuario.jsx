import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { guardarUsuario } from '../services/servicioUsuarios.js'
import { mensajeError } from '../services/mensajeError.js'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { PanelFormulario } from '../componentes/PanelFormulario'

export function RegistroUsuario() {
  const navegar = useNavigate()
  const { guardarSesion } = useSesion()

  const [usuario, setUsuario] = useState({
    nombres: '',
    correo: '',
    contraseña: '',
    rol: '',
  })
  const [errores, setErrores] = useState({})
  const [errorApi, setErrorApi] = useState('')
  const [enviando, setEnviando] = useState(false)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setUsuario({ ...usuario, [name]: value })
  }

  function validar() {
    const nuevosErrores = {}
    if (usuario.nombres.trim() === '') {
      nuevosErrores.nombres = 'Los nombres son obligatorios'
    }
    if (!/^\S+@\S+\.\S+$/.test(usuario.correo)) {
      nuevosErrores.correo = 'Ingrese un correo válido'
    }
    if (usuario.contraseña.length < 6) {
      nuevosErrores.contraseña = 'La contraseña debe tener mínimo 6 caracteres'
    }
    if (usuario.rol === '') {
      nuevosErrores.rol = 'Seleccione un rol'
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
      const usuarioGuardado = await guardarUsuario(usuario)
      guardarSesion(usuarioGuardado)
      navegar('/home')
    } catch (error) {
      setErrorApi(mensajeError(error, 'No fue posible registrar el usuario'))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PanelFormulario
      titulo="Únete a la comunidad"
      subtitulo="Crea tu cuenta de residente y reserva las zonas comunes de Hacienda Niquía."
    >

      {errorApi && <div className="alerta alerta-error">{errorApi}</div>}

      <form onSubmit={manejarEnvio} noValidate>
        <div className={'campo' + (errores.nombres ? ' con-error' : '')}>
          <label htmlFor="nombres">Nombres</label>
          <input id="nombres" type="text" name="nombres" placeholder="Juan Pérez"
            value={usuario.nombres} onChange={manejarCambio} />
          <small>{errores.nombres}</small>
        </div>

        <div className={'campo' + (errores.correo ? ' con-error' : '')}>
          <label htmlFor="correo">Correo</label>
          <input id="correo" type="email" name="correo" placeholder="correo@ejemplo.com"
            value={usuario.correo} onChange={manejarCambio} />
          <small>{errores.correo}</small>
        </div>

        <div className={'campo' + (errores.contraseña ? ' con-error' : '')}>
          <label htmlFor="contraseña">Contraseña</label>
          <input id="contraseña" type="password" name="contraseña" placeholder="Mínimo 6 caracteres"
            value={usuario.contraseña} onChange={manejarCambio} />
          <small>{errores.contraseña}</small>
        </div>

        <div className={'campo' + (errores.rol ? ' con-error' : '')}>
          <label>Rol</label>
          <div className="opciones-rol">
            <label className={'opcion-rol' + (usuario.rol === 'USUARIO' ? ' elegida' : '')}>
              <input type="radio" name="rol" value="USUARIO"
                checked={usuario.rol === 'USUARIO'} onChange={manejarCambio} />
              <span>Residente</span>
            </label>
            <label className={'opcion-rol' + (usuario.rol === 'ADMINISTRADOR' ? ' elegida' : '')}>
              <input type="radio" name="rol" value="ADMINISTRADOR"
                checked={usuario.rol === 'ADMINISTRADOR'} onChange={manejarCambio} />
              <span>Administrador</span>
            </label>
          </div>
          <small>{errores.rol}</small>
        </div>

        <button type="submit" className="boton boton-primario boton-ancho" disabled={enviando}>
          {enviando ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>

      <p className="form-pie">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </PanelFormulario>
  )
}
