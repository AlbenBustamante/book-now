package dev.alben.booknowapi.module.user.application.port.out;

import dev.alben.booknowapi.module.user.domain.EmailVerificationToken;

import java.util.Optional;

/**
 * Output Port for loading an email verification token by a given token.
 */
public interface LoadTokenPort {
    /**
     * Loads an email verification token by a given token.
     *
     * @param token the token to search.
     * @return an {@link Optional} of result found.
     */
    Optional<EmailVerificationToken> load(String token);
}
