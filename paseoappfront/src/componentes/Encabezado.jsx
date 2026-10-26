export function Encabezado({ etiqueta, titulo, descripcion, children }) {
  return (
    <div className="encabezado">
      {etiqueta && <span className="etiqueta">{etiqueta}</span>}
      <h1 className="encabezado-titulo">{titulo}</h1>
      <span className="adorno" aria-hidden="true"></span>
      {descripcion && <p className="encabezado-descripcion">{descripcion}</p>}
      {children && <div className="encabezado-acciones">{children}</div>}
    </div>
  )
}
