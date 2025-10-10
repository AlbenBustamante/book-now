package dev.alben.booknowapi.module.service.application.port.in;

import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import dev.alben.booknowapi.module.service.domain.Service;

/**
 * Use Case to create a new service.
 */
public interface CreateServiceUseCase {
    /**
     * Creates and persists a new service.
     *
     * @param command data to save.
     * @return service saved.
     */
    Service create(CreateServiceCommand command);
}
