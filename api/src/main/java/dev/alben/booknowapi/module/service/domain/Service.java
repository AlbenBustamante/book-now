package dev.alben.booknowapi.module.service.domain;

import dev.alben.booknowapi.core.auditable.Auditable;
import dev.alben.booknowapi.module.address.domain.Address;
import dev.alben.booknowapi.module.user.domain.User;

import java.math.BigDecimal;

/**
 * Domain model for provider's services.
 *
 * @param id                ID.
 * @param provider          {@link User}.
 * @param address           {@link Address}.
 * @param name              specified name.
 * @param description       detailed description.
 * @param durationInMinutes duration in minutes.
 * @param price             price with decimal comma.
 * @param auditable         {@link Auditable}.
 */
public record Service(
        Integer id,
        User provider,
        Address address,
        String name,
        String description,
        Integer durationInMinutes,
        BigDecimal price,
        Auditable auditable
) {
}
