package com.wms.model;

import java.util.UUID;

public class Order {
    private UUID id;
    private String status;

    public Order() {}
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}