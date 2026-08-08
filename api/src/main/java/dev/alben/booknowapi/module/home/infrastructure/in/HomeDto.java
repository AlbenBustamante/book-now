package dev.alben.booknowapi.module.home.infrastructure.in;

import dev.alben.booknowapi.module.service.infrastructure.in.ServiceDto;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.dto.UserDto;

import java.util.List;

/**
 * Home DTO to get the main services and providers.
 *
 * @param services  the top services.
 * @param providers the top providers.
 */
public record HomeDto(List<ServiceDto> services, List<UserDto> providers) {
}
