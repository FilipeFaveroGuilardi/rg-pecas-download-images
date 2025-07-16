package ffg.filipe.pdf_parse_json.services;

import ffg.filipe.pdf_parse_json.domain.Product;
import ffg.filipe.pdf_parse_json.helpers.MultipartHelper;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.text.PDFTextStripperByArea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.geom.Rectangle2D;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private MultipartHelper multipartHelper;

    public List<Product> ExtractProductsFromPdf(MultipartFile multipartFile, Double width, Double height) {
        File file = multipartHelper.parseFile(multipartFile);

        try (PDDocument document = PDDocument.load(file)) {
            List<Product> products = new ArrayList<>();

            PDFTextStripperByArea textStripper = new PDFTextStripperByArea();

            Rectangle2D area1 = new Rectangle2D.Double(40, 70, width, height);
            Rectangle2D area2 = new Rectangle2D.Double(40, 260, width, height);
            Rectangle2D area3 = new Rectangle2D.Double(40, 460, width, height);

            textStripper.addRegion("area1", area1);
            textStripper.addRegion("area2", area2);
            textStripper.addRegion("area3", area3);

            for (int i = 0; i < document.getNumberOfPages(); i++) {
                PDPage page = document.getPage(i);

                textStripper.extractRegions(page);

                String[] labels = new String[3];

                labels[0] = textStripper.getTextForRegion("area1");
                labels[1] = textStripper.getTextForRegion("area2");
                labels[2] = textStripper.getTextForRegion("area3");

                for (String label : labels) {
                    if (label.isBlank()) {
                        break;
                    }

                    String id = label.split(" ")[0];
                    String name = label.substring(id.length()+1).replace("\n", "").replace("/", "|");

                    Product newProduct = new Product(Long.parseLong(id), name, false);

                    products.add(newProduct);
                }
            }

            return products;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
