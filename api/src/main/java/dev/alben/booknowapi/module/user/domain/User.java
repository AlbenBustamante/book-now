package dev.alben.booknowapi.module.user.domain;

import dev.alben.booknowapi.core.auditable.Auditable;
import dev.alben.booknowapi.module.user.util.Role;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain model for users.
 *
 * @param id                ID.
 * @param name              first name.
 * @param lastName          last name.
 *                          // @param dni               official dni.
 * @param photoUrl          profile photo url.
 * @param email             registered email.
 * @param password          hashed password.
 * @param role              system role.
 * @param accountVerifiedAt account's email verification timestamp.
 * @param enabled           activate/deactivate account.
 * @param biography         the provider's biography.
 * @param occupation        the provider's occupation.
 * @param repeatPassword    the password confirmation.
 * @param auditable         timestamps.
 * @see Auditable
 */
public record User(
        UUID id,
        String name,
        String lastName,
        // String dni,
        String photoUrl,
        String email,
        String password,
        String repeatPassword,
        Role role,
        Instant accountVerifiedAt,
        Boolean enabled,
        String occupation,
        String biography,
        Auditable auditable
) {
    public boolean passwordsDoMatch() {
        return password.equals(repeatPassword);
    }

    public static User create(String name, String lastName, String photoUrl, String email, String password, String repeatPassword, Role role, String occupation, String biography) {
        if (role == null) {
            role = Role.CUSTOMER;
        }

        return new User(
                null,
                name.toUpperCase(),
                lastName.toUpperCase(),
                // dni.toUpperCase(),
                photoUrl,
                email.toLowerCase(),
                password,
                repeatPassword,
                role,
                null,
                true,
                role == Role.CUSTOMER ? null : occupation,
                role == Role.CUSTOMER ? null : biography,
                null
        );
    }

    public User copyWithHashedPassword(String hashedPassword) {
        return new User(id, name, lastName, photoUrl, email, hashedPassword, hashedPassword, role, accountVerifiedAt, enabled, occupation, biography, auditable);
    }

    public User verifiedCopy() {
        return new User(
                id,
                name,
                lastName,
                photoUrl,
                email,
                password,
                repeatPassword,
                role,
                Instant.now(),
                enabled,
                occupation,
                biography,
                auditable
        );
    }
}
