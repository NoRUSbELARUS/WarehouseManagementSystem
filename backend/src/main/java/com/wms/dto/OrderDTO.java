package com.wms.dto;

import java.util.UUID;

public record OrderDTO(String orderType, String status, UUID employeeId) {}