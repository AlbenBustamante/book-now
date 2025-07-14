package dev.alben.booknowapi.module.user.application.port.out;

import dev.alben.booknowapi.module.user.domain.EmailVerificationToken;

/**
 * Output Port for save an Email Verification Token.
 */
public interface SaveEmailVerificationTokenPort {
    /**
     * Persist a new email verification token.
     *
     * @param emailVerificationToken data to save.
     * @return data saved.
     */
    EmailVerificationToken save(EmailVerificationToken emailVerificationToken);
}
