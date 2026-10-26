# PaseoAPP – Backend (Spring Boot)

API REST para reservar zonas comunes de una unidad residencial.
Base URL: `http://localhost:8080/paseoapi/v1`

## Cómo correrlo
```
./mvnw spring-boot:run        (Windows: mvnw.cmd spring-boot:run)
```
Consola H2: http://localhost:8080/h2-console  (JDBC URL `jdbc:h2:file:./bd_paseo`, usuario `sa`, sin contraseña)

## Estructura (igual para cada entidad)
```
controladores/  -> reciben la petición HTTP y responden
servicios/      -> lógica de negocio (interfaz I...Servicio + implementación)
validadores/    -> reglas de validación (lanzan 400 / 409)
repositorios/   -> acceso a BD con JPA
mapeadores/     -> MapStruct: modelo -> DTO
dtos/           -> lo que se devuelve al front (records)
modelos/        -> entidades JPA
```

## Endpoints

| Método | Ruta | Descripción | Respuesta |
|---|---|---|---|
| POST | /usuarios | Registrar usuario | 201 UsuarioDTO (sin contraseña) |
| POST | /usuarios/login | Iniciar sesión `{correo, contraseña}` | 200 UsuarioDTO / 401 |
| GET | /usuarios | Listar usuarios | 200 |
| PUT | /usuarios/{id} | Modificar nombres | 200 |
| DELETE | /usuarios/{id} | Eliminar | 204 / 404 |
| POST | /espacios | Crear espacio | 201 EspacioDTO |
| GET | /espacios | Listar espacios | 200 |
| PUT | /espacios/{id} | Modificar espacio | 200 / 404 |
| DELETE | /espacios/{id} | Eliminar | 204 / 404 |
| POST | /reservas | Crear reserva `{fecha:"AAAA-MM-DD", tiempo:"HH:MM"}` | 201 ReservaDTO |
| GET | /reservas | Listar reservas | 200 |
| PUT | /reservas/{id} | Modificar reserva | 200 / 404 |
| DELETE | /reservas/{id} | Eliminar | 204 / 404 |

## Validaciones
- **Usuario:** nombres obligatorios, correo con formato válido y no repetido (409), contraseña ≥ 6 caracteres, rol obligatorio (`ADMINISTRADOR` | `USUARIO`).
- **Espacio:** nombre obligatorio y no repetido (409), descripción ≥ 10 caracteres, foto con URL http(s), aforo > 0.
- **Reserva:** fecha obligatoria, formato AAAA-MM-DD y no anterior a hoy; hora obligatoria en formato HH:MM.

Los errores llegan al front en `error.response.data.message` (activado con `server.error.include-message=always`).
