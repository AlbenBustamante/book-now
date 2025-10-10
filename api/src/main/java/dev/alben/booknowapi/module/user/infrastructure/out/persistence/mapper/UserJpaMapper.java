package dev.alben.booknowapi.module.user.infrastructure.out.persistence.mapper;

import dev.alben.booknowapi.core.auditable.AuditableJpaMapper;
import dev.alben.booknowapi.module.user.domain.User;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity.UserEntity;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserJpaMapper extends AuditableJpaMapper {
    @Mapping(target = "auditable", expression = "java(toAbstractDomain(entity))")
    public abstract User toDomain(UserEntity entity);

    public abstract UserEntity toEntity(User domain);

    @AfterMapping
    protected void mapAuditEntity(User domain, @MappingTarget UserEntity entity) {
        mapAbstractAuditEntity(domain.auditable(), entity);
    }
}
