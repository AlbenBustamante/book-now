package dev.alben.booknowapi.module.auth.exception;

import dev.alben.booknowapi.core.exception.BadRequestException;

public class BadCredentialsException extends BadRequestException {
    public BadCredentialsException() {
        super("Something is wrong... please check your email or password");
    }
}
