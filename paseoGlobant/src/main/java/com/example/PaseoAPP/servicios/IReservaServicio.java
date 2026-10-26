package com.example.PaseoAPP.servicios;

import com.example.PaseoAPP.dtos.ReservaDTO;
import com.example.PaseoAPP.modelos.Reserva;

import java.util.List;
import java.util.UUID;

public interface IReservaServicio {

    ReservaDTO guardarReservaEnBD(Reserva datos);
    ReservaDTO modificarReservaEnBD(Reserva datos, UUID id);
    List<ReservaDTO> buscarReservasEnBD();
    void eliminarReservaEnBD(UUID id);

}
