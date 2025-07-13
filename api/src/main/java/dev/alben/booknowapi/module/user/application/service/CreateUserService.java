package dev.alben.booknowapi.module.user.application.service;

import dev.alben.booknowapi.common.UseCase;
import dev.alben.booknowapi.module.user.application.port.in.CreateUserUseCase;
import dev.alben.booknowapi.module.user.application.port.in.command.CreateUserCommand;
import dev.alben.booknowapi.module.user.application.port.out.SaveUserPort;
import dev.alben.booknowapi.module.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateUserService implements CreateUserUseCase {
    private final SaveUserPort saveUserPort;

    @Override
    public User create(CreateUserCommand command) {
        final var user = User.create(command.name(), command.lastName(), command.dni(), "", command.email(), command.password(), command.role());
        return saveUserPort.save(user);
    }
}
