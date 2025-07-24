package dev.alben.booknowapi.module.service.infrastructure.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Database logic for services.
 */
public interface ServiceJpaRepository extends JpaRepository<ServiceEntity, Integer> {
}
