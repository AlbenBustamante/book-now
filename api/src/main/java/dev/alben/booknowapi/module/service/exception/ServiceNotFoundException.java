package dev.alben.booknowapi.module.service.exception;

import dev.alben.booknowapi.core.exception.NotFoundException;

import java.util.UUID;

public class ServiceNotFoundException extends NotFoundException {
    public ServiceNotFoundException(UUID id) {
        super("Service not found with the following ID: " + id);
    }
}
