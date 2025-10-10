package dev.alben.booknowapi.module.user.application.port.out;

import dev.alben.booknowapi.module.user.domain.User;

/**
 * Output Port to save a user.
 */
public interface SaveUserPort {
    /**
     * Persist/Update an user.
     *
     * @param user {@link User} data.
     * @return a {@link User}.
     */
    User save(User user);
}
