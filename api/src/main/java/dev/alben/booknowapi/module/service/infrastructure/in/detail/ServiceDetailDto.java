package dev.alben.booknowapi.module.service.infrastructure.in.detail;

import dev.alben.booknowapi.module.service.infrastructure.in.ServiceDto;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * DTO model for details of a service.
 *
 * @param service the service.
 * @param avgRate the average rating.
 * @param reviews the reviews.
 */
public record ServiceDetailDto(
        ServiceDto service,
        Float avgRate,
        List<ReviewDto> reviews
) {
    /**
     * DTO model for reviews from users.
     *
     * @param userName the user full name.
     * @param rate     the rate given by the user.
     * @param comment  the user's comment.
     */
    record ReviewDto(String userName, Integer rate, String comment, ZonedDateTime createdAt) {
    }
}
