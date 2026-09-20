package dev.alben.booknowapi.module.user.infrastructure.in;

import dev.alben.booknowapi.module.user.infrastructure.in.rest.dto.ProviderDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping(path = "/users")
@RestController
public class UserRestApi {
    private final UserRestAdapter userRestAdapter;

    @GetMapping(path = "/provider/{id}")
    public ResponseEntity<ProviderDto> getProviderById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(userRestAdapter.getProviderById(id));
    }
}
