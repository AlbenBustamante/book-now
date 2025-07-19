package dev.alben.booknowapi.module.auth.application.port.in.command;

/**
 * Command for log in.
 *
 * @param email    registered email to log in.
 * @param password password credential.
 */
public record LogInCommand(
        String email,
        String password
) {
}
