package com.wms.service;

import com.wms.entity.*;
import com.wms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WmsService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final WarehouseRepository warehouseRepository;
    private final StorageBinRepository storageBinRepository;
    private final EmployeeRepository employeeRepository;
    private final SupplierRepository supplierRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> getAllProducts() { return productRepository.findAll(); }
    public List<Category> getAllCategories() { return categoryRepository.findAll(); }
    public List<Supplier> getAllSuppliers() { return supplierRepository.findAll(); }

    public List<Warehouse> getAllWarehouses() { return warehouseRepository.findAll(); }
    public List<StorageBin> getBinsByWarehouse(UUID warehouseId) { 
        return storageBinRepository.findByWarehouseId(warehouseId); 
    }

    public List<Employee> getAllEmployees() { return employeeRepository.findAll(); }

    public List<Order> getAllOrders() { return orderRepository.findAll(); }
    
    public List<OrderItem> getOrderItems(UUID orderId) { 
        return orderItemRepository.findByOrderId(orderId); 
    }

    @Transactional
    public OrderItem addItemToOrder(UUID orderId, UUID productId, Integer quantity) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Заказ не найден"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Товар не найден"));

        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setPriceAtOrder(product.getUnitPrice());

        return orderItemRepository.save(item);
    }
}