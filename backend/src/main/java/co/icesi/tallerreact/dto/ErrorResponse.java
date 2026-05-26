package co.icesi.tallerreact.dto;

import java.time.Instant;

public record ErrorResponse(Instant timestamp, int status, String error) {
}
