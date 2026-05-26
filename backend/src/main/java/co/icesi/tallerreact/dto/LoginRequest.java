package co.icesi.tallerreact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    @Email(message = "Debes enviar un correo válido")
    @NotBlank(message = "El correo es obligatorio")
    String email,
    @NotBlank(message = "La contraseña es obligatoria")
    String password
) {
}
