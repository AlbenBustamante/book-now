package dev.alben.booknowapi.module.address.infrastructure.in;

import dev.alben.booknowapi.core.auditable.AuditableDtoMapper;
import dev.alben.booknowapi.module.address.domain.Address;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public abstract class AddressDtoMapper extends AuditableDtoMapper {
    public abstract AddressDto toDto(Address domain);

    @AfterMapping
    protected void mapAuditFields(Address domain, @MappingTarget AddressDto dto) {
        mapAbstractAuditFields(domain.auditable(), dto);
    }
}
