package com.wms.controller;

import com.wms.dto.WarehouseDTO;
import com.wms.entity.Warehouse;
import com.wms.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/warehouses")
@RequiredArgsConstructor
public class WarehouseController {

    private final WarehouseService service;

    @GetMapping
    public List<Warehouse> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Warehouse create(@RequestBody WarehouseDTO dto) {
        return service.createWarehouse(dto);
    }

    @PutMapping("/{id}")
    public Warehouse update(@PathVariable UUID id, @RequestBody WarehouseDTO dto) {
        return service.updateWarehouse(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.deleteWarehouse(id);
    }
}