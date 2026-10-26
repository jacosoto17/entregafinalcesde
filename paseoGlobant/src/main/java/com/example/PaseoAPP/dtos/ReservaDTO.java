package com.example.PaseoAPP.dtos;

import java.util.UUID;

public record ReservaDTO(
        UUID id,
        String fecha,
        String tiempo
) {}
