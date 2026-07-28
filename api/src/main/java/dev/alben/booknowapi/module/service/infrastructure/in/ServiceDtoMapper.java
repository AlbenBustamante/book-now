package dev.alben.booknowapi.module.service.infrastructure.in;

import dev.alben.booknowapi.core.auditable.AuditableDtoMapper;
import dev.alben.booknowapi.module.address.infrastructure.in.AddressDtoMapper;
import dev.alben.booknowapi.module.service.domain.Service;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.mapper.UserDtoMapper;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {AddressDtoMapper.class, UserDtoMapper.class})
public abstract class ServiceDtoMapper extends AuditableDtoMapper {
    public abstract ServiceDto toDto(Service domain);

    @AfterMapping
    protected void mapAuditFields(Service domain, @MappingTarget ServiceDto dto) {
        mapAbstractAuditFields(domain.auditable(), dto);
    }
}
