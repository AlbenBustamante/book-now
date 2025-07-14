package dev.alben.booknowapi.core.auditable;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public abstract class AuditableDto {
    private String createdBy, updatedBy;
    private Instant createdAt, updatedAt, deletedAt;
}
