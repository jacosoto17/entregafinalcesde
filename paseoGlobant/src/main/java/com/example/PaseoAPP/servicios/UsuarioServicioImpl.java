package com.example.PaseoAPP.servicios;

import com.example.PaseoAPP.dtos.LoginDTO;
import com.example.PaseoAPP.dtos.UsuarioDTO;
import com.example.PaseoAPP.mapeadores.IMapaUsuario;
import com.example.PaseoAPP.modelos.Usuario;
import com.example.PaseoAPP.repositorios.IRepositorioUsuario;
import com.example.PaseoAPP.validadores.IValidadorUsuario;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioServicioImpl implements IUsuarioServicio {

    private final IMapaUsuario mapaUsuario;
    private final IRepositorioUsuario repositorioUsuario;

    private final IValidadorUsuario validadorUsuario;

    public UsuarioServicioImpl(IMapaUsuario mapaUsuario, IRepositorioUsuario repositorioUsuario, IValidadorUsuario validadorUsuario) {
        this.mapaUsuario = mapaUsuario;
        this.repositorioUsuario = repositorioUsuario;
        this.validadorUsuario = validadorUsuario;
    }

    @Override
    public UsuarioDTO guardarUsuarioEnBD(Usuario datos) {

        this.validadorUsuario.validarNuevoUsuario(datos);

        Usuario usuarioGuardado=this.repositorioUsuario.save(datos);
        return this.mapaUsuario.convertir_modelo_a_dto(usuarioGuardado);

    }

    @Override
    public UsuarioDTO modificarUsuarioEnBD(Usuario datos, UUID id) {

        Optional<Usuario> usuarioQueEstoyBuscando=this.repositorioUsuario.findById(id);
        if(usuarioQueEstoyBuscando.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"usuario no encontrado");
        }
        Usuario usuarioQueEncontre=usuarioQueEstoyBuscando.get();

        this.validadorUsuario.validarDatosModificacion(datos);

        usuarioQueEncontre.setNombres(datos.getNombres());
        Usuario usuarioModificado=this.repositorioUsuario.save(usuarioQueEncontre);

        return this.mapaUsuario.convertir_modelo_a_dto(usuarioModificado);

    }

    @Override
    public List<UsuarioDTO> buscarUsuariosEnBD() {

        List<Usuario> usuariosEncontrados=this.repositorioUsuario.findAll();
        return this.mapaUsuario.convertir_lista_de_modelo_a_lista_de_dto(usuariosEncontrados);

    }

    @Override
    public void eliminarUsuarioEnBD(UUID id) {
        Optional<Usuario> usuarioQueEstoyBuscando=this.repositorioUsuario.findById(id);
        if(usuarioQueEstoyBuscando.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"usuario no encontrado");
        }
        this.repositorioUsuario.deleteById(id);

    }

    @Override
    public UsuarioDTO iniciarSesion(LoginDTO datos) {
        ResponseStatusException credencialesInvalidas = new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos");

        if(datos == null || datos.correo() == null || datos.contraseña() == null){
            throw credencialesInvalidas;
        }

        Usuario usuarioEncontrado = this.repositorioUsuario.findByCorreoIgnoreCase(datos.correo())
                .orElseThrow(() -> credencialesInvalidas);

        if(!usuarioEncontrado.getContraseña().equals(datos.contraseña())){
            throw credencialesInvalidas;
        }

        return this.mapaUsuario.convertir_modelo_a_dto(usuarioEncontrado);
    }
}
