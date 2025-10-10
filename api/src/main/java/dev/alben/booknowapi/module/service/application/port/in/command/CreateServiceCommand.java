package dev.alben.booknowapi.module.service.application.port.in.command;

import dev.alben.booknowapi.module.address.domain.Address;

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
        String name,
        String description,
        Integer durationInMinutes,
        BigDecimal price,
        Address address
) {
}
