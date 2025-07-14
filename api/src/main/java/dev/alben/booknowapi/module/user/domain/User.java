package dev.alben.booknowapi.module.user.domain;

import dev.alben.booknowapi.core.auditable.Auditable;
import dev.alben.booknowapi.module.user.util.Role;

import java.time.Instant;

/**
 * Domain model for users.
 *
 * @param id                ID.
 * @param name              first name.
 * @param lastName          last name.
 * @param dni               official dni.
 * @param photoUrl          profile photo url.
 * @param email             registered email.
 * @param password          hashed password.
 * @param role              system role.
 * @param accountVerifiedAt account's email verification timestamp.
 * @param enabled           activate/deactivate account.
 * @param auditable         timestamps.
 * @see Auditable
 */
public record User(
        Integer id,
        String name,
        String lastName,
        String dni,
        String photoUrl,
        String email,
        String password,
        String repeatPassword,
        Role role,
        Instant accountVerifiedAt,
        Boolean enabled,
        Auditable auditable
) {
    public boolean passwordsDoMatch() {
        return password.equals(repeatPassword);
    }

    public static User create(String name, String lastName, String dni, String photoUrl, String email, String password, String repeatPassword, Role role) {
        if (role == null) {
            role = Role.CUSTOMER;
        }

        return new User(null, name, lastName, dni, photoUrl, email, password, repeatPassword, role, null, true, null);
    }

    public User copyWithHashedPassword(String hashedPassword) {
        return new User(id, name, lastName, dni, photoUrl, email, hashedPassword, hashedPassword, role, accountVerifiedAt, enabled, auditable);
    }
}
