package dev.alben.booknowapi.core.auditable;

import java.time.Instant;

/**
 * Domain model to audit timestamps.
 *
 * @param createdBy created by.
 * @param createdAt creation date.
 * @param updatedBy updated by.
 * @param updatedAt last modification date.
 * @param deletedAt soft deletion date.
 */
public record Auditable(
        String createdBy,
        Instant createdAt,
        String updatedBy,
        Instant updatedAt,
        Instant deletedAt
) {
}
