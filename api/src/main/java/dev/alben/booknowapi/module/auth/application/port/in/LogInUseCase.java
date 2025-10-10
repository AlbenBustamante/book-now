package dev.alben.booknowapi.module.auth.application.port.in;

import dev.alben.booknowapi.module.auth.application.port.in.command.LogInCommand;
import dev.alben.booknowapi.module.auth.application.port.out.response.LogInResponse;

/**
 * Use case for log in.
 */
public interface LogInUseCase {
    /**
     * Log In to user's account.
     *
     * @param command {@link LogInCommand} data.
     * @return a {@link LogInResponse}
     */
    LogInResponse logIn(LogInCommand command);
}
