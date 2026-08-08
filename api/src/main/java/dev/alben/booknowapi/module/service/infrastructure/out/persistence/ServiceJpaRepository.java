package dev.alben.booknowapi.module.service.infrastructure.out.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

/**
 * Database logic for services.
 */
public interface ServiceJpaRepository extends JpaRepository<ServiceEntity, UUID> {
    /**
     * Get all services created by a provider.
     *
     * @param providerId the provider ID.
     * @param pageable   the data to paginate the searching.
     * @return a pagination with the services found.
     */
    Page<ServiceEntity> findAllByProviderId(UUID providerId, Pageable pageable);

    /**
     * Get the first 10 services.
     *
     * @return a list with the services found.
     */
    List<ServiceEntity> findTop10By();
}
