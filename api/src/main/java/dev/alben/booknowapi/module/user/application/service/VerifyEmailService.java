package dev.alben.booknowapi.module.user.application.service;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.module.user.application.port.in.VerifyEmailUseCase;
import dev.alben.booknowapi.module.user.application.port.out.LoadTokenPort;
import dev.alben.booknowapi.module.user.application.port.out.SaveEmailVerificationTokenPort;
import dev.alben.booknowapi.module.user.exception.AccountAlreadyVerifiedException;
import dev.alben.booknowapi.module.user.exception.EmailAlreadyVerifiedException;
import dev.alben.booknowapi.module.user.exception.EmailVerificationTokenExpiredException;
import dev.alben.booknowapi.module.user.exception.EmailVerificationTokenNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;

@UseCase
@Transactional
@RequiredArgsConstructor
public class VerifyEmailService implements VerifyEmailUseCase {
    private final LoadTokenPort loadTokenPort;
    private final SaveEmailVerificationTokenPort saveEmailVerificationTokenPort;

    @Override
    public String verify(String token) {
        var emailVerificationToken = loadTokenPort.load(token)
                .orElseThrow(EmailVerificationTokenNotFoundException::new);

        if (emailVerificationToken.verified()) {
            throw new EmailAlreadyVerifiedException();
        }

        if (ZonedDateTime.now().isAfter(emailVerificationToken.expiresAt())) {
            throw new EmailVerificationTokenExpiredException();
        }

        final var user = emailVerificationToken.user();

        if (user.accountVerifiedAt() != null) {
            throw new AccountAlreadyVerifiedException();
        }

        saveEmailVerificationTokenPort.save(emailVerificationToken.verifiedCopy());

        return "<h1 style='font-weight: 600; color: #555; text-align: center;'>Account verified successfully</h1>";
    }
}
