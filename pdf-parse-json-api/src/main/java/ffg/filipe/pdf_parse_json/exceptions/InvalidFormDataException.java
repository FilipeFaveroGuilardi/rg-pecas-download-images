package ffg.filipe.pdf_parse_json.exceptions;

import lombok.Getter;

@Getter
public class InvalidFormDataException extends RuntimeException {
    private String message;
    public InvalidFormDataException(String message) {
        super(message);
        this.message = message;
    }
}
