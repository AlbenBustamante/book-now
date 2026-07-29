package dev.alben.booknowapi.module.address.application.port.in.command;

import jakarta.validation.constraints.NotBlank;

/**
 * Command to create a new address.
 *
 * @param country the country.
 * @param state   the state.
 * @param city    the city.
 * @param street  the street (full detailed address).
 * @param zipCode the zip code (optional).
 */
public record CreateAddressCommand(
        @NotBlank(message = "The country is required")
        String country,
        @NotBlank(message = "The state is required")
        String state,
        @NotBlank(message = "The city is required")
        String city,
        @NotBlank(message = "The street is required")
        String street,
        String zipCode
) {
}
