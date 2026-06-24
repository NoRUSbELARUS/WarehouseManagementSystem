package com.wms.dto;

import java.util.UUID;

public record StorageBinDTO(String binCode, String zone, UUID warehouseId) {}