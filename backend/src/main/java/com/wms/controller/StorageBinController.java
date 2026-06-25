package com.wms.controller;

import com.wms.dto.StorageBinDTO;
import com.wms.entity.InventoryBalance;
import com.wms.entity.StorageBin;
import com.wms.service.WarehouseService;
import com.wms.repository.InventoryBalanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/bins")
@RequiredArgsConstructor
public class StorageBinController {
    private final WarehouseService warehouseService;
    private final InventoryBalanceRepository inventoryRepository;

    @GetMapping
    public List<StorageBin> getAll() {
        return warehouseService.findAllBins(); 
    }

    @GetMapping("/{id}/contents")
    public List<InventoryBalance> getBinContents(@PathVariable UUID id) {
        return inventoryRepository.findByStorageBinId(id);
    }

    @PostMapping
    public StorageBin create(@RequestBody StorageBinDTO dto) {
        return warehouseService.saveBin(dto);
    }
}
