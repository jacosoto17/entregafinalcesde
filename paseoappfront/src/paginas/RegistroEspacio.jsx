import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { guardarEspacio } from '../services/servicioEspacios.js'
import { mensajeError } from '../services/mensajeError.js'
import { Encabezado } from '../componentes/Encabezado'
import { TarjetaEspacio } from '../componentes/TarjetaEspacio.jsx'

const ESPACIO_VACIO = { nombre: '', descripcion: '', foto: '', aforo: '' }

export function RegistroEspacio() {
  const navegar = useNavigate()

  const [espacio, setEspacio] = useState(ESPACIO_VACIO)
  const [errores, setErrores] = useState({})
  const [errorApi, setErrorApi] = useState('')
  const [enviando, setEnviando] = useState(false)

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setEspacio({ ...espacio, [name]: value })
  }

  function validar() {
    const nuevosErrores = {}
    if (espacio.nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    }
    if (espacio.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = 'La descripción debe tener mínimo 10 caracteres'
    }
    if (!/^https?:\/\/\S+$/.test(espacio.foto)) {
      nuevosErrores.foto = 'Ingrese una URL válida (http:// o https://)'
    }
    if (espacio.aforo === '' || Number(espacio.aforo) <= 0) {
      nuevosErrores.aforo = 'El aforo debe ser un número mayor a 0'
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
      await guardarEspacio({ ...espacio, aforo: Number(espacio.aforo) })
      navegar('/listaespacios')
    } catch (error) {
      setErrorApi(mensajeError(error, 'No fue posible guardar el espacio'))
    } finally {
      setEnviando(false)
    }
  }

  const fotoValida = /^https?:\/\/\S+$/.test(espacio.foto)

  return (
    <>
      <Encabezado
        etiqueta="Administración"
        titulo="Registrar espacio"
        descripcion="Agrega una zona común de la unidad con su descripción, foto y aforo máximo."
      />

      <div className="formulario-con-vista">
        <form className="panel" onSubmit={manejarEnvio} noValidate>
          {errorApi && <div className="alerta alerta-error">{errorApi}</div>}

          <div className={'campo' + (errores.nombre ? ' con-error' : '')}>
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" name="nombre" placeholder="Salón social"
              value={espacio.nombre} onChange={manejarCambio} />
            <small>{errores.nombre}</small>
          </div>

          <div className={'campo' + (errores.descripcion ? ' con-error' : '')}>
            <label htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" rows="3"
              placeholder="Dónde queda en la unidad y qué normas de uso tiene"
              value={espacio.descripcion} onChange={manejarCambio} />
            <small>{errores.descripcion}</small>
          </div>

          <div className={'campo' + (errores.foto ? ' con-error' : '')}>
            <label htmlFor="foto">Foto (URL)</label>
            <input id="foto" type="url" name="foto" placeholder="https://..."
              value={espacio.foto} onChange={manejarCambio} />
            <small>{errores.foto}</small>
          </div>

          <div className={'campo' + (errores.aforo ? ' con-error' : '')}>
            <label htmlFor="aforo">Aforo</label>
            <input id="aforo" type="number" name="aforo" min="1" placeholder="Cantidad máxima de personas"
              value={espacio.aforo} onChange={manejarCambio} />
            <small>{errores.aforo}</small>
          </div>

          <button type="submit" className="boton boton-primario" disabled={enviando}>
            {enviando ? 'Guardando...' : 'Guardar espacio'}
          </button>
        </form>

        <aside className="vista-previa">
          <span className="vista-previa-etiqueta">Vista previa</span>
          <TarjetaEspacio
            espacio={{
              nombre: espacio.nombre || 'Nombre del espacio',
              descripcion: espacio.descripcion || 'Aquí aparecerá la descripción.',
              foto: fotoValida ? espacio.foto : '',
              aforo: espacio.aforo || 0,
            }}
          />
        </aside>
      </div>
    </>
  )
}
