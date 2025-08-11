package dev.alben.booknowapi.module.user.application.service;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.core.email.usecase.SendHtmlEmailUseCase;
import dev.alben.booknowapi.module.user.application.port.in.CreateUserUseCase;
import dev.alben.booknowapi.module.user.application.port.in.command.CreateUserCommand;
import dev.alben.booknowapi.module.user.application.port.out.CheckEmailPort;
import dev.alben.booknowapi.module.user.application.port.out.SaveEmailVerificationTokenPort;
import dev.alben.booknowapi.module.user.application.port.out.SaveUserPort;
import dev.alben.booknowapi.module.user.domain.EmailVerificationToken;
import dev.alben.booknowapi.module.user.domain.User;
import dev.alben.booknowapi.module.user.exception.PasswordsDoNotMatchException;
import dev.alben.booknowapi.module.user.exception.UserAlreadyExistsByEmailException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateUserService implements CreateUserUseCase {
    private final SaveUserPort saveUserPort;
    private final CheckEmailPort checkEmailPort;
    private final SaveEmailVerificationTokenPort saveEmailVerificationTokenPort;
    private final PasswordEncoder passwordEncoder;
    private final SendHtmlEmailUseCase sendHtmlEmailUseCase;

    @Value("${verification.expiration-time}")
    private Integer verificationExpirationTime;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Override
    public User create(CreateUserCommand command) {
        if (checkEmailPort.checkEmail(command.email())) {
            throw new UserAlreadyExistsByEmailException(command.email());
        }

        var user = User.create(command.name(), command.lastName(), "", command.email(), command.password(), command.repeatPassword(), command.role());

        if (!user.passwordsDoMatch()) {
            throw new PasswordsDoNotMatchException();
        }

        final var hashedPassword = passwordEncoder.encode(command.password());
        user = user.copyWithHashedPassword(hashedPassword);
        user = saveUserPort.save(user);

        var emailVerificationToken = EmailVerificationToken.create(user, verificationExpirationTime);
        emailVerificationToken = saveEmailVerificationTokenPort.save(emailVerificationToken);
        final var token = emailVerificationToken.token();
        final var url = "http://localhost:8080" + contextPath + "/auth/verify-email?token=" + token;
        sendHtmlEmailUseCase.sendHtmlEmail(user.email(), "Email Verification", "Thanks for registering", "<p>Please, verify your email clicking the following link:</p><p>" + url + "</p>");

        return user;
    }
}
