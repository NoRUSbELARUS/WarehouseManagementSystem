package com.wms.controller;

import com.wms.entity.*;
import com.wms.service.WmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/catalog")
@RequiredArgsConstructor
public class CatalogController {
    private final WmsService wmsService;

    @GetMapping("/products")
    public List<Product> getProducts() { return wmsService.getAllProducts(); }

    @GetMapping("/categories")
    public List<Category> getCategories() { return wmsService.getAllCategories(); }

    @GetMapping("/suppliers")
    public List<Supplier> getSuppliers() { return wmsService.getAllSuppliers(); }
}