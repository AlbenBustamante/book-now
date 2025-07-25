package dev.alben.booknowapi.module.auth.application;

import dev.alben.booknowapi.core.common.UseCase;
import dev.alben.booknowapi.core.security.JwtProvider;
import dev.alben.booknowapi.module.auth.application.port.in.LogInUseCase;
import dev.alben.booknowapi.module.auth.application.port.in.command.LogInCommand;
import dev.alben.booknowapi.module.auth.application.port.out.response.LogInResponse;
import dev.alben.booknowapi.module.auth.exception.BadCredentialsException;
import dev.alben.booknowapi.module.user.application.port.out.LoadUserByEmailPort;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class LogInService implements LogInUseCase {
    private final LoadUserByEmailPort loadUserByEmailPort;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Override
    public LogInResponse logIn(LogInCommand command) {
        final var user = loadUserByEmailPort.loadByEmail(command.email())
                .orElseThrow(BadCredentialsException::new);

        if (!passwordEncoder.matches(command.password(), user.password())) {
            throw new BadCredentialsException();
        }

        final var authToken = new UsernamePasswordAuthenticationToken(user, command.password());
        authenticationManager.authenticate(authToken);

        final var jwt = jwtProvider.generateToken(user);
        return new LogInResponse(jwt);
    }
}
