package com.wms.controller;

import com.wms.entity.StorageBin;
import com.wms.entity.Warehouse;
import com.wms.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/warehouses")
@RequiredArgsConstructor
@CrossOrigin
public class WarehouseController {
    private final WarehouseService service;

    @GetMapping
    public List<Warehouse> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Warehouse create(@RequestBody Warehouse warehouse) {
        return service.save(warehouse);
    }

    @PutMapping("/{id}")
    public Warehouse update(@PathVariable UUID id, @RequestBody Warehouse warehouse) {
        warehouse.setId(id);
        return service.save(warehouse);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }

    @GetMapping("/{id}/bins")
    public List<StorageBin> getBins(@PathVariable UUID id) {
        return service.findBinsByWarehouse(id);
    }

    @PostMapping("/{id}/bins")
    public StorageBin createBin(@PathVariable UUID id, @RequestBody StorageBin bin) {
        return service.saveBin(id, bin);
    }

    @PutMapping("/{warehouseId}/bins/{binId}")
    public StorageBin updateBin(
            @PathVariable UUID warehouseId,
            @PathVariable UUID binId,
            @RequestBody StorageBin bin) {
        return service.updateBin(warehouseId, binId, bin);
    }

    @DeleteMapping("/{warehouseId}/bins/{binId}")
    public void deleteBin(@PathVariable UUID binId) {
        service.deleteBin(binId);
    }
}
