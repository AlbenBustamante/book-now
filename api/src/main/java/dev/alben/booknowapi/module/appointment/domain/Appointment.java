package dev.alben.booknowapi.module.appointment.domain;

import dev.alben.booknowapi.core.auditable.Auditable;
import dev.alben.booknowapi.module.appointment.util.AppointmentStatus;
import dev.alben.booknowapi.module.availability.domain.Availability;
import dev.alben.booknowapi.module.user.domain.User;

/**
 * Domain model for appointments.
 *
 * @param id           ID.
 * @param customer     {@link User}.
 * @param availability {@link Availability}.
 * @param status       current {@link AppointmentStatus}.
 * @param auditable    {@link Auditable}.
 */
public record Appointment(
        Integer id,
        User customer,
        Availability availability,
        AppointmentStatus status,
        Auditable auditable
) {
}
