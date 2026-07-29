package dev.alben.booknowapi.module.service.application;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.core.security.UserPrincipal;
import dev.alben.booknowapi.core.storage.usecase.UploadFileUseCase;
import dev.alben.booknowapi.module.address.domain.Address;
import dev.alben.booknowapi.module.service.application.port.in.CreateServiceUseCase;
import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import dev.alben.booknowapi.module.service.application.port.out.SaveServicePort;
import dev.alben.booknowapi.module.service.domain.Service;
import dev.alben.booknowapi.module.user.application.port.out.LoadUserByIdPort;
import dev.alben.booknowapi.module.user.exception.UserHasNotPrivilegesToCreateServiceException;
import dev.alben.booknowapi.module.user.exception.UserNotFoundByIdException;
import dev.alben.booknowapi.module.user.util.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static dev.alben.booknowapi.module.service.util.ServiceConstants.FOLDER_NAME;

@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateServiceService implements CreateServiceUseCase {
    private final SaveServicePort saveServicePort;
    private final LoadUserByIdPort loadUserByIdPort;
    private final UploadFileUseCase uploadFileUseCase;

    @Override
    public Service create(CreateServiceCommand command, MultipartFile coverPhoto) throws IOException {
        final var auth = SecurityContextHolder.getContext().getAuthentication();
        final var userPrincipal = (UserPrincipal) auth.getPrincipal();

        final var user = loadUserByIdPort.loadById(userPrincipal.userId())
                .orElseThrow(() -> new UserNotFoundByIdException(userPrincipal.userId()));

        if (user.role() != Role.PROVIDER) {
            throw new UserHasNotPrivilegesToCreateServiceException();
        }

        final var photoUrl = uploadFileUseCase.uploadFile(FOLDER_NAME, coverPhoto);

        final var address = Address.create(
                command.address().country(),
                command.address().state(),
                command.address().city(),
                command.address().street(),
                command.address().zipCode()
        );

        final var service = Service.create(
                command.name(),
                command.description(),
                command.durationInMinutes(),
                command.price(),
                photoUrl,
                address,
                user
        );

        return saveServicePort.save(service);
    }
}
