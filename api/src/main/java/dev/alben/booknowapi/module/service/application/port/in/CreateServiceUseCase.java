package dev.alben.booknowapi.module.service.application.port.in;

import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import dev.alben.booknowapi.module.service.domain.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Use Case to create a new service.
 */
public interface CreateServiceUseCase {
    /**
     * Creates and persists a new service.
     *
     * @param command    data to save.
     * @param coverPhoto the cover photo file.
     * @return service saved.
     */
    Service create(CreateServiceCommand command, MultipartFile coverPhoto) throws IOException;
}
