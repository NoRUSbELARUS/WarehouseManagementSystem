package com.wms.repository;

import com.wms.entity.StorageBin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface StorageBinRepository extends JpaRepository<StorageBin, UUID> {
    List<StorageBin> findByWarehouseId(UUID warehouseId);
    Page<StorageBin> findByBinCodeContaining(String binCode, Pageable pageable);
}