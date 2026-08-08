package dev.alben.booknowapi.module.home.application.port.out;

import dev.alben.booknowapi.module.user.domain.User;

import java.util.List;

/**
 * Port to get the main providers.
 */
public interface LoadTopProvidersPort {
    /**
     * Get the main providers.
     *
     * @return the providers found.
     */
    List<User> loadTopProviders();
}
