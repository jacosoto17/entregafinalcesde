import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { listarEspacios, eliminarEspacio } from '../services/servicioEspacios.js'
import { mensajeError } from '../services/mensajeError.js'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { Encabezado } from '../componentes/Encabezado'
import { TarjetaEspacio } from '../componentes/TarjetaEspacio.jsx'
import { Cargando, MensajeError, ListaVacia } from '../componentes/EstadoLista.jsx'

export function ListaEspacios() {
  const { esAdministrador } = useSesion()

  const [espacios, setEspacios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  async function cargarEspacios() {
    try {
      const datos = await listarEspacios()
      setEspacios(datos)
    } catch (error) {
      setError(mensajeError(error, 'No fue posible cargar los espacios'))
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarEspacios()
  }, [])

  async function borrar(espacio) {
    if (!window.confirm('¿Eliminar el espacio "' + espacio.nombre + '"?')) {
      return
    }
    try {
      await eliminarEspacio(espacio.id)
      setEspacios(espacios.filter((e) => e.id !== espacio.id))
    } catch (error) {
      setError(mensajeError(error, 'No fue posible eliminar el espacio'))
    }
  }

  function pintarEspacio(espacio, posicion) {
    return (
      <TarjetaEspacio
        key={espacio.id}
        espacio={espacio}
        numero={posicion + 1}
        alEliminar={esAdministrador ? borrar : null}
      />
    )
  }

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando espacios..." />
  } else if (error) {
    contenido = <MensajeError texto={error} />
  } else if (espacios.length === 0) {
    contenido = (
      <ListaVacia texto="Todavía no hay espacios registrados.">
        {esAdministrador && <Link to="/espacios" className="boton boton-primario">Registrar el primero</Link>}
      </ListaVacia>
    )
  } else {
    contenido = <section className="rejilla-espacios">{espacios.map(pintarEspacio)}</section>
  }

  return (
    <>
      <Encabezado
        etiqueta="Zonas comunes"
        titulo="Espacios"
        descripcion="Piscina, gimnasio, salón social y más: los espacios que puedes reservar en la unidad."
      >
        {esAdministrador && (
          <Link to="/espacios" className="boton boton-primario">
            Nuevo espacio
          </Link>
        )}
        <Link to="/reservas" className="boton boton-secundario">
          Reservar
        </Link>
      </Encabezado>
      {contenido}
    </>
  )
}
