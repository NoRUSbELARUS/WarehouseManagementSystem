package com.wms.repository;

import com.wms.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface WarehouseRepository extends JpaRepository<Warehouse, UUID> {
}