package com.wms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.wms.entity.InventoryBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface InventoryBalanceRepository extends JpaRepository<InventoryBalance, UUID> {
    Page<InventoryBalance> findByProductId(UUID productId, Pageable pageable);
    List<InventoryBalance> findByStorageBinId(UUID binId);
}
