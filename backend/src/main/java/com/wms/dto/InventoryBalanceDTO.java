package com.wms.dto;

import java.util.UUID;

public record InventoryBalanceDTO(UUID productId, UUID binId, Integer quantity) {}