package dev.alben.booknowapi.core.exception;

import org.springframework.http.HttpStatus;

public abstract class BadRequestException extends AppException {
    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
