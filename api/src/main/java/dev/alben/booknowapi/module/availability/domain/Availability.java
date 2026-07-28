package dev.alben.booknowapi.module.availability.domain;

import dev.alben.booknowapi.core.auditable.Auditable;
import dev.alben.booknowapi.module.service.domain.Service;

import java.time.ZonedDateTime;
import java.util.UUID;

/**
 * Domain model for service's availability.
 *
 * @param id        ID.
 * @param service   {@link Service}.
 * @param startTime start timestamp.
 * @param endTime   end timestamp.
 * @param auditable {@link Auditable}.
 */
public record Availability(
        UUID id,
        Service service,
        ZonedDateTime startTime,
        ZonedDateTime endTime,
        Auditable auditable
) {
}
