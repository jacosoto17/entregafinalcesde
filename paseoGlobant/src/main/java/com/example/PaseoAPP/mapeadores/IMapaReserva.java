package com.example.PaseoAPP.mapeadores;

import com.example.PaseoAPP.dtos.ReservaDTO;
import com.example.PaseoAPP.modelos.Reserva;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IMapaReserva {

    ReservaDTO convertir_modelo_a_dto(Reserva reserva);
    List<ReservaDTO> convertir_lista_de_modelo_a_lista_de_dto(List<Reserva> lista);
}
