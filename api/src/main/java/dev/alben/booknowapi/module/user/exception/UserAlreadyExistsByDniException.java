package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.AlreadyExistsException;

public class UserAlreadyExistsByDniException extends AlreadyExistsException {
    public UserAlreadyExistsByDniException(String dni) {
        super("The dni " + dni + " is already in use.");
    }
}
