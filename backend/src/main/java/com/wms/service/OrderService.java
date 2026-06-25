package com.wms.service;

import com.wms.entity.Order;
import com.wms.entity.OrderItem;
import com.wms.repository.OrderRepository;
import com.wms.repository.OrderItemRepository;
import com.wms.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final EmployeeRepository employeeRepository;
    private final OrderItemRepository orderItemRepository;
    
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order saveWithEmployee(Order order, UUID employeeId) {
        if (employeeId != null) {
            order.setEmployee(employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Сотрудник не найден")));
        }
        return orderRepository.save(order);
    }
    @Transactional
    public OrderItem updateItemQuantity(UUID itemId, Integer newQuantity) {
    OrderItem item = orderItemRepository.findById(itemId)
            .orElseThrow(() -> new RuntimeException("Позиция не найдена"));
    item.setQuantity(newQuantity);
    return orderItemRepository.save(item);
    }
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public void delete(UUID id) {
        orderRepository.deleteById(id);
    }
}