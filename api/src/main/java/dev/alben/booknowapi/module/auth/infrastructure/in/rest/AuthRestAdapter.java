package dev.alben.booknowapi.module.auth.infrastructure.in.rest;

import dev.alben.booknowapi.core.common.RestAdapter;
import dev.alben.booknowapi.module.auth.application.port.in.LogInUseCase;
import dev.alben.booknowapi.module.auth.application.port.in.command.LogInCommand;
import dev.alben.booknowapi.module.auth.application.port.out.response.LogInResponse;
import lombok.RequiredArgsConstructor;

@RestAdapter
@RequiredArgsConstructor
public class AuthRestAdapter {
    private final LogInUseCase logInUseCase;

    public LogInResponse logIn(LogInCommand command) {
        return logInUseCase.logIn(command);
    }
}
