package dev.alben.booknowapi.module.user.application.port.in;

/**
 * Use Case for verify an email by a given token.
 */
public interface VerifyEmailUseCase {
    /**
     * Verify an email by a given token.
     *
     * @param token token to verify.
     * @return a confirmation message like a html template.
     */
    String verify(String token);
}
