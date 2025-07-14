package dev.alben.booknowapi.core.email;

import dev.alben.booknowapi.core.exception.AppException;
import org.springframework.http.HttpStatus;

public class EmailSenderException extends AppException {
    public EmailSenderException(String message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
