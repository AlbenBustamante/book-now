package dev.alben.booknowapi.module.user.infrastructure.in;

import dev.alben.booknowapi.core.common.RestAdapter;
import dev.alben.booknowapi.module.user.application.port.in.CreateUserUseCase;
import dev.alben.booknowapi.module.user.application.port.in.GetProviderByIdUseCase;
import dev.alben.booknowapi.module.user.application.port.in.VerifyEmailUseCase;
import dev.alben.booknowapi.module.user.application.port.in.command.CreateUserCommand;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.dto.ProviderDto;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.dto.UserDto;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.mapper.UserDtoMapper;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RestAdapter
@RequiredArgsConstructor
public class UserRestAdapter {
    private final UserDtoMapper mapper;
    private final CreateUserUseCase createUserUseCase;
    private final VerifyEmailUseCase verifyEmailUseCase;
    private final GetProviderByIdUseCase getProviderByIdUseCase;

    public UserDto create(CreateUserCommand command) {
        return mapper.toDto(createUserUseCase.create(command));
    }

    public String verify(String token) {
        return verifyEmailUseCase.verify(token);
    }

    public ProviderDto getProviderById(UUID id) {
        return mapper.toDto(getProviderByIdUseCase.getProviderById(id));
    }
}
