package dev.alben.booknowapi.module.user.exception;

public class PasswordsDoNotMatchException extends RuntimeException {
    public PasswordsDoNotMatchException() {
        super("The passwords do not match");
    }
}
