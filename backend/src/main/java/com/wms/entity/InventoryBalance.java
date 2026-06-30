package com.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "inventory_balances")
@Data
public class InventoryBalance {

    @EmbeddedId
    private InventoryBalanceId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({"category", "supplier", "hibernateLazyInitializer", "handler"})
    private Product product;

    @ManyToOne
    @MapsId("binId")
    @JoinColumn(name = "bin_id")
    @JsonIgnoreProperties({"warehouse", "hibernateLazyInitializer", "handler"})
    private StorageBin storageBin;

    @Column(name = "total_quantity")
    private Integer quantity;

    @JsonProperty("id")
    public String getVirtualId() {
        if (id == null || id.getBinId() == null || id.getProductId() == null) {
            return null;
        }
        return id.getBinId().toString() + "_" + id.getProductId().toString();
    }
}