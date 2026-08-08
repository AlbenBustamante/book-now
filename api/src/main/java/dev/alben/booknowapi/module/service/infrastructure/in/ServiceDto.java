package dev.alben.booknowapi.module.service.infrastructure.in;

import dev.alben.booknowapi.core.auditable.AuditableDto;
import dev.alben.booknowapi.module.address.infrastructure.in.AddressDto;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.dto.UserDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class ServiceDto extends AuditableDto {
    private final UUID id;
    private final UserDto provider;
    private final AddressDto address;
    private final String name, description, photoUrl;
    private final Integer durationInMinutes;
    private final BigDecimal price;
}
