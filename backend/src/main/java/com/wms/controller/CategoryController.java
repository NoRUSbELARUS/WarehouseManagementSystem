package com.wms.controller;

import com.wms.entity.Category;
import com.wms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@CrossOrigin
public class CategoryController {
    private final CategoryService service;

    @GetMapping
    public List<Category> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Category create(@RequestBody Category category) {
        return service.save(category);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable UUID id, @RequestBody Category category) {
        category.setId(id);
        return service.save(category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
