package dev.alben.booknowapi.module.user.exception;

import dev.alben.booknowapi.core.exception.AlreadyExistsException;

public class AccountAlreadyVerifiedException extends AlreadyExistsException {
    public AccountAlreadyVerifiedException() {
        super("The account is already verified.");
    }
}
