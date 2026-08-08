package dev.alben.booknowapi.module.home.application.port.out;

import dev.alben.booknowapi.module.service.domain.Service;

import java.util.List;

/**
 * Port to get the main services.
 */
public interface LoadTopServicesPort {
    /**
     * Get the main services.
     *
     * @return the services found.
     */
    List<Service> loadTopServices();
}
