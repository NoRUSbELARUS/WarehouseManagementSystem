package com.wms.service;

import com.wms.entity.Order;
import com.wms.repository.OrderRepository;
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

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    // Метод для привязки сотрудника к заказу через его ID
    @Transactional
    public Order saveWithEmployee(Order order, UUID employeeId) {
        if (employeeId != null) {
            order.setEmployee(employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Сотрудник не найден")));
        }
        return orderRepository.save(order);
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public void delete(UUID id) {
        orderRepository.deleteById(id);
    }
}