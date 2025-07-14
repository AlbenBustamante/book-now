package dev.alben.booknowapi.core.auditable;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class AuditableJpaMapper {
    protected abstract Auditable toAuditDomain(AuditableEntity entity);

    protected abstract AuditableEntity toAuditEntity(Auditable domain);
}
