package com.wms.controller;

import com.wms.dto.CategoryDTO;
import com.wms.entity.Category;
import com.wms.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @GetMapping
    public List<Category> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Category create(@RequestBody CategoryDTO dto) {
        Category category = new Category();
        category.setName(dto.name());
        return service.save(category);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable UUID id, @RequestBody CategoryDTO dto) {
        Category category = new Category();
        category.setId(id);
        category.setName(dto.name());
        return service.save(category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
