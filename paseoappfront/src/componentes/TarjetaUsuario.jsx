export function TarjetaUsuario({ usuario, esUsuarioActual, alEliminar }) {
  const esAdmin = usuario.rol === 'ADMINISTRADOR'

  return (
    <tr>
      <td>
        <div className="usuario-celda">
          <span className="inicial">{usuario.nombres.charAt(0).toUpperCase()}</span>
          <span className="usuario-nombre">
            {usuario.nombres}
            {esUsuarioActual && <span className="chip-tu">Usted</span>}
          </span>
        </div>
      </td>
      <td className="texto-suave">{usuario.correo}</td>
      <td>
        <span className={'chip-rol' + (esAdmin ? ' chip-admin' : '')}>
          {esAdmin ? 'Administrador' : 'Residente'}
        </span>
      </td>
      <td className="celda-accion">
        {alEliminar && !esUsuarioActual && (
          <button className="boton-icono boton-peligro" onClick={() => alEliminar(usuario)} title="Eliminar usuario">
            <i className="bi bi-trash3"></i>
          </button>
        )}
      </td>
    </tr>
  )
}
