package com.wms.model;

import java.util.UUID;

public class Supplier {
    private UUID id; 
    private String name;
    
    public Supplier(UUID id, String name) { this.id = id; this.name = name; }
    public String toString() { return String.format("[%s] %s", id, name); }
}
