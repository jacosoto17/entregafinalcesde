package com.example.PaseoAPP.validadores;

import com.example.PaseoAPP.modelos.Reserva;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;

@Component
public class ValidadorReservaImpl implements IValidadorReserva {

    @Override
    public void validarReserva(Reserva datos) {
        validarFecha(datos.getFecha());
        validarTiempo(datos.getTiempo());
    }

    public void validarFecha(String fecha){
        if(fecha == null || fecha.isBlank()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La fecha es obligatoria"
            );
        }
        LocalDate fechaReserva;
        try{
            fechaReserva = LocalDate.parse(fecha);
        }catch(DateTimeParseException error){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La fecha debe tener el formato AAAA-MM-DD"
            );
        }
        if(fechaReserva.isBefore(LocalDate.now())){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La fecha no puede ser anterior a hoy"
            );
        }
    }

    public void validarTiempo(String tiempo){
        if(tiempo == null || tiempo.isBlank()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La hora es obligatoria"
            );
        }
        try{
            LocalTime.parse(tiempo);
        }catch(DateTimeParseException error){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La hora debe tener el formato HH:MM"
            );
        }
    }

}
