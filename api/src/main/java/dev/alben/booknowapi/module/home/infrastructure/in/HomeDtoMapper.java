package dev.alben.booknowapi.module.home.infrastructure.in;

import dev.alben.booknowapi.module.home.domain.Home;
import dev.alben.booknowapi.module.service.infrastructure.in.ServiceDtoMapper;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.mapper.UserDtoMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ServiceDtoMapper.class, UserDtoMapper.class})
public abstract class HomeDtoMapper {
    public abstract HomeDto toDto(Home domain);
}
