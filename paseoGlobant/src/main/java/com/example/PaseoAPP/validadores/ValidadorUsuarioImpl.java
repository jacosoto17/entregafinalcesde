package com.example.PaseoAPP.validadores;

import com.example.PaseoAPP.modelos.Usuario;
import com.example.PaseoAPP.repositorios.IRepositorioUsuario;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class ValidadorUsuarioImpl implements IValidadorUsuario {

    private final IRepositorioUsuario repositorioUsuario;

    public ValidadorUsuarioImpl(IRepositorioUsuario repositorioUsuario) {
        this.repositorioUsuario = repositorioUsuario;
    }

    @Override
    public void validarNuevoUsuario(Usuario datos) {
        validarNombreVacio(datos.getNombres());
        validarFormatoCorreo(datos.getCorreo());
        validarCorreoNoRepetido(datos.getCorreo());
        validarLongitudContraseña(datos.getContraseña());
        validarRol(datos);

    }

    @Override
    public void validarDatosModificacion(Usuario datos) {
        validarNombreVacio(datos.getNombres());
    }

    public void validarCorreoNoRepetido(String correo){
        if(repositorioUsuario.findByCorreoIgnoreCase(correo).isPresent()){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Ya existe un usuario con el correo ingresado"
            );

        }
    }
    public void validarNombreVacio(String nombres){
        if(nombres == null || nombres.isBlank()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El nombre es obligatorio, ingresalo por favor"
            );
        }
    }
    public void validarFormatoCorreo(String correo){
        if(correo == null || !correo.matches("^\\S+@\\S+\\.\\S+$")){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ingrese un correo válido"
            );
        }
    }
    public void validarRol(Usuario datos){
        if(datos.getRol() == null){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Seleccione un rol"
            );
        }
    }
    public void validarLongitudContraseña(String contraseña){
        if(contraseña == null || contraseña.length()<6){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Contraseña invalida, revisala por favor"
            );

        }
    }

}
