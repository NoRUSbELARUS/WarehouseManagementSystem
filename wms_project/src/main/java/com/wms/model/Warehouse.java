package com.wms.model;

import java.util.UUID;

public class Warehouse {
    private UUID id;
    private String name;
    public Warehouse(UUID id, String name) { this.id = id; this.name = name; }
    public String toString() { return String.format("[%s] %s", id, name); }
}
