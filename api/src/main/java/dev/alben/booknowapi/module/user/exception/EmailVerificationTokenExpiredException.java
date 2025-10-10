package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.BadRequestException;

public class EmailVerificationTokenExpiredException extends BadRequestException {
    public EmailVerificationTokenExpiredException() {
        super("The token is expired, please request a new token.");
    }
}
