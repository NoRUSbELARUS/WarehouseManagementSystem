package com.wms.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.wms.dto.InventoryBalanceDTO;
import com.wms.entity.InventoryBalance;
import com.wms.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping
    public InventoryBalance add(@RequestBody InventoryBalanceDTO dto) {
        return inventoryService.addInventory(dto);
    }

    @PutMapping("/{id}")
    public InventoryBalance update(@PathVariable UUID id, @RequestParam Integer quantity) {
        return inventoryService.updateQuantity(id, quantity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        inventoryService.delete(id);
    }

    @GetMapping("/product/{productId}")
    public Page<InventoryBalance> getByProduct(@PathVariable UUID productId, Pageable pageable) {
        return inventoryService.getByProduct(productId, pageable);
    }
}
