package dev.alben.booknowapi.module.auth.application.port.in.command;

import jakarta.validation.constraints.NotBlank;

/**
 * Command for log in.
 *
 * @param email    registered email to log in.
 * @param password password credential.
 */
public record LogInCommand(
        @NotBlank(message = "The email is mandatory")
        String email,
        @NotBlank(message = "The password is mandatory")
        String password
) {
}
