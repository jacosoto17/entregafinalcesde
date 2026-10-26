# PaseoAPP – Frontend (React + Vite)

## Cómo correrlo
1. Encender el backend (`paseoGlobant`) en `http://localhost:8080`.
2. En esta carpeta:
```
npm install
npm run dev
```
La URL del API se puede cambiar con la variable `VITE_API_URL` en un archivo `.env`.

## Rutas y roles

| Ruta | Página | USUARIO | ADMINISTRADOR |
|---|---|:-:|:-:|
| `/` | Registro de usuario | público | público |
| `/login` | Inicio de sesión | público | público |
| `/home` | Inicio (muestra opciones según el rol) | ✅ | ✅ |
| `/listaespacios` | Lista de espacios | ✅ | ✅ (puede eliminar) |
| `/reservas` | Formulario de reserva | ✅ | ✅ |
| `/espacios` | Formulario de espacio | ❌ | ✅ |
| `/listareservas` | Lista de reservas | ❌ | ✅ |
| `/listausuarios` | Lista de usuarios | ❌ | ✅ |

Las rutas se definen en `src/App.jsx`. El menú lateral (`src/componentes/Layout.jsx`) y los accesos del
inicio (`src/paginas/Home.jsx`) tienen una lista con los `roles` que pueden ver cada opción.

## Estructura
```
src/
  componentes/  Layout (menú lateral), PanelFormulario (login/registro), Encabezado, tarjetas, estados de lista
  contexto/     ContextoSesion: usuario logueado (se guarda en localStorage)
  paginas/      una página por ruta
  rutas/        RutaPrivada (exige sesión) y RutaPorRol (exige un rol)
  services/     llamadas al API con axios + mensajeError (saca el mensaje que manda Spring)
  estilos.css   todo el diseño; los colores y fuentes están en :root al inicio
```
