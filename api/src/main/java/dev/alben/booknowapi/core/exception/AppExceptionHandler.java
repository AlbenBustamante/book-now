package dev.alben.booknowapi.core.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestControllerAdvice
public class AppExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleApp(AppException ex, WebRequest webRequest) {
        final var error = buildErrorResponse(ex, webRequest, ex.status());
        log.error("APP EXCEPTION: {} - PATH: {}", error.message(), error.path());

        return ResponseEntity.status(error.statusCode()).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex, WebRequest webRequest) {
        final var error = buildErrorResponse(ex, webRequest, HttpStatus.INTERNAL_SERVER_ERROR);
        log.error("UNEXPECTED EXCEPTION: {} - PATH: {}", error.message(), error.path(), ex);

        return ResponseEntity.internalServerError().body(error);
    }

    private ErrorResponse buildErrorResponse(Exception ex, WebRequest webRequest, HttpStatus status) {
        return new ErrorResponse(ex.getMessage(), webRequest.getDescription(false), status.name(), status.value(), timestamp());
    }

    private String timestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
    }
}
