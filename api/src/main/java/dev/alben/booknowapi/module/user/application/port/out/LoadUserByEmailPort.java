package dev.alben.booknowapi.module.user.application.port.out;

import dev.alben.booknowapi.module.user.domain.User;

import java.util.Optional;

/**
 * Output Port to get a user by an email.
 */
public interface LoadUserByEmailPort {
    /**
     * Gets a user by an email.
     *
     * @param email email to search.
     * @return an {@link Optional} of the data found.
     */
    Optional<User> loadByEmail(String email);
}
