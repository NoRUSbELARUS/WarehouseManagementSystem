package com.wms.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    private UUID id;
    
    @Column(name = "order_type")
    private String orderType;
    
    private String status;
    
    @Column(name = "created_at")
    private OffsetDateTime createdAt;
}