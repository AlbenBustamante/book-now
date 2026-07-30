package dev.alben.booknowapi.module.service.infrastructure.in;

import dev.alben.booknowapi.module.service.application.port.in.command.CreateServiceCommand;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping(path = "/services")
@RestController
public class ServiceRestApi {
    private final ServiceRestAdapter adapter;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceDto> create(
            @Valid @RequestPart("service") CreateServiceCommand command,
            @NotNull @RequestPart("coverPhoto") MultipartFile coverPhoto
    ) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(adapter.create(command, coverPhoto));
    }

    @GetMapping
    public ResponseEntity<Page<ServiceDto>> getByAuthenticatedProvider(
            @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize
    ) {
        return ResponseEntity.ok(adapter.getProviderServices(PageRequest.of(pageNumber, pageSize)));
    }
}
