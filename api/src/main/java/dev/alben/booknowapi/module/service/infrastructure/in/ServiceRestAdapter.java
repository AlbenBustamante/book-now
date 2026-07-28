package dev.alben.booknowapi.module.service.infrastructure.in;

import dev.alben.booknowapi.core.common.RestAdapter;
import dev.alben.booknowapi.module.service.application.port.in.CreateServiceUseCase;
import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import lombok.RequiredArgsConstructor;

@RestAdapter
@RequiredArgsConstructor
public class ServiceRestAdapter {
    private final ServiceDtoMapper mapper;
    private final CreateServiceUseCase createServiceUseCase;

    public ServiceDto create(CreateServiceCommand command) {
        return mapper.toDto(createServiceUseCase.create(command));
    }
}
