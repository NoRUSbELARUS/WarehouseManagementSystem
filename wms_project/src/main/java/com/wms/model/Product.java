package com.wms.model;

import java.util.UUID;

public class Product {
    private UUID id; 
    private String sku; 
    private String name; 
    private double price;
    
    public Product(UUID id, String sku, String name, double price) {
        this.id = id; this.sku = sku; this.name = name; this.price = price;
    }
    public String toString() { return String.format("%s | %-20s | %.2f руб. (ID: %s)", sku, name, price, id); }
}
