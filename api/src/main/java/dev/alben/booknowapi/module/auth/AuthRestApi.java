package dev.alben.booknowapi.module.auth;

import dev.alben.booknowapi.module.user.application.port.in.command.CreateUserCommand;
import dev.alben.booknowapi.module.user.infrastructure.in.UserRestAdapter;
import dev.alben.booknowapi.module.user.infrastructure.in.rest.dto.UserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(path = "/auth")
@RestController
public class AuthRestApi {
    private final UserRestAdapter userRestAdapter;

    @PostMapping(path = "/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody CreateUserCommand command) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userRestAdapter.create(command));
    }

    @GetMapping(path = "/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        return ResponseEntity.ok(userRestAdapter.verify(token));
    }
}
