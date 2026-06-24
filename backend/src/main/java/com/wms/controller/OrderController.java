package com.wms.controller;

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
@CrossOrigin
public class OrderController {
    private final OrderService service;

    @GetMapping
    public List<Order> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Order create(@RequestBody Order order) {
        return service.save(order);
    }

    @PutMapping("/{id}")
    public Order update(@PathVariable UUID id, @RequestBody Order order) {
        order.setId(id);
        return service.save(order);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }

    @GetMapping("/{id}/items")
    public List<OrderItem> getItems(@PathVariable UUID id) {
        return service.findItemsByOrder(id);
    }

    @PostMapping("/{id}/items")
    public OrderItem addItem(
            @PathVariable UUID id,
            @RequestParam UUID productId,
            @RequestParam int quantity) {
        return service.addItemToOrder(id, productId, quantity);
    }

    @PutMapping("/{orderId}/items/{itemId}")
    public OrderItem updateItem(
            @PathVariable UUID itemId,
            @RequestParam int quantity) {
        return service.updateItem(itemId, quantity);
    }

    @DeleteMapping("/{orderId}/items/{itemId}")
    public void deleteItem(@PathVariable UUID itemId) {
        service.deleteItem(itemId);
    }
}
