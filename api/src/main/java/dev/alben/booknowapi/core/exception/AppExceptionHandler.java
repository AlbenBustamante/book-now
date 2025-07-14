package dev.alben.booknowapi.core.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        final var error = buildErrorResponse(ex.getAllErrors().get(0).getDefaultMessage(), request, HttpStatus.valueOf(status.value()));
        log.error("ARGUMENT NOT VALID EXCEPTION: {} - PATH: {}", error.message(), error.path());

        return ResponseEntity.status(status.value()).body(error);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleApp(AppException ex, WebRequest webRequest) {
        final var error = buildErrorResponse(ex.getMessage(), webRequest, ex.status());
        log.error("APP EXCEPTION: {} - PATH: {}", error.message(), error.path());

        return ResponseEntity.status(error.statusCode()).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex, WebRequest webRequest) {
        final var error = buildErrorResponse(ex.getMessage(), webRequest, HttpStatus.INTERNAL_SERVER_ERROR);
        log.error("UNEXPECTED EXCEPTION: {} - PATH: {}", error.message(), error.path(), ex);

        return ResponseEntity.internalServerError().body(error);
    }

    private ErrorResponse buildErrorResponse(String message, WebRequest webRequest, HttpStatus status) {
        return new ErrorResponse(message, webRequest.getDescription(false), status.name(), status.value(), timestamp());
    }

    private String timestamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
    }
}
