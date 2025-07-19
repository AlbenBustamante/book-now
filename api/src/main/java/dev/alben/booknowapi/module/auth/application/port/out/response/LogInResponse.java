package dev.alben.booknowapi.module.auth.application.port.out.response;

/**
 * Response model for users logged recently.
 *
 * @param jwt access token.
 */
public record LogInResponse(
        String jwt
) {
}
