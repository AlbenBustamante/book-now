package dev.alben.booknowapi.module.service.application.port.in;

import dev.alben.booknowapi.module.service.domain.ServiceDetail;

import java.util.UUID;

/**
 * Use case to get a service by an ID.
 */
public interface GetServiceByIdUseCase {
    /**
     * Get a full detailed service by a given ID.
     *
     * @param id the ID.
     * @return the service found.
     */
    ServiceDetail getById(UUID id);
}
