package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.AppException;
import org.springframework.http.HttpStatus;

public class PasswordsDoNotMatchException extends AppException {
    public PasswordsDoNotMatchException() {
        super("The passwords do not match", HttpStatus.BAD_REQUEST);
    }
}
