package dev.alben.booknowapi.module.user.application.port.in;

import dev.alben.booknowapi.module.user.application.port.in.command.CreateUserCommand;
import dev.alben.booknowapi.module.user.domain.User;

/**
 * Use case for users creation.
 */
public interface CreateUserUseCase {
    /**
     * Persist a new user through a command.
     *
     * @param command {@link CreateUserCommand} data.
     * @return {@link User} data.
     */
    User create(CreateUserCommand command);
}
