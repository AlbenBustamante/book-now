package dev.alben.booknowapi.module.service.infrastructure.in;

import dev.alben.booknowapi.core.common.RestAdapter;
import dev.alben.booknowapi.module.service.application.port.in.CreateServiceUseCase;
import dev.alben.booknowapi.module.service.application.port.in.GetProviderServicesUseCase;
import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestAdapter
@RequiredArgsConstructor
public class ServiceRestAdapter {
    private final ServiceDtoMapper mapper;
    private final CreateServiceUseCase createServiceUseCase;
    private final GetProviderServicesUseCase getProviderServicesUseCase;

    public ServiceDto create(CreateServiceCommand command, MultipartFile coverPhoto) throws IOException {
        return mapper.toDto(createServiceUseCase.create(command, coverPhoto));
    }

    public Page<ServiceDto> getProviderServices(Pageable pageable) {
        final var results = getProviderServicesUseCase.getProviderServices(pageable);
        return results.map(mapper::toDto);
    }
}
