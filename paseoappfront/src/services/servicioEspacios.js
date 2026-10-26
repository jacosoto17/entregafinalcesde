import { clienteApi } from './clienteApi.js'

const RUTA = '/espacios'

export async function guardarEspacio(espacio) {
    const respuesta = await clienteApi.post(RUTA, espacio)
    return respuesta.data
}

export async function listarEspacios() {
    const respuesta = await clienteApi.get(RUTA)
    return respuesta.data
}

export async function modificarEspacio(id, espacio) {
    const respuesta = await clienteApi.put(RUTA + '/' + id, espacio)
    return respuesta.data
}

export async function eliminarEspacio(id) {
    await clienteApi.delete(RUTA + '/' + id)
}
