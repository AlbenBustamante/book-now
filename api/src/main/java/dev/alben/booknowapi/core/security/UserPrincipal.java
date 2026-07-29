package dev.alben.booknowapi.core.security;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

/**
 * Domain model for authenticated user and ID.
 *
 * @param user   details about authenticated user.
 * @param userId authenticated user {@code ID}.
 */
public record UserPrincipal(UserDetails user, UUID userId) {
}
