package dev.alben.booknowapi.module.user.domain;

import dev.alben.booknowapi.core.auditable.Auditable;

import java.time.LocalDateTime;

/**
 * Domain model for email verification tokens.
 *
 * @param id        ID.
 * @param user      {@link User}.
 * @param expiresAt expiration time.
 * @param token     hashed token to verify.
 * @param verified  used/unused token.
 * @param auditable {@link Auditable}.
 */
public record EmailVerificationToken(
        Integer id,
        User user,
        LocalDateTime expiresAt,
        String token,
        Boolean verified,
        Auditable auditable
) {
}
