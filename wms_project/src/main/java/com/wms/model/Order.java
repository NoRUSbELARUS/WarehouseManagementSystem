package com.wms.model;

import java.util.UUID;

public class Order {
    private UUID id;
    private String type;
    private String status;
    private String createdAt;

    public Order(UUID id, String type, String status, String createdAt) {
        this.id = id;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return String.format("[%s] Тип: %-8s | Статус: %-10s | Дата: %s", 
                             id, type, status, createdAt);
    }
}