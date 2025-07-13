package dev.alben.booknowapi.module.user.application.port.out;

/**
 * Output Port to check if a user already exists by an email.
 */
public interface CheckEmailPort {
    /**
     * Checks whether a user exists by an email.
     *
     * @param email email to check.
     * @return {@code true} if finds a record.
     */
    boolean check(String email);
}
