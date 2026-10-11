package com.example.studentmanagement.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

// Catches exceptions from ALL controllers and returns clean JSON
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 404: student id does not exist
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse body = new ErrorResponse(404, "Not Found", ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    // 404: URL does not exist (for example http://localhost:8080/)
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResource(NoResourceFoundException ex) {
        ErrorResponse body = new ErrorResponse(404, "Not Found", "URL not found", null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    // 409: duplicate email
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(DuplicateResourceException ex) {
        ErrorResponse body = new ErrorResponse(409, "Conflict", ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    // 400: @Valid failed on the request body
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(e -> fieldErrors.put(e.getField(), e.getDefaultMessage()));
        ErrorResponse body = new ErrorResponse(400, "Bad Request", "Validation failed", fieldErrors);
        return ResponseEntity.badRequest().body(body);
    }

    // 400: malformed JSON or a bad date format
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleBadJson(HttpMessageNotReadableException ex) {
        ErrorResponse body = new ErrorResponse(400, "Bad Request",
                "Malformed JSON or invalid value (dates must be yyyy-MM-dd)", null);
        return ResponseEntity.badRequest().body(body);
    }

    // 400: wrong type in the URL, for example /api/students/abc
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        ErrorResponse body = new ErrorResponse(400, "Bad Request",
                "Invalid value for '" + ex.getName() + "'", null);
        return ResponseEntity.badRequest().body(body);
    }

    // 500: anything unexpected. The real error is printed in the terminal.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleOther(Exception ex) {
        log.error("Unhandled exception", ex);
        ErrorResponse body = new ErrorResponse(500, "Internal Server Error",
                "Something went wrong on the server", null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}