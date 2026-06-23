package com.wms.model;

import java.util.UUID;

public class StorageBin {
    private UUID id; private String code; private String zone;
    public StorageBin(UUID id, String code, String zone) {
        this.id = id; this.code = code; this.zone = zone;
    }
    public String toString() { return String.format("Ячейка: %s (Зона: %s) [ID: %s]", code, zone, id); }
}
