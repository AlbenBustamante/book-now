package dev.alben.booknowapi.module.service.infrastructure.in.detail;

import dev.alben.booknowapi.module.service.domain.ServiceDetail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceDetailDtoMapper {
    ServiceDetailDto toDto(ServiceDetail domain);
}
