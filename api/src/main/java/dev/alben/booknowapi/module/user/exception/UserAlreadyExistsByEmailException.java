package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.AlreadyExistsException;

public class UserAlreadyExistsByEmailException extends AlreadyExistsException {
    public UserAlreadyExistsByEmailException(String email) {
        super("The email " + email + " is already in use.");
    }
}
