package com.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @JsonIgnoreProperties({ "storageBins", "hibernateLazyInitializer", "handler" })
    private Warehouse warehouse;
}