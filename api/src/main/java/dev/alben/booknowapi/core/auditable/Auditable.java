package dev.alben.booknowapi.core.auditable;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain model to auditing.
 *
 * @param createdBy created by.
 * @param createdAt creation date.
 * @param updatedBy updated by.
 * @param updatedAt last modification date.
 * @param deletedAt soft deletion date.
 */
public record Auditable(
        UUID createdBy,
        Instant createdAt,
        UUID updatedBy,
        Instant updatedAt,
        Instant deletedAt
) {
}
