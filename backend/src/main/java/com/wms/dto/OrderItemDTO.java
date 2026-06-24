package com.wms.dto;

import java.util.UUID;

public record OrderItemDTO(UUID productId, Integer quantity) {}