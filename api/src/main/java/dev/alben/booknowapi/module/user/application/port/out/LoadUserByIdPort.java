package dev.alben.booknowapi.module.user.application.port.out;

import dev.alben.booknowapi.module.user.domain.User;

import java.util.Optional;

/**
 * Output Port to load a user by an {@code ID}.
 */
public interface LoadUserByIdPort {
    /**
     * Fetch a user by a given {@code ID}.
     *
     * @param userId {@code ID} to search.
     * @return an {@link Optional} of the data found.
     */
    Optional<User> loadById(Integer userId);
}
