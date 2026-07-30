package dev.alben.booknowapi.module.service.application.port.out;

import dev.alben.booknowapi.module.service.domain.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * Port to get all services created by a provider.
 */
public interface LoadServicesByProviderIdPort {
    /**
     * Get all services created by a provider.
     *
     * @param providerId the provider ID.
     * @param pageable   the data to paginate the searching.
     * @return a pagination with the services found.
     */
    Page<Service> loadServicesByProviderId(UUID providerId, Pageable pageable);
}
