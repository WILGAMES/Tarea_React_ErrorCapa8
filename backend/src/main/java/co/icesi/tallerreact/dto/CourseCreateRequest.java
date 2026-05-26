package co.icesi.tallerreact.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CourseCreateRequest(
    @NotBlank(message = "El nombre del curso es obligatorio")
    @Size(max = 120, message = "El nombre del curso no puede superar 120 caracteres")
    String name
) {
}
