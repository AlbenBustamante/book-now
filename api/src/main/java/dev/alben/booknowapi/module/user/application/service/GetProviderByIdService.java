package dev.alben.booknowapi.module.user.application.service;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.module.user.application.port.in.GetProviderByIdUseCase;
import dev.alben.booknowapi.module.user.application.port.out.LoadUserByIdPort;
import dev.alben.booknowapi.module.user.domain.User;
import dev.alben.booknowapi.module.user.exception.UserNotFoundByIdException;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@UseCase
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GetProviderByIdService implements GetProviderByIdUseCase {
    private final LoadUserByIdPort loadUserByIdPort;

    @Override
    public User getProviderById(UUID id) {
        return loadUserByIdPort.loadById(id).orElseThrow(() -> new UserNotFoundByIdException(id));
    }
}
