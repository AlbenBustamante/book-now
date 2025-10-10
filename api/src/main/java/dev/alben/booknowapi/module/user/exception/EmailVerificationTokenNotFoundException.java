package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.NotFoundException;

public class EmailVerificationTokenNotFoundException extends NotFoundException {
    public EmailVerificationTokenNotFoundException() {
        super("Token not found");
    }
}
