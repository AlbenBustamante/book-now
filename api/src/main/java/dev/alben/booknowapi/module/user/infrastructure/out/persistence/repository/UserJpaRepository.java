package dev.alben.booknowapi.module.user.infrastructure.out.persistence.repository;

import dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

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

    /**
     * Finds a user by an email.
     *
     * @param email email to search.
     * @return an {@link Optional} of the entity found.
     */
    Optional<UserEntity> findByEmail(String email);
}
