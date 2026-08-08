package dev.alben.booknowapi.module.service.infrastructure.out;

import dev.alben.booknowapi.core.common.PersistenceAdapter;
import dev.alben.booknowapi.module.home.application.port.out.LoadTopServicesPort;
import dev.alben.booknowapi.module.service.application.port.out.LoadServiceByIdPort;
import dev.alben.booknowapi.module.service.application.port.out.LoadServicesByProviderIdPort;
import dev.alben.booknowapi.module.service.application.port.out.SaveServicePort;
import dev.alben.booknowapi.module.service.domain.Service;
import dev.alben.booknowapi.module.service.infrastructure.out.persistence.ServiceJpaMapper;
import dev.alben.booknowapi.module.service.infrastructure.out.persistence.ServiceJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Persistence Adapter for services.
 *
 * @see Service
 * @see SaveServicePort
 */
@PersistenceAdapter
@RequiredArgsConstructor
public class ServicePersistenceAdapter implements
        SaveServicePort,
        LoadServicesByProviderIdPort,
        LoadTopServicesPort,
        LoadServiceByIdPort {
    private final ServiceJpaRepository repository;
    private final ServiceJpaMapper mapper;

    @Override
    public Service save(Service service) {
        var entity = mapper.toEntity(service);
        entity = repository.save(entity);

        return mapper.toDomain(entity);
    }

    @Override
    public Page<Service> loadServicesByProviderId(UUID providerId, Pageable pageable) {
        final var results = repository.findAllByProviderId(providerId, pageable);
        return results.map(mapper::toDomain);
    }

    @Override
    public List<Service> loadTopServices() {
        final var services = repository.findTop10By();
        return services.stream().map(mapper::toDomain).toList();
    }

    @Override
    public Optional<Service> loadServiceById(UUID id) {
        final var service = repository.findById(id);
        return service.map(mapper::toDomain);
    }
}
