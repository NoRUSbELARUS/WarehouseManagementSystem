package com.wms.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductDTO(
    String sku, 
    String name, 
    BigDecimal unitPrice, 
    UUID categoryId, 
    UUID supplierId
) {}