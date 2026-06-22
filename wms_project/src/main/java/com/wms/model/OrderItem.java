package com.wms.model;

import java.util.UUID;

public class OrderItem {
    private UUID id;
    private UUID orderId;
    private UUID productId;
    private int quantity;
    private double priceAtOrder;
    private String productName; // Для удобства вывода

    // Геттеры и сеттеры
    public void setProductName(String productName) { this.productName = productName; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setPriceAtOrder(double priceAtOrder) { this.priceAtOrder = priceAtOrder; }

    @Override
    public String toString() {
        return String.format("Товар: %s | Кол-во: %d | Цена при заказе: %.2f", 
                             productName, quantity, priceAtOrder);
    }
}

