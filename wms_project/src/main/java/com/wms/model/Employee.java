package com.wms.model;

import java.util.UUID;

public class Employee {
    private UUID id;
    private String fullName;
    private String role;
    
    public Employee(UUID id, String fn, String ln, String role) {
        this.id = id; this.fullName = fn + " " + ln; this.role = role;
    }
    public String toString() { return String.format("%-20s | %-10s [%s]", fullName, role, id); }
}
