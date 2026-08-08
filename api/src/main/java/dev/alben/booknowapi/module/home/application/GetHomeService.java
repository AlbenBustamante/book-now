package dev.alben.booknowapi.module.home.application;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.module.home.application.port.in.GetHomeUseCase;
import dev.alben.booknowapi.module.home.application.port.out.LoadTopProvidersPort;
import dev.alben.booknowapi.module.home.application.port.out.LoadTopServicesPort;
import dev.alben.booknowapi.module.home.domain.Home;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetHomeService implements GetHomeUseCase {
    private final LoadTopProvidersPort loadTopProvidersPort;
    private final LoadTopServicesPort loadTopServicesPort;

    @Override
    public Home getHome() {
        final var providers = loadTopProvidersPort.loadTopProviders();
        final var services = loadTopServicesPort.loadTopServices();

        return new Home(services, providers);
    }
}
