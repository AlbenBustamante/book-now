package dev.alben.booknowapi.module.user.application.port.out;

/**
 * Output Port to check if a user already exists by a DNI.
 */
public interface CheckDniPort {
    /**
     * Checks whether a user exists by a DNI.
     *
     * @param dni DNI to check.
     * @return {@code true} if finds a record.
     */
    boolean check(String dni);
}
