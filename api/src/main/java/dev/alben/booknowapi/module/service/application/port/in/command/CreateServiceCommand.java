package dev.alben.booknowapi.module.service.application.port.in.command;

import dev.alben.booknowapi.module.address.domain.Address;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

/**
 * Command to create a new service.
 *
 * @param name              service's name.
 * @param description       detailed description.
 * @param durationInMinutes duration in minutes.
 * @param price             price.
 * @param address           full address.
 */
public record CreateServiceCommand(
        @NotBlank(message = "The name is required")
        String name,
        @NotBlank(message = "The description is required")
        String description,
        @NotNull(message = "The duration in minutes is required")
        @Min(value = 30, message = "The minim duration is 30 minutes")
        Integer durationInMinutes,
        @NotBlank(message = "The price is required")
        @Min(value = 0, message = "The minim price is 0")
        BigDecimal price,
        @NotNull(message = "The address is required")
        Address address
) {
}
