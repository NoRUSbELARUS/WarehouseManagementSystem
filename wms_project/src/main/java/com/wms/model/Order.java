package com.wms.model;

import java.util.UUID;
import java.time.OffsetDateTime;

public class Order {
    private UUID id;
    private UUID employeeId;
    private String orderType;
    private String status;
    private OffsetDateTime createdAt;

    // Конструкторы, геттеры, сеттеры
    public Order() {}
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}