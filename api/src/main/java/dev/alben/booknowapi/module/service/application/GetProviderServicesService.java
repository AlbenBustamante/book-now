package dev.alben.booknowapi.module.service.application;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.core.security.UserPrincipal;
import dev.alben.booknowapi.module.service.application.port.in.GetProviderServicesUseCase;
import dev.alben.booknowapi.module.service.application.port.out.LoadServicesByProviderIdPort;
import dev.alben.booknowapi.module.service.domain.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetProviderServicesService implements GetProviderServicesUseCase {
    private final LoadServicesByProviderIdPort loadServicesByProviderIdPort;

    @Override
    public Page<Service> getProviderServices(Pageable pageable) {
        final var auth = SecurityContextHolder.getContext().getAuthentication();
        final var principal = (UserPrincipal) auth.getPrincipal();

        return loadServicesByProviderIdPort.loadServicesByProviderId(principal.userId(), pageable);
    }
}
