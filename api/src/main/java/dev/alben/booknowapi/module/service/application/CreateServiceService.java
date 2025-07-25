package dev.alben.booknowapi.module.service.application;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.module.service.application.port.in.CreateServiceUseCase;
import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import dev.alben.booknowapi.module.service.application.port.out.SaveServicePort;
import dev.alben.booknowapi.module.service.domain.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateServiceService implements CreateServiceUseCase {
    private final SaveServicePort saveServicePort;

    @Override
    public Service create(CreateServiceCommand command) {
        final var service = Service.create(
                command.name(),
                command.description(),
                command.durationInMinutes(),
                command.price(),
                command.address(),
                null
        );

        return saveServicePort.save(service);
    }
}
