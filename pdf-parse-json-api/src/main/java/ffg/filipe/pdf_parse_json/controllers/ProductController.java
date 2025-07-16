package ffg.filipe.pdf_parse_json.controllers;

import ffg.filipe.pdf_parse_json.domain.Product;
import ffg.filipe.pdf_parse_json.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/extract")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping()
    public ResponseEntity<List<Product>> extract(
                @RequestPart(name = "pdf") MultipartFile multipartFile,
                @RequestParam(required = false, name = "width", defaultValue = "-1") Double width,
                @RequestParam(required = false, name = "height", defaultValue = "-1") Double height
            ) {



        return  ResponseEntity
                .status(200)
                .body(productService.ExtractProductsFromPdf(multipartFile, width == -1 ? 500 : width, height == -1 ? 50 : height));
    }
}
