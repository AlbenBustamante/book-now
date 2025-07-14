package dev.alben.booknowapi.module.user.application.service;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.module.user.application.port.in.CreateUserUseCase;
import dev.alben.booknowapi.module.user.application.port.in.command.CreateUserCommand;
import dev.alben.booknowapi.module.user.application.port.out.CheckDniPort;
import dev.alben.booknowapi.module.user.application.port.out.CheckEmailPort;
import dev.alben.booknowapi.module.user.application.port.out.SaveUserPort;
import dev.alben.booknowapi.module.user.domain.User;
import dev.alben.booknowapi.module.user.exception.PasswordsDoNotMatchException;
import dev.alben.booknowapi.module.user.exception.UserAlreadyExistsByDniException;
import dev.alben.booknowapi.module.user.exception.UserAlreadyExistsByEmailException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateUserService implements CreateUserUseCase {
    private final SaveUserPort saveUserPort;
    private final CheckDniPort checkDniPort;
    private final CheckEmailPort checkEmailPort;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User create(CreateUserCommand command) {
        if (checkDniPort.checkDni(command.dni())) {
            throw new UserAlreadyExistsByDniException(command.dni());
        }

        if (checkEmailPort.checkEmail(command.email())) {
            throw new UserAlreadyExistsByEmailException(command.email());
        }

        var user = User.create(command.name(), command.lastName(), command.dni(), "", command.email(), command.password(), command.repeatPassword(), command.role());

        if (!user.passwordsDoMatch()) {
            throw new PasswordsDoNotMatchException();
        }

        final var hashedPassword = passwordEncoder.encode(command.password());
        user = user.copyWithHashedPassword(hashedPassword);

        return saveUserPort.save(user);
    }
}
