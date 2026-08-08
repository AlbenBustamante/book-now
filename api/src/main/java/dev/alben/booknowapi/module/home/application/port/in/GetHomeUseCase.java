package dev.alben.booknowapi.module.home.application.port.in;

import dev.alben.booknowapi.module.home.domain.Home;

/**
 * Use case to get the home data.
 */
public interface GetHomeUseCase {
    /**
     * Get the home data.
     *
     * @return the home data.
     */
    Home getHome();
}
