package dev.alben.booknowapi.core.auditable;

public abstract class AuditableDtoMapper {
    protected void mapAbstractAuditFields(Auditable domain, AuditableDto dto) {
        dto.setCreatedAt(domain.createdAt());
        dto.setCreatedBy(domain.createdBy());
        dto.setUpdatedAt(domain.updatedAt());
        dto.setUpdatedBy(domain.updatedBy());
        dto.setDeletedAt(domain.deletedAt());
    }
}
