import { Navigate, Outlet } from 'react-router-dom'
import { useSesion } from '../contexto/ContextoSesion.jsx'

export function RutaPorRol({ rolesPermitidos }) {
    const { usuario } = useSesion()

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    if (!rolesPermitidos.includes(usuario.rol)) {
        return <Navigate to="/home" replace />
    }

    return <Outlet />
}
