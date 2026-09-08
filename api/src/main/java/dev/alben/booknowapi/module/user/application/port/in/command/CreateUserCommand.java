package dev.alben.booknowapi.module.user.application.port.in.command;

import dev.alben.booknowapi.module.user.util.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import static dev.alben.booknowapi.module.user.util.UserConstants.BIOGRAPHY_LENGTH;
import static dev.alben.booknowapi.module.user.util.UserConstants.OCCUPATION_LENGTH;

/**
 * Command for users creation.
 *
 * @param name           first name.
 * @param lastName       last name.
 * @param email          email to verify.
 * @param password       plain password.
 * @param repeatPassword plain password repeated.
 *                       // @param dni            official dni.
 * @param photoFile      photo file to storage in external service.
 * @param role           {@link Role}.
 */
public record CreateUserCommand(
        @NotBlank(message = "The name is required")
        String name,
        @NotBlank(message = "The last name is required")
        String lastName,
        @NotBlank(message = "The email is required")
        @Email(message = "The email is not valid")
        String email,
        @NotBlank(message = "The password is required")
        String password,
        @NotBlank(message = "The password confirmation is required")
        String repeatPassword,
        // @NotBlank(message = "The DNI is required")
        // String dni,
        MultipartFile photoFile,
        Role role,
        @Length(max = OCCUPATION_LENGTH)
        String occupation,
        @Length(max = BIOGRAPHY_LENGTH)
        String biography
) {
}
