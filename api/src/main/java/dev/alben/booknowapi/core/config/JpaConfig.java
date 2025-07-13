package dev.alben.booknowapi.core.config;

import dev.alben.booknowapi.module.user.domain.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
@EnableJpaAuditing
public class JpaConfig {
    @Bean
    public AuditorAware<Integer> auditorAware() {
        final var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return () -> Optional.ofNullable(((User) principal).id());
    }
}
