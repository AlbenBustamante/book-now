package dev.alben.booknowapi.module.address.infrastructure.in;

import dev.alben.booknowapi.core.auditable.AuditableDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class AddressDto extends AuditableDto {
    private final UUID id;
    private final String country, state, city, street, zipCode;
}
