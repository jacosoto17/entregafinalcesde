package com.example.PaseoAPP.validadores;

import com.example.PaseoAPP.modelos.Espacio;
import com.example.PaseoAPP.repositorios.IRepositorioEspacio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Component
public class ValidadorEspacioImpl implements IValidadorEspacio {

    private final IRepositorioEspacio repositorioEspacio;

    public ValidadorEspacioImpl(IRepositorioEspacio repositorioEspacio) {
        this.repositorioEspacio = repositorioEspacio;
    }

    @Override
    public void validarNuevoEspacio(Espacio datos) {
        validarNombreVacio(datos.getNombre());
        validarNombreNoRepetido(datos.getNombre(), null);
        validarDescripcion(datos.getDescripcion());
        validarFoto(datos.getFoto());
        validarAforo(datos.getAforo());
    }

    @Override
    public void validarDatosModificacion(Espacio datos, UUID id) {
        validarNombreVacio(datos.getNombre());
        validarNombreNoRepetido(datos.getNombre(), id);
        validarDescripcion(datos.getDescripcion());
        validarFoto(datos.getFoto());
        validarAforo(datos.getAforo());
    }

    public void validarNombreVacio(String nombre){
        if(nombre == null || nombre.isBlank()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El nombre del espacio es obligatorio"
            );
        }
    }

    public void validarNombreNoRepetido(String nombre, UUID idActual){
        repositorioEspacio.findByNombre(nombre).ifPresent(espacioExistente -> {
            if(idActual == null || !espacioExistente.getId().equals(idActual)){
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Ya existe un espacio con ese nombre"
                );
            }
        });
    }

    public void validarDescripcion(String descripcion){
        if(descripcion == null || descripcion.trim().length() < 10){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La descripción debe tener mínimo 10 caracteres"
            );
        }
    }

    public void validarFoto(String foto){
        if(foto == null || !foto.matches("^https?://\\S+$")){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La foto debe ser una URL válida (http:// o https://)"
            );
        }
    }

    public void validarAforo(int aforo){
        if(aforo <= 0){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El aforo debe ser un número mayor a 0"
            );
        }
    }

}
