package dev.alben.booknowapi.module.user.application.port.in.command;

import dev.alben.booknowapi.module.user.util.Role;
import org.springframework.web.multipart.MultipartFile;

/**
 * Command for users creation.
 *
 * @param name           first name.
 * @param lastName       last name.
 * @param email          email to verify.
 * @param password       plain password.
 * @param repeatPassword plain password repeated.
 * @param dni            official dni.
 * @param photoFile      photo file to storage in external service.
 * @param role           {@link Role}.
 */
public record CreateUserCommand(
        String name,
        String lastName,
        String email,
        String password,
        String repeatPassword,
        String dni,
        MultipartFile photoFile,
        Role role
) {
}
