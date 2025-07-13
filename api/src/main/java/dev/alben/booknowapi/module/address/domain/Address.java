package dev.alben.booknowapi.module.address.domain;

import dev.alben.booknowapi.core.auditable.Auditable;

/**
 * Domain model for addresses.
 *
 * @param id        ID.
 * @param country   country's name.
 * @param state     state's name.
 * @param city      city's name.
 * @param direction complete address.
 * @param auditable timestamps.
 */
public record Address(
        Integer id,
        String country,
        String state,
        String city,
        String direction,
        Auditable auditable
) {
}
