import { clienteApi } from './clienteApi.js'

const RUTA = '/reservas'

export async function guardarReserva(reserva) {
    const respuesta = await clienteApi.post(RUTA, reserva)
    return respuesta.data
}

export async function listarReservas() {
    const respuesta = await clienteApi.get(RUTA)
    return respuesta.data
}

export async function modificarReserva(id, reserva) {
    const respuesta = await clienteApi.put(RUTA + '/' + id, reserva)
    return respuesta.data
}

export async function eliminarReserva(id) {
    await clienteApi.delete(RUTA + '/' + id)
}
