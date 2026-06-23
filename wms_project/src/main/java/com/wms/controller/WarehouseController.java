package com.wms.controller;

import com.wms.entity.*;
import com.wms.service.WmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/warehouses")
@RequiredArgsConstructor
public class WarehouseController {
    private final WmsService wmsService;

    @GetMapping
    public List<Warehouse> getWarehouses() { return wmsService.getAllWarehouses(); }

    @GetMapping("/{id}/bins")
    public List<StorageBin> getBins(@PathVariable UUID id) { 
        return wmsService.getBinsByWarehouse(id); 
    }
}