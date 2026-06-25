package com.wms.service;

import com.wms.dto.InventoryBalanceDTO;
import com.wms.entity.InventoryBalance;
import com.wms.repository.InventoryBalanceRepository;
import com.wms.repository.ProductRepository;
import com.wms.repository.StorageBinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryBalanceRepository inventoryRepo;
    private final ProductRepository productRepo;
    private final StorageBinRepository binRepo;

    public Page<InventoryBalance> getByProduct(UUID productId, Pageable pageable) {
        return inventoryRepo.findByProductId(productId, pageable);
    }

    @Transactional
    public InventoryBalance addInventory(InventoryBalanceDTO dto) {
        InventoryBalance balance = new InventoryBalance();
        balance.setProduct(productRepo.findById(dto.productId()).orElseThrow());
        balance.setStorageBin(binRepo.findById(dto.binId()).orElseThrow());
        balance.setQuantity(dto.quantity());
        return inventoryRepo.save(balance);
    }

    @Transactional
    public InventoryBalance updateQuantity(UUID id, Integer newQuantity) {
        InventoryBalance balance = inventoryRepo.findById(id).orElseThrow();
        balance.setQuantity(newQuantity);
        return inventoryRepo.save(balance);
    }

    public void delete(UUID id) {
        inventoryRepo.deleteById(id);
    }
}