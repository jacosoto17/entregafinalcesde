import { Navigate, Outlet } from 'react-router-dom'
import { useSesion } from '../contexto/ContextoSesion.jsx'

export function RutaPrivada() {
    const { estaLogueado } = useSesion()

    if (!estaLogueado) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
