package dev.alben.booknowapi.module.address.domain;

import dev.alben.booknowapi.core.auditable.Auditable;

import java.util.UUID;

/**
 * Domain model for addresses.
 *
 * @param id        ID.
 * @param country   country's name.
 * @param state     state's name.
 * @param city      city's name.
 * @param street    full street address.
 * @param zipCode   zip code (optional).
 * @param auditable timestamps.
 */
public record Address(
        UUID id,
        String country,
        String state,
        String city,
        String street,
        String zipCode,
        Auditable auditable
) {
    public static Address create(String country, String state, String city, String street, String zipCode) {
        return new Address(null, country, state, city, street, zipCode, null);
    }
}
