package com.wms.controller;

import com.wms.entity.*;
import com.wms.service.WmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final WmsService wmsService;

    @GetMapping
    public List<Order> getOrders() { return wmsService.getAllOrders(); }

    @GetMapping("/{id}/items")
    public List<OrderItem> getOrderItems(@PathVariable UUID id) { 
        return wmsService.getOrderItems(id); 
    }

    @PostMapping("/{orderId}/items")
    public OrderItem addItem(@PathVariable UUID orderId, 
                             @RequestParam UUID productId, 
                             @RequestParam Integer quantity) {
        return wmsService.addItemToOrder(orderId, productId, quantity);
    }
}