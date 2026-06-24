package com.wms.controller;

import com.wms.entity.Product;
import com.wms.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {
    private final ProductService service;

    @GetMapping
    public List<Product> getAll() { return service.findAll(); }

    @PostMapping
    public Product create(@RequestBody Product p) { return service.save(p); }

    @PutMapping("/{id}")
    public Product update(@PathVariable UUID id, @RequestBody Product p) {
        p.setId(id);
        return service.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) { service.delete(id); }
}
