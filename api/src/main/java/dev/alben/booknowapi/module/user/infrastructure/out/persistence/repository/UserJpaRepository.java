package dev.alben.booknowapi.module.user.infrastructure.out.persistence.repository;

import dev.alben.booknowapi.module.user.infrastructure.out.persistence.entity.UserEntity;
import dev.alben.booknowapi.module.user.util.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Database Logic for Users.
 */
public interface UserJpaRepository extends JpaRepository<UserEntity, UUID> {
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
    // boolean existsByDni(String dni);

    /**
     * Finds a user by an email.
     *
     * @param email email to search.
     * @return an {@link Optional} of the entity found.
     */
    Optional<UserEntity> findByEmail(String email);

    /**
     * Get the first 10 users by a specified role.
     *
     * @param role the role to use as the filter.
     * @return a list with the users found.
     */
    List<UserEntity> findTop10ByRole(Role role);
}
