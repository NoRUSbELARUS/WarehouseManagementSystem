package com.wms.controller;

import com.wms.dto.ProductDTO;
import com.wms.entity.Product;
import com.wms.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public List<Product> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Product create(@RequestBody ProductDTO dto) {
        Product product = new Product();
        product.setSku(dto.sku());
        product.setName(dto.name());
        product.setUnitPrice(dto.unitPrice());
        // Сервис должен уметь находить Category и Supplier по их UUID
        return service.saveFromDto(product, dto.categoryId(), dto.supplierId());
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable UUID id, @RequestBody ProductDTO dto) {
        Product product = new Product();
        product.setId(id);
        product.setSku(dto.sku());
        product.setName(dto.name());
        product.setUnitPrice(dto.unitPrice());
        return service.saveFromDto(product, dto.categoryId(), dto.supplierId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
