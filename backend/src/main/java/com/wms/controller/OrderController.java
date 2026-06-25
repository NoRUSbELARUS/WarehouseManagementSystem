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

    private final OrderService orderService;

    @GetMapping
    public List<Order> getAll() {
        return orderService.findAll();
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable UUID id, @RequestBody OrderDTO dto) {
        Order order = new Order();
        order.setId(id);
        order.setOrderType(dto.orderType());
        order.setStatus(dto.status());
        return orderService.saveWithEmployee(order, dto.employeeId());
    }

    @PostMapping
    public Order create(@RequestBody OrderDTO dto) {
        Order order = new Order();
        order.setOrderType(dto.orderType());
        order.setStatus(dto.status());
        return orderService.saveWithEmployee(order, dto.employeeId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        orderService.delete(id);
    }
}