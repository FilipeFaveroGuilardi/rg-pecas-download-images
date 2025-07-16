package ffg.filipe.pdf_parse_json.exceptions.ErrorPayload;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record ErrorPayload(HttpStatus status, String message, LocalDateTime timestamp) {
}
