package dev.alben.booknowapi.module.auth.exception;

import dev.alben.booknowapi.core.exception.BadRequestException;

public class BadCredentialsException extends BadRequestException {
    public BadCredentialsException() {
        super("The email or password are wrong");
    }
}
