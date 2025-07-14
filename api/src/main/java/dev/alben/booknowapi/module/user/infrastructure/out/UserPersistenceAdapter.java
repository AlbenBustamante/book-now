package dev.alben.booknowapi.module.user.infrastructure.out;

import dev.alben.booknowapi.core.common.PersistenceAdapter;
import dev.alben.booknowapi.module.user.application.port.out.CheckDniPort;
import dev.alben.booknowapi.module.user.application.port.out.CheckEmailPort;
import dev.alben.booknowapi.module.user.application.port.out.LoadUserByEmailPort;
import dev.alben.booknowapi.module.user.application.port.out.SaveUserPort;
import dev.alben.booknowapi.module.user.domain.User;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.UserJpaMapper;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.UserJpaRepository;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@PersistenceAdapter
@RequiredArgsConstructor
public class UserPersistenceAdapter implements CheckDniPort, CheckEmailPort, SaveUserPort, LoadUserByEmailPort {
    private final UserJpaRepository repository;
    private final UserJpaMapper mapper;

    @Override
    public boolean checkEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public boolean checkDni(String dni) {
        return repository.existsByDni(dni);
    }

    @Override
    public User save(User user) {
        final var entity = mapper.toEntity(user);
        final var newUser = repository.save(entity);

        return mapper.toDomain(newUser);
    }

    @Override
    public Optional<User> loadByEmail(String email) {
        final var user = repository.findByEmail(email);
        return user.map(mapper::toDomain);
    }
}
