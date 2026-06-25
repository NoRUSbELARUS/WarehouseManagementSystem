package com.wms.repository;

import com.wms.entity.InventoryBalance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface InventoryBalanceRepository extends JpaRepository<InventoryBalance, UUID> {
    List<InventoryBalance> findByStorageBinId(UUID binId);
    List<InventoryBalance> findByProductId(UUID productId);
}
