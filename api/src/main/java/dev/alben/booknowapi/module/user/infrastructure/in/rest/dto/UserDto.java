package dev.alben.booknowapi.module.user.infrastructure.in.rest.dto;

import dev.alben.booknowapi.core.auditable.AuditableDto;
import dev.alben.booknowapi.module.user.util.Role;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.Instant;

@Getter
@RequiredArgsConstructor
public class UserDto extends AuditableDto {
    private final Integer id;
    private final String name;
    private final String lastName;
    // private final String dni;
    private final String photoUrl;
    private final String email;
    private final Role role;
    private final Instant accountVerifiedAt;
    private final Boolean enabled;
}
