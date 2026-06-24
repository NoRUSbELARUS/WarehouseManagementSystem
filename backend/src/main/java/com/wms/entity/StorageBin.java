package com.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "storage_bins")
@Data
public class StorageBin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "bin_code", nullable = false)
    private String binCode;

    private String zone;

    // Связь: ячейка принадлежит конкретному складу
    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;
}