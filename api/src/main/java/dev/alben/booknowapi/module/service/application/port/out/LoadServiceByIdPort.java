package dev.alben.booknowapi.module.service.application.port.out;

import dev.alben.booknowapi.module.service.domain.Service;

import java.util.Optional;
import java.util.UUID;

/**
 * Port to get a service by an ID.
 */
public interface LoadServiceByIdPort {
    /**
     * Load a service by an ID.
     *
     * @param id the ID.
     * @return an optional service.
     */
    Optional<Service> loadServiceById(UUID id);
}
