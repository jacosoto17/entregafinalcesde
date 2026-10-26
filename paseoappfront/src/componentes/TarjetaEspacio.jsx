export function TarjetaEspacio({ espacio, numero, alEliminar }) {
  return (
    <article className="tarjeta-espacio">
      <div className="tarjeta-espacio-foto">
        {espacio.foto
          ? <img src={espacio.foto} alt={espacio.nombre} loading="lazy" />
          : <div className="foto-vacia"><i className="bi bi-image"></i></div>}
        {numero && <span className="tarjeta-espacio-numero">{String(numero).padStart(2, '0')}</span>}
      </div>
      <div className="tarjeta-espacio-cuerpo">
        <span className="etiqueta">Aforo · {espacio.aforo} personas</span>
        <h3>{espacio.nombre}</h3>
        <p>{espacio.descripcion}</p>
        {alEliminar && (
          <button className="boton-texto boton-peligro" onClick={() => alEliminar(espacio)}>
            Eliminar espacio
          </button>
        )}
      </div>
    </article>
  )
}
