package dev.alben.booknowapi.module.user.infrastructure.in.rest.dto;

import dev.alben.booknowapi.module.service.infrastructure.in.ServiceDto;

import java.util.List;

public record ProviderDto(
        UserDto user,
        float average,
        int completedServices,
        List<ServiceDto> services
) {
}
