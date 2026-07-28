package dev.alben.booknowapi.module.user.infrastructure.in.rest.dto;

import dev.alben.booknowapi.core.auditable.AuditableDto;
import dev.alben.booknowapi.module.user.util.Role;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class UserDto extends AuditableDto {
    private final UUID id;
    private final String name, lastName, photoUrl, email;
    private final Role role;
    private final Instant accountVerifiedAt;
    private final Boolean enabled;
    // private final String dni;
}
