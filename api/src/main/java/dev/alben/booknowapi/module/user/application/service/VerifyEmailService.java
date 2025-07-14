package dev.alben.booknowapi.module.user.application.service;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.module.user.application.port.in.VerifyEmailUseCase;
import dev.alben.booknowapi.module.user.application.port.out.LoadTokenPort;
import dev.alben.booknowapi.module.user.application.port.out.SaveEmailVerificationTokenPort;
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
    public Boolean verify(String token) {
        var emailVerificationToken = loadTokenPort.load(token)
                .orElseThrow(EmailVerificationTokenNotFoundException::new);

        if (emailVerificationToken.verified()) {
            throw new RuntimeException("The token is already verified");
        }

        if (ZonedDateTime.now().isAfter(emailVerificationToken.expiresAt())) {
            throw new RuntimeException("The token is expired");
        }

        final var user = emailVerificationToken.user();

        if (user.accountVerifiedAt() != null) {
            throw new RuntimeException("The account is already verified");
        }

        saveEmailVerificationTokenPort.save(emailVerificationToken.verifiedCopy());

        return true;
    }
}
