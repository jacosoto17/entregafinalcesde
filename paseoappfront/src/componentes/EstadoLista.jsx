export function Cargando({ texto }) {
  return (
    <div className="estado">
      <span className="cargando-linea" aria-hidden="true"></span>
      <p>{texto}</p>
    </div>
  )
}

export function MensajeError({ texto }) {
  return <div className="alerta alerta-error">{texto}</div>
}

export function ListaVacia({ texto, children }) {
  return (
    <div className="estado estado-vacio">
      <span className="adorno" aria-hidden="true"></span>
      <p>{texto}</p>
      {children}
    </div>
  )
}
