package com.wms.service;

import com.wms.entity.StorageBin;
import com.wms.entity.Warehouse;
import com.wms.repository.StorageBinRepository;
import com.wms.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;
    private final StorageBinRepository binRepository;

    public List<Warehouse> findAll() {
        return warehouseRepository.findAll();
    }

    public Warehouse save(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public void delete(UUID id) {
        warehouseRepository.deleteById(id);
    }

    public List<StorageBin> findBinsByWarehouse(UUID warehouseId) {
        return binRepository.findByWarehouse_Id(warehouseId);
    }

    public StorageBin saveBin(UUID warehouseId, StorageBin bin) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Склад не найден"));
        bin.setWarehouse(warehouse);
        return binRepository.save(bin);
    }

    public StorageBin updateBin(UUID warehouseId, UUID binId, StorageBin bin) {
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Склад не найден"));
        bin.setId(binId);
        bin.setWarehouse(warehouse);
        return binRepository.save(bin);
    }

    public void deleteBin(UUID binId) {
        binRepository.deleteById(binId);
    }
}
