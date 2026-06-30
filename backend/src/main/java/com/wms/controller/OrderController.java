package com.wms.controller;

import com.wms.dto.OrderDTO;
import com.wms.entity.Order;
import com.wms.entity.OrderItem;
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

    @GetMapping("/{id}/items")
    public List<OrderItem> getOrderItems(@PathVariable UUID id) {
        return orderService.getOrderItems(id);
    }

    @PutMapping("/{id}")
    public Order update(@PathVariable UUID id, @RequestBody OrderDTO dto) {
        return orderService.updateOrder(id, dto);
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