package dev.alben.booknowapi.module.user.util;

/**
 * User's roles.
 */
public enum Role {
    /**
     * Role for customers.
     */
    CUSTOMER('C'),
    /**
     * Role for providers.
     */
    PROVIDER('P');

    private final Character role;

    Role(final Character role) {
        this.role = role;
    }

    /**
     * @return initial character.
     */
    public final Character role() {
        return role;
    }
}
