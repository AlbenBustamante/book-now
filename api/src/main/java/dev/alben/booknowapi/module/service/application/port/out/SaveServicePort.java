package dev.alben.booknowapi.module.service.application.port.out;

import dev.alben.booknowapi.module.service.domain.Service;

/**
 * Output Port to save a service.
 */
public interface SaveServicePort {
    /**
     * Persist a new service to database.
     *
     * @param service data to save.
     * @return data saved from database.
     */
    Service save(Service service);
}
