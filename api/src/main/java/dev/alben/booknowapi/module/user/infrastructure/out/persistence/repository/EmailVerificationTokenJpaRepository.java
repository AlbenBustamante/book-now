package dev.alben.booknowapi.module.user.infrastructure.out.persistence.repository;

import dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity.EmailVerificationTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Database logic for Email Verification Tokens.
 */
public interface EmailVerificationTokenJpaRepository extends JpaRepository<EmailVerificationTokenEntity, Integer> {
    /**
     * Finds an email verification token by a given token.
     *
     * @param token to search.
     * @return an {@link Optional} with data found.
     */
    Optional<EmailVerificationTokenEntity> findByToken(String token);
}
