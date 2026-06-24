package com.wms.controller;

import com.wms.entity.Supplier;
import com.wms.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/suppliers")
@RequiredArgsConstructor
@CrossOrigin
public class SupplierController {
    private final SupplierService service;

    @GetMapping
    public List<Supplier> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Supplier create(@RequestBody Supplier supplier) {
        return service.save(supplier);
    }

    @PutMapping("/{id}")
    public Supplier update(@PathVariable UUID id, @RequestBody Supplier supplier) {
        supplier.setId(id);
        return service.save(supplier);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
