package ffg.filipe.pdf_parse_json.helpers;

import ffg.filipe.pdf_parse_json.exceptions.InvalidFormDataException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Objects;

@Component
public class MultipartHelper {
    public File parseFile(MultipartFile file) {
        try {
            if (!Objects.equals(FilenameUtils.getExtension(file.getOriginalFilename()), "pdf")) {
                throw new InvalidFormDataException("Multipart file must be a pdf");
            }

            File newFile = new File(System.getProperty("java.io.tmpdir")+"/"+file.getName());
            file.transferTo(newFile);
            return newFile;
        } catch (IOException e) {
            throw new InvalidFormDataException("Invalid multipart file");
        }
    }
}
