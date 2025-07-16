package ffg.filipe.pdf_parse_json.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Product {
    private Long id;
    private String Name;
    private Boolean isCompleted;
}
