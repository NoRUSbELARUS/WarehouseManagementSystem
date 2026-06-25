package com.wms.controller;

import com.wms.dto.StorageBinDTO;
import com.wms.entity.StorageBin;
import com.wms.repository.*;
import com.wms.service.WarehouseService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

@RestController
@RequestMapping("/bins")
@RequiredArgsConstructor
public class StorageBinController {
    private final WarehouseService warehouseService;
    private final StorageBinRepository binRepository;

    @GetMapping
    public Page<StorageBin> getAll(
            @RequestParam(required = false) String code,
            Pageable pageable) { 
        if (code != null) return binRepository.findByBinCodeContaining(code, pageable);
        return binRepository.findAll(pageable);
    }

    @PutMapping("/{id}")
    public StorageBin update(@PathVariable UUID id, @RequestBody StorageBinDTO dto) {
        return warehouseService.updateBin(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        binRepository.deleteById(id);
    }
}
