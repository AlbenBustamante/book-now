package dev.alben.booknowapi.module.user.application.port.in;

import dev.alben.booknowapi.module.user.domain.User;

import java.util.UUID;

public interface GetProviderByIdUseCase {
    User getProviderById(UUID id);
}
