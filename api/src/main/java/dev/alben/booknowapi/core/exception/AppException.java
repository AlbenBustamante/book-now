package dev.alben.booknowapi.core.exception;

import org.springframework.http.HttpStatus;

/**
 * Abstract exception for entire application.
 */
public abstract class AppException extends RuntimeException {
    private final HttpStatus status;

    public AppException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public final HttpStatus status() {
        return status;
    }
}
