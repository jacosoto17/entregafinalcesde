package com.example.PaseoAPP.controladores;

import com.example.PaseoAPP.dtos.ReservaDTO;
import com.example.PaseoAPP.modelos.Reserva;
import com.example.PaseoAPP.servicios.IReservaServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/paseoapi/v1/reservas")
public class ReservaControlador {

    private final IReservaServicio servicio;

    public ReservaControlador(IReservaServicio servicio) {
        this.servicio = servicio;
    }

    @PostMapping
    public ResponseEntity<ReservaDTO>controlarGuardado(@RequestBody Reserva datos){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.servicio.guardarReservaEnBD(datos));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservaDTO>controlarModificado(@RequestBody Reserva datos, @PathVariable UUID id){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.servicio.modificarReservaEnBD(datos,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>controlarBorrado(@PathVariable UUID id){
        this.servicio.eliminarReservaEnBD(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ReservaDTO>>controlarListado(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.servicio.buscarReservasEnBD());
    }

}
