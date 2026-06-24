package com.wms.controller;

import com.wms.dto.OrderDTO;
import com.wms.entity.Order;
import com.wms.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService service;

    @GetMapping
    public List<Order> getAll() {
        return service.findAll();
    }

    @PostMapping
    @SuppressWarnings("java:S4684") // Sonar: DTO used correctly here
    public Order create(@RequestBody OrderDTO dto) {
        Order order = new Order();
        order.setOrderType(dto.orderType());
        order.setStatus(dto.status());
        // Employee mapping via Service
        return service.saveWithEmployee(order, dto.employeeId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}