package com.wms.service;

import com.wms.dto.StorageBinDTO;
import com.wms.dto.WarehouseDTO;
import com.wms.entity.StorageBin;
import com.wms.entity.Warehouse;
import com.wms.repository.StorageBinRepository;
import com.wms.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final StorageBinRepository storageBinRepository;

    public List<Warehouse> findAll() {
        return warehouseRepository.findAll();
    }

    public Warehouse findById(UUID id) {
        return warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Склад не найден с ID: " + id));
    }

    @Transactional
    public Warehouse createWarehouse(WarehouseDTO dto) {
        Warehouse warehouse = new Warehouse();
        warehouse.setName(dto.name());
        warehouse.setAddress(dto.address());
        return warehouseRepository.save(warehouse);
    }

    @Transactional
    public Warehouse updateWarehouse(UUID id, WarehouseDTO dto) {
        Warehouse warehouse = findById(id);
        warehouse.setName(dto.name());
        warehouse.setAddress(dto.address());
        return warehouseRepository.save(warehouse);
    }

    @Transactional
    public void deleteWarehouse(UUID id) {
        warehouseRepository.deleteById(id);
    }

    public Page<StorageBin> findAllBins(Pageable pageable) {
        return storageBinRepository.findAll(pageable);
    }

    public List<StorageBin> getBinsByWarehouse(UUID warehouseId) {
        return storageBinRepository.findByWarehouseId(warehouseId);
    }

    @Transactional
    public StorageBin saveBin(StorageBinDTO dto) {
        StorageBin bin = new StorageBin();
        bin.setBinCode(dto.binCode());
        bin.setZone(dto.zone());
        
        Warehouse warehouse = findById(dto.warehouseId());
        bin.setWarehouse(warehouse);
        
        return storageBinRepository.save(bin);
    }

    @Transactional
    public StorageBin updateBin(UUID id, StorageBinDTO dto) {
        StorageBin bin = storageBinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ячейка не найдена с ID: " + id));

        bin.setBinCode(dto.binCode());
        bin.setZone(dto.zone());

        if (dto.warehouseId() != null) {
            Warehouse warehouse = findById(dto.warehouseId());
            bin.setWarehouse(warehouse);
        }

        return storageBinRepository.save(bin);
    }

    @Transactional
    public void deleteBin(UUID id) {
        storageBinRepository.deleteById(id);
    }
}