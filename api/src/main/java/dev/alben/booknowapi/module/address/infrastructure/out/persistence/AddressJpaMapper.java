package dev.alben.booknowapi.module.address.infrastructure.out.persistence;

import dev.alben.booknowapi.core.auditable.AuditableJpaMapper;
import dev.alben.booknowapi.module.address.domain.Address;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

/**
 * Abstract Mapper for Addresses: Domain <-> Entity.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class AddressJpaMapper extends AuditableJpaMapper {
    @Mapping(target = "auditable", expression = "java(toAbstractDomain(entity))")
    public abstract Address toDomain(AddressEntity entity);

    public abstract AddressEntity toEntity(Address domain);

    @AfterMapping
    protected void mapAuditEntity(Address domain, @MappingTarget AddressEntity entity) {
        mapAbstractAuditEntity(domain.auditable(), entity);
    }
}
