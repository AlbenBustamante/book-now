package dev.alben.booknowapi.module.service.application.port.in;

import dev.alben.booknowapi.module.service.domain.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Use case to get all authenticated provider's services.
 */
public interface GetProviderServicesUseCase {
    /**
     * Get all services created by the authenticated provider.
     *
     * @param pageable the data to paginate the searching.
     * @return a pagination with the services found.
     */
    Page<Service> getProviderServices(Pageable pageable);
}
