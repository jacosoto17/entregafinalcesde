import { clienteApi } from './clienteApi.js'

export async function iniciarSesion(correo, contraseña) {
    const respuesta = await clienteApi.post('/usuarios/login', { correo, contraseña })
    return respuesta.data
}
