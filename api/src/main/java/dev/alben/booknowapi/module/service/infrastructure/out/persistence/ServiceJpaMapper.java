package dev.alben.booknowapi.module.service.infrastructure.out.persistence;

import dev.alben.booknowapi.core.auditable.AuditableJpaMapper;
import dev.alben.booknowapi.module.address.infrastructure.out.persistence.AddressJpaMapper;
import dev.alben.booknowapi.module.service.domain.Service;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.mapper.UserJpaMapper;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

/**
 * Abstract mapper for services: Domain <-> Entity.
 */
@Mapper(componentModel = "spring", uses = {UserJpaMapper.class, AddressJpaMapper.class}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ServiceJpaMapper extends AuditableJpaMapper {
    @Mapping(target = "auditable", expression = "java(toAbstractDomain(entity))")
    public abstract Service toDomain(ServiceEntity entity);

    public abstract ServiceEntity toEntity(Service domain);

    @AfterMapping
    protected void mapAuditEntity(Service domain, @MappingTarget ServiceEntity entity) {
        mapAbstractAuditEntity(domain.auditable(), entity);
    }
}
