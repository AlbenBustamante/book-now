package dev.alben.booknowapi.module.user.infrastructure.out.persistence.repository;

import dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity.EmailVerificationTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Database logic for Email Verification Tokens.
 */
public interface EmailVerificationTokenJpaRepository extends JpaRepository<EmailVerificationTokenEntity, Integer> {
}
