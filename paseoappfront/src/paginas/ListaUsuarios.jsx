import { useEffect, useState } from 'react'

import { listarUsuarios, eliminarUsuario } from '../services/servicioUsuarios.js'
import { mensajeError } from '../services/mensajeError.js'
import { useSesion } from '../contexto/ContextoSesion.jsx'
import { Encabezado } from '../componentes/Encabezado'
import { TarjetaUsuario } from '../componentes/TarjetaUsuario'
import { Cargando, MensajeError, ListaVacia } from '../componentes/EstadoLista.jsx'

export function ListaUsuarios() {
  const { usuario: usuarioActual } = useSesion()

  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  async function cargarUsuarios() {
    try {
      const datos = await listarUsuarios()
      setUsuarios(datos)
    } catch (error) {
      setError(mensajeError(error, 'No fue posible cargar los usuarios'))
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  async function borrar(usuario) {
    if (!window.confirm('¿Eliminar a ' + usuario.nombres + '?')) {
      return
    }
    try {
      await eliminarUsuario(usuario.id)
      setUsuarios(usuarios.filter((u) => u.id !== usuario.id))
    } catch (error) {
      setError(mensajeError(error, 'No fue posible eliminar el usuario'))
    }
  }

  function pintarUsuario(usuario) {
    return (
      <TarjetaUsuario
        key={usuario.id}
        usuario={usuario}
        esUsuarioActual={usuario.id === usuarioActual.id}
        alEliminar={borrar}
      />
    )
  }

  const totalAdmins = usuarios.filter((u) => u.rol === 'ADMINISTRADOR').length

  let contenido
  if (cargando) {
    contenido = <Cargando texto="Cargando usuarios..." />
  } else if (error) {
    contenido = <MensajeError texto={error} />
  } else if (usuarios.length === 0) {
    contenido = <ListaVacia texto="No hay usuarios registrados." />
  } else {
    contenido = (
      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th><span className="visually-hidden">Acciones</span></th>
            </tr>
          </thead>
          <tbody>{usuarios.map(pintarUsuario)}</tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <Encabezado
        etiqueta="Administración"
        titulo="Usuarios"
        descripcion={
          cargando || error
            ? 'Residentes y administradores de Hacienda Niquía.'
            : usuarios.length + (usuarios.length === 1 ? ' usuario · ' : ' usuarios · ')
              + totalAdmins + (totalAdmins === 1 ? ' administrador' : ' administradores')
        }
      />
      {contenido}
    </>
  )
}
