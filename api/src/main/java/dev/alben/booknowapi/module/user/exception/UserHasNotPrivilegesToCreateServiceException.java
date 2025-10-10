package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.ForbiddenException;

public class UserHasNotPrivilegesToCreateServiceException extends ForbiddenException {
    public UserHasNotPrivilegesToCreateServiceException() {
        super("User doesn't count with permissions to create a new service.");
    }
}
