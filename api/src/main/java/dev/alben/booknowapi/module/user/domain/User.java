package dev.alben.booknowapi.module.user.domain;

import dev.alben.booknowapi.core.auditable.Auditable;
import dev.alben.booknowapi.module.user.util.Role;

import java.time.LocalDateTime;

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
 * @param auditable         timestamps.
 * @param enabled           activate/deactivate account.
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
        Role role,
        LocalDateTime accountVerifiedAt,
        Boolean enabled,
        Auditable auditable
) {
}
