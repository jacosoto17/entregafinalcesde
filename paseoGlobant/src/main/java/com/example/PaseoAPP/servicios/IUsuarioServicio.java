package com.example.PaseoAPP.servicios;

import com.example.PaseoAPP.dtos.LoginDTO;
import com.example.PaseoAPP.dtos.UsuarioDTO;
import com.example.PaseoAPP.modelos.Usuario;

import java.util.List;
import java.util.UUID;

public interface IUsuarioServicio {

    UsuarioDTO guardarUsuarioEnBD(Usuario datos);
    UsuarioDTO modificarUsuarioEnBD(Usuario datos, UUID id);
    List<UsuarioDTO> buscarUsuariosEnBD();
    void eliminarUsuarioEnBD(UUID id);
    UsuarioDTO iniciarSesion(LoginDTO datos);

}
