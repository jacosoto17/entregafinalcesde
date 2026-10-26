package com.example.PaseoAPP.servicios;

import com.example.PaseoAPP.dtos.ReservaDTO;
import com.example.PaseoAPP.mapeadores.IMapaReserva;
import com.example.PaseoAPP.modelos.Reserva;
import com.example.PaseoAPP.repositorios.IRepositorioReserva;
import com.example.PaseoAPP.validadores.IValidadorReserva;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class ReservaServicioImpl implements IReservaServicio {

    private final IMapaReserva mapaReserva;
    private final IRepositorioReserva repositorioReserva;
    private final IValidadorReserva validadorReserva;

    public ReservaServicioImpl(IMapaReserva mapaReserva, IRepositorioReserva repositorioReserva, IValidadorReserva validadorReserva) {
        this.mapaReserva = mapaReserva;
        this.repositorioReserva = repositorioReserva;
        this.validadorReserva = validadorReserva;
    }

    @Override
    public ReservaDTO guardarReservaEnBD(Reserva datos) {
        this.validadorReserva.validarReserva(datos);

        Reserva reservaGuardada = this.repositorioReserva.save(datos);
        return this.mapaReserva.convertir_modelo_a_dto(reservaGuardada);
    }

    @Override
    public ReservaDTO modificarReservaEnBD(Reserva datos, UUID id) {
        Reserva reservaQueEncontre = buscarReservaOFallar(id);

        this.validadorReserva.validarReserva(datos);

        reservaQueEncontre.setFecha(datos.getFecha());
        reservaQueEncontre.setTiempo(datos.getTiempo());
        Reserva reservaModificada = this.repositorioReserva.save(reservaQueEncontre);

        return this.mapaReserva.convertir_modelo_a_dto(reservaModificada);
    }

    @Override
    public List<ReservaDTO> buscarReservasEnBD() {
        List<Reserva> reservasEncontradas = this.repositorioReserva.findAll();
        return this.mapaReserva.convertir_lista_de_modelo_a_lista_de_dto(reservasEncontradas);
    }

    @Override
    public void eliminarReservaEnBD(UUID id) {
        buscarReservaOFallar(id);
        this.repositorioReserva.deleteById(id);
    }

    private Reserva buscarReservaOFallar(UUID id){
        return this.repositorioReserva.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "reserva no encontrada"));
    }
}
