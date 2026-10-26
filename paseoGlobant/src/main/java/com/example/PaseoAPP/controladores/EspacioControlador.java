package com.example.PaseoAPP.controladores;

import com.example.PaseoAPP.dtos.EspacioDTO;
import com.example.PaseoAPP.modelos.Espacio;
import com.example.PaseoAPP.servicios.IEspacioServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/paseoapi/v1/espacios")
public class EspacioControlador {

    private final IEspacioServicio servicio;

    public EspacioControlador(IEspacioServicio servicio) {
        this.servicio = servicio;
    }

    @PostMapping
    public ResponseEntity<EspacioDTO>controlarGuardado(@RequestBody Espacio datos){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.servicio.guardarEspacioEnBD(datos));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EspacioDTO>controlarModificado(@RequestBody Espacio datos, @PathVariable UUID id){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.servicio.modificarEspacioEnBD(datos,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>controlarBorrado(@PathVariable UUID id){
        this.servicio.eliminarEspacioEnBD(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<EspacioDTO>>controlarListado(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.servicio.buscarEspaciosEnBD());
    }

}
