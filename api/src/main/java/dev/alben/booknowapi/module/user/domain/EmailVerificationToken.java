package dev.alben.booknowapi.module.user.domain;

import dev.alben.booknowapi.core.auditable.Auditable;

import java.security.SecureRandom;
import java.time.ZonedDateTime;

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
        ZonedDateTime expiresAt,
        String token,
        Boolean verified,
        Auditable auditable
) {
    public static EmailVerificationToken create(User user, long expiresAtInMinutes) {
        return new EmailVerificationToken(
                null,
                user,
                ZonedDateTime.now().plusMinutes(expiresAtInMinutes),
                generateToken(),
                false,
                null
        );
    }

    private static String generateToken() {
        final var secureRandom = new SecureRandom();
        final var bytes = new byte[70];
        secureRandom.nextBytes(bytes);

        return bytesToHex(bytes);
    }

    private static String bytesToHex(byte[] bytes) {
        final var sb = new StringBuilder();

        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }

        return sb.toString();
    }
}
