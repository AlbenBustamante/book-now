package dev.alben.booknowapi.core.config;

import dev.alben.booknowapi.core.security.UserPrincipal;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.UUID;

@Configuration
@EnableJpaAuditing
public class JpaConfig {
    @Bean
    public AuditorAware<UUID> auditorAware() {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional::empty;
        }

        if (authentication.getPrincipal() instanceof UserPrincipal principal) {
            return () -> Optional.of(principal.userId());
        }

        return Optional::empty;
    }
}
