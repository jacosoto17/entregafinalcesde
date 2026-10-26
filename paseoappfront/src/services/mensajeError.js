export function mensajeError(error, mensajePorDefecto) {
    if (error.response?.data?.message) {
        return error.response.data.message
    }
    if (!error.response) {
        return 'No se pudo conectar con el servidor. ¿Está encendido el backend?'
    }
    return mensajePorDefecto
}
