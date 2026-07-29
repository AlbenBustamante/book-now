package dev.alben.booknowapi.module.service.infrastructure.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/**
 * Database logic for services.
 */
public interface ServiceJpaRepository extends JpaRepository<ServiceEntity, UUID> {
}
