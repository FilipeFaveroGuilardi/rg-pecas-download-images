package ffg.filipe.pdf_parse_json.exceptions.exceptionHandler;

import ffg.filipe.pdf_parse_json.exceptions.ErrorPayload.ErrorPayload;
import ffg.filipe.pdf_parse_json.exceptions.InvalidFormDataException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidFormDataException.class)
    public ResponseEntity<ErrorPayload> handleInvalidFormDataException(InvalidFormDataException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ErrorPayload(HttpStatus.BAD_REQUEST, exception.getMessage(), LocalDateTime.now())
        );
    }

}
