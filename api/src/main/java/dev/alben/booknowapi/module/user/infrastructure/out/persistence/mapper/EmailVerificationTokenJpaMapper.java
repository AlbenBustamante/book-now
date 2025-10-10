package dev.alben.booknowapi.module.user.infrastructure.out.persistence.mapper;

import dev.alben.booknowapi.core.auditable.AuditableJpaMapper;
import dev.alben.booknowapi.module.user.domain.EmailVerificationToken;
import dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity.EmailVerificationTokenEntity;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = UserJpaMapper.class, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class EmailVerificationTokenJpaMapper extends AuditableJpaMapper {
    @Mapping(target = "auditable", expression = "java(toAbstractDomain(entity))")
    public abstract EmailVerificationToken toDomain(EmailVerificationTokenEntity entity);

    public abstract EmailVerificationTokenEntity toEntity(EmailVerificationToken domain);

    @AfterMapping
    protected void mapAuditEntity(EmailVerificationToken domain, @MappingTarget EmailVerificationTokenEntity entity) {
        mapAbstractAuditEntity(domain.auditable(), entity);
    }
}
