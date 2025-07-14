package dev.alben.booknowapi.core.auditable;

import java.time.Instant;

/**
 * Domain model to audit timestamps.
 *
 * @param createdBy created by ID.
 * @param createdAt creation date.
 * @param updatedBy updated by ID.
 * @param updatedAt last modification date.
 * @param deletedAt soft deletion date.
 */
public record Auditable(
        Integer createdBy,
        Instant createdAt,
        Integer updatedBy,
        Instant updatedAt,
        Instant deletedAt
) {
}
