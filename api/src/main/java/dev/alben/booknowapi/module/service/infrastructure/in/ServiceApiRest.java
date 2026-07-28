package dev.alben.booknowapi.module.service.infrastructure.in;

import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(path = "/services")
@RestController
public class ServiceApiRest {
    private final ServiceRestAdapter adapter;

    @PostMapping
    public ResponseEntity<ServiceDto> create(@Valid @RequestBody CreateServiceCommand command) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adapter.create(command));
    }
}
