package dev.alben.booknowapi.core.auditable;

import org.mapstruct.MappingTarget;

public abstract class AuditableJpaMapper {
    protected abstract Auditable toAbstractDomain(AuditableEntity entity);

    protected void mapAbstractAuditEntity(Auditable domain, @MappingTarget AuditableEntity entity) {
        if (domain.createdAt() != null) {
            entity.setCreatedAt(domain.createdAt());
        }

        if (domain.createdBy() != null) {
            entity.setCreatedBy(domain.createdBy());
        }

        if (domain.updatedAt() != null) {
            entity.setUpdatedAt(domain.updatedAt());
        }

        if (domain.updatedBy() != null) {
            entity.setUpdatedBy(domain.updatedBy());
        }

        if (domain.deletedAt() != null) {
            entity.setDeletedAt(domain.deletedAt());
        }
    }
}
