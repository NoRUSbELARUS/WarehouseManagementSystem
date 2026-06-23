package com.wms.model;

public class OrderItem {
    private int quantity;
    private double priceAtOrder;
    private String productName;

    public void setProductName(String productName) { this.productName = productName; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setPriceAtOrder(double priceAtOrder) { this.priceAtOrder = priceAtOrder; }

    @Override
    public String toString() {
        return String.format("Товар: %s | Кол-во: %d | Цена при заказе: %.2f", 
                             productName, quantity, priceAtOrder);
    }
}

