package dev.alben.booknowapi.module.home.domain;

import dev.alben.booknowapi.module.service.domain.Service;
import dev.alben.booknowapi.module.user.domain.User;

import java.util.List;

/**
 * Domain model that saves the home services and providers.
 *
 * @param services  the services.
 * @param providers the providers.
 */
public record Home(
        List<Service> services,
        List<User> providers
) {
}
