import { createContext, useContext, useState } from 'react'

const ContextoSesion = createContext(null)

const CLAVE = 'sesionHaciendaNiquia'

function leerSesionGuardada() {
    try {
        const texto = localStorage.getItem(CLAVE)
        return texto ? JSON.parse(texto) : null
    } catch {
        return null
    }
}

export function ProveedorSesion({ children }) {

    const [usuario, setUsuario] = useState(leerSesionGuardada)

    function guardarSesion(usuarioLogueado) {
        localStorage.setItem(CLAVE, JSON.stringify(usuarioLogueado))
        setUsuario(usuarioLogueado)
    }

    function cerrarSesion() {
        localStorage.removeItem(CLAVE)
        setUsuario(null)
    }

    const valor = {
        usuario,
        estaLogueado: usuario !== null,
        esAdministrador: usuario?.rol === 'ADMINISTRADOR',
        guardarSesion,
        cerrarSesion,
    }

    return (
        <ContextoSesion.Provider value={valor}>
            {children}
        </ContextoSesion.Provider>
    )
}

export function useSesion() {
    return useContext(ContextoSesion)
}
