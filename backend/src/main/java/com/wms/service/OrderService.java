package com.wms.service;

import com.wms.entity.Order;
import com.wms.entity.OrderItem;
import com.wms.entity.Product;
import com.wms.repository.OrderItemRepository;
import com.wms.repository.OrderRepository;
import com.wms.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository itemRepository;
    private final ProductRepository productRepository;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order save(Order order) {
        return orderRepository.save(order);
    }

    public void delete(UUID id) {
        orderRepository.deleteById(id);
    }

    public List<OrderItem> findItemsByOrder(UUID orderId) {
        return itemRepository.findByOrder_Id(orderId);
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

        return itemRepository.save(item);
    }

    @Transactional
    public OrderItem updateItem(UUID itemId, int quantity) {
        OrderItem item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Позиция заказа не найдена"));
        item.setQuantity(quantity);
        return itemRepository.save(item);
    }

    public void deleteItem(UUID itemId) {
        itemRepository.deleteById(itemId);
    }
}
