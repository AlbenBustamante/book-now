package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.NotFoundException;

import java.util.UUID;

public class UserNotFoundByIdException extends NotFoundException {
    public UserNotFoundByIdException(UUID id) {
        super("User with ID #" + id + " not found");
    }
}
