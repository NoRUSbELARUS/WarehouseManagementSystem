package com.wms.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.wms.dto.InventoryBalanceDTO;
import com.wms.entity.InventoryBalance;
import com.wms.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

    @PutMapping
    public InventoryBalance update(
            @RequestParam UUID binId,
            @RequestParam UUID productId,
            @RequestParam Integer quantity) {
        return inventoryService.updateQuantity(binId, productId, quantity);
    }

    @DeleteMapping
    public void delete(
            @RequestParam UUID binId,
            @RequestParam UUID productId) {
        inventoryService.delete(binId, productId);
    }

    @GetMapping
    public List<InventoryBalance> getAll() {
        return inventoryService.findAll();
    }

    @GetMapping("/product/{productId}")
    public Page<InventoryBalance> getByProduct(@PathVariable UUID productId, Pageable pageable) {
        return inventoryService.getByProduct(productId, pageable);
    }

    @PostMapping
    public InventoryBalance create(@RequestBody InventoryBalanceDTO dto) {
        return inventoryService.createInventory(dto);
    }
}
