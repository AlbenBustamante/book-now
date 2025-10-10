package dev.alben.booknowapi.module.service.infrastructure.out;

import dev.alben.booknowapi.core.common.PersistenceAdapter;
import dev.alben.booknowapi.module.service.application.port.out.SaveServicePort;
import dev.alben.booknowapi.module.service.domain.Service;
import dev.alben.booknowapi.module.service.infrastructure.out.persistence.ServiceJpaMapper;
import dev.alben.booknowapi.module.service.infrastructure.out.persistence.ServiceJpaRepository;
import lombok.RequiredArgsConstructor;

/**
 * Persistence Adapter for services.
 *
 * @see Service
 * @see SaveServicePort
 */
@PersistenceAdapter
@RequiredArgsConstructor
public class ServicePersistenceAdapter implements SaveServicePort {
    private final ServiceJpaRepository repository;
    private final ServiceJpaMapper mapper;

    @Override
    public Service save(Service service) {
        var entity = mapper.toEntity(service);
        entity = repository.save(entity);

        return mapper.toDomain(entity);
    }
}
