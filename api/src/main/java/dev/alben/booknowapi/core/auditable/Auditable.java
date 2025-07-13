package dev.alben.booknowapi.core.auditable;

import java.time.LocalDateTime;

/**
 * Domain model to audit timestamps.
 *
 * @param createdAt creation date.
 * @param updatedAt last modification date.
 * @param deletedAt soft deletion date.
 */
public record Auditable(
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime deletedAt
) {
}
