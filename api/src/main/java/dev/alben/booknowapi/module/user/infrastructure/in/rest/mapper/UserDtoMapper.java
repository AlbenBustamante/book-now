package dev.alben.booknowapi.module.user.infrastructure.in.rest.mapper;

import dev.alben.booknowapi.core.auditable.AuditableDtoMapper;
import dev.alben.booknowapi.module.user.domain.User;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.dto.UserDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserDtoMapper extends AuditableDtoMapper {
    public abstract UserDto toDto(User domain);

    @AfterMapping
    protected void mapAuditFields(User domain, @MappingTarget UserDto dto) {
        mapAbstractAuditFields(domain.auditable(), dto);
    }
}
