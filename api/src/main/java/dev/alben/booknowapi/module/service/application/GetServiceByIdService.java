package dev.alben.booknowapi.module.service.application;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.module.service.application.port.in.GetServiceByIdUseCase;
import dev.alben.booknowapi.module.service.application.port.out.LoadServiceByIdPort;
import dev.alben.booknowapi.module.service.domain.ServiceDetail;
import dev.alben.booknowapi.module.service.exception.ServiceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@UseCase
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetServiceByIdService implements GetServiceByIdUseCase {
    private final LoadServiceByIdPort loadServiceByIdPort;

    @Override
    public ServiceDetail getById(UUID id) {
        final var service = loadServiceByIdPort.loadServiceById(id)
                .orElseThrow(() -> new ServiceNotFoundException(id));

        return new ServiceDetail(service, 4.53f, List.of(
                new ServiceDetail.Review("Maria Juanes", 5, "Wow, awesome", ZonedDateTime.now()),
                new ServiceDetail.Review("Pepe Delgado", 4, "Recommended", ZonedDateTime.now()),
                new ServiceDetail.Review("Elizabeth Prado", 5, "Nice service.", ZonedDateTime.now())
        ));
    }
}
