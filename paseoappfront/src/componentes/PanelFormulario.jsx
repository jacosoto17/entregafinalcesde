const FOTO_FONDO = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80'

export function PanelFormulario({ titulo, subtitulo, children }) {
  return (
    <div className="auth" style={{ backgroundImage: `url(${FOTO_FONDO})` }}>
      <div className="auth-tarjeta">
        <div className="auth-cabecera">
          <span className="marca-nombre">Hacienda Niquía</span>
          <span className="auth-lugar">Unidad cerrada · Bello, Antioquia</span>
          <span className="adorno" aria-hidden="true"></span>
          <h1 className="auth-titulo">{titulo}</h1>
          <p className="auth-subtitulo">{subtitulo}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
