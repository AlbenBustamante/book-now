package dev.alben.booknowapi.core.exception;

import org.springframework.http.HttpStatus;

public abstract class AlreadyExistsException extends AppException {
    public AlreadyExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
