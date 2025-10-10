package dev.alben.booknowapi.core.security;

import dev.alben.booknowapi.module.user.application.port.out.LoadUserByEmailPort;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final LoadUserByEmailPort loadUserByEmailPort;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final var user = loadUserByEmailPort.loadByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("The username was not found"));

        return new User(
                username,
                user.password(),
                user.enabled(),
                true,
                true,
                true,
                List.of(new SimpleGrantedAuthority(user.role().name()))
        );
    }
}
