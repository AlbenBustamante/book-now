package dev.alben.booknowapi.core.exception;

/**
 * Response model for errors.
 *
 * @param message    detailed message.
 * @param path       uri path where the error occurs.
 * @param statusName specified name for status response.
 * @param statusCode status code.
 * @param timestamp  formatted timestamp.
 */
public record ErrorResponse(
        String message,
        String path,
        String statusName,
        int statusCode,
        String timestamp
) {
}
