package dev.alben.booknowapi.core.auditable;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * Mutable DTO model for auditing.
 */
@Setter
@Getter
public abstract class AuditableDto {
    /**
     * created by.
     */
    private UUID createdBy;

    /**
     * updated by.
     */
    private UUID updatedBy;

    /**
     * creation date.
     */
    private Instant createdAt;

    /**
     * last modification date.
     */
    private Instant updatedAt;

    /**
     * soft deletion date.
     */
    private Instant deletedAt;
}
