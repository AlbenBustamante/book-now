package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.NotFoundException;

public class UserNotFoundByIdException extends NotFoundException {
    public UserNotFoundByIdException(Integer id) {
        super("User with ID #" + id + " not found");
    }
}
