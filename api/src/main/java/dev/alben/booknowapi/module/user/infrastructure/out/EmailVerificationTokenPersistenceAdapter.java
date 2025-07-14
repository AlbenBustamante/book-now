package dev.alben.booknowapi.module.user.infrastructure.out;

import dev.alben.booknowapi.core.common.PersistenceAdapter;
import dev.alben.booknowapi.module.user.application.port.out.SaveEmailVerificationTokenPort;
import dev.alben.booknowapi.module.user.domain.EmailVerificationToken;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.mapper.EmailVerificationTokenJpaMapper;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.repository.EmailVerificationTokenJpaRepository;
import lombok.RequiredArgsConstructor;

@PersistenceAdapter
@RequiredArgsConstructor
public class EmailVerificationTokenPersistenceAdapter implements SaveEmailVerificationTokenPort {
    private final EmailVerificationTokenJpaRepository repository;
    private final EmailVerificationTokenJpaMapper mapper;

    @Override
    public EmailVerificationToken save(EmailVerificationToken emailVerificationToken) {
        final var entity = mapper.toEntity(emailVerificationToken);
        final var newToken = repository.save(entity);

        return mapper.toDomain(newToken);
    }
}
