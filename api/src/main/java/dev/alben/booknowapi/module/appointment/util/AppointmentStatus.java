package dev.alben.booknowapi.module.appointment.util;

/**
 * Status for appointments.
 */
public enum AppointmentStatus {
    /**
     * Pending.
     */
    PENDING("P"),
    /**
     * Confirmed.
     */
    CONFIRMED("CO"),
    /**
     * Finished.
     */
    FINISHED("F"),
    /**
     * Canceled.
     */
    CANCELED("CA");

    private final String status;

    AppointmentStatus(final String status) {
        this.status = status;
    }

    /**
     * @return Status' initials.
     */
    public final String status() {
        return status;
    }
}
