package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.AlreadyExistsException;

public class EmailAlreadyVerifiedException extends AlreadyExistsException {
    public EmailAlreadyVerifiedException() {
        super("The email is already verified.");
    }
}
