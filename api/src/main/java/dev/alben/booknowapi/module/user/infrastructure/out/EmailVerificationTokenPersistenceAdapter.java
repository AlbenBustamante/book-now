package dev.alben.booknowapi.module.user.infrastructure.out;

import dev.alben.booknowapi.core.common.PersistenceAdapter;
import dev.alben.booknowapi.module.user.application.port.out.LoadTokenPort;
import dev.alben.booknowapi.module.user.application.port.out.SaveEmailVerificationTokenPort;
import dev.alben.booknowapi.module.user.domain.EmailVerificationToken;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.mapper.EmailVerificationTokenJpaMapper;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.repository.EmailVerificationTokenJpaRepository;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class EmailVerificationTokenPersistenceAdapter implements SaveEmailVerificationTokenPort, LoadTokenPort {
    private final EmailVerificationTokenJpaRepository repository;
    private final EmailVerificationTokenJpaMapper mapper;

    @Override
    public EmailVerificationToken save(EmailVerificationToken emailVerificationToken) {
        final var entity = mapper.toEntity(emailVerificationToken);
        final var newToken = repository.save(entity);

        return mapper.toDomain(newToken);
    }

    @Override
    public Optional<EmailVerificationToken> load(String token) {
        final var tokenFound = repository.findByToken(token);
        return tokenFound.map(mapper::toDomain);
    }
}
