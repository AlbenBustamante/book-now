package dev.alben.booknowapi.module.service.domain;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Domain model for details of a service.
 *
 * @param service the service.
 * @param avgRate the average rating.
 * @param reviews all the reviews.
 */
public record ServiceDetail(
        Service service,
        Float avgRate,
        List<Review> reviews
) {
    /**
     * Domain model for reviews of a service.
     *
     * @param userName the user full name.
     * @param rate     the rate given by the user.
     * @param comment  the comment posted by the user.
     */
    public record Review(String userName, Integer rate, String comment, ZonedDateTime createdAt) {
    }
}
