package dev.alben.booknowapi.module.user.infrastructure.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Database Logic for Users.
 */
public interface UserJpaRepository extends JpaRepository<UserEntity, Integer> {
    /**
     * Verifies whether a user exists by an email.
     *
     * @param email email to check.
     * @return {@code true} if already exists a user.
     */
    boolean existsByEmail(String email);

    /**
     * Verifies whether a user exists by a dni.
     *
     * @param dni dni to check.
     * @return {@code true} if already exists a user.
     */
    boolean existsByDni(String dni);
}
