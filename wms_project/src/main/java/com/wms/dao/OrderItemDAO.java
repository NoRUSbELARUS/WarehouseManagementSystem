package com.wms.dao;

import com.wms.model.OrderItem;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OrderItemDAO {
    private final Connection connection;

    // Конструктор (исправляет ошибку "Constructor undefined")
    public OrderItemDAO(Connection connection) {
        this.connection = connection;
    }

    // Метод добавления (addProductToOrder)
    public void addProductToOrder(UUID orderId, UUID productId, int quantity) throws SQLException {
        double currentPrice = 0;
        String priceSql = "SELECT unit_price FROM products WHERE id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(priceSql)) {
            pstmt.setObject(1, productId);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                currentPrice = rs.getDouble("unit_price");
            } else {
                throw new SQLException("Товар с таким ID не найден");
            }
        }

        String sql = "INSERT INTO order_items (order_id, product_id, quantity, price_at_order) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setObject(1, orderId);
            pstmt.setObject(2, productId);
            pstmt.setInt(3, quantity);
            pstmt.setDouble(4, currentPrice);
            pstmt.executeUpdate();
        }
    }

    // Метод получения деталей (getOrderDetails)
    public List<OrderItem> getOrderDetails(UUID orderId) throws SQLException {
        List<OrderItem> items = new ArrayList<>();
        String sql = "SELECT oi.*, p.name FROM order_items oi " +
                     "JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?";
        
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setObject(1, orderId);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                OrderItem item = new OrderItem();
                item.setProductName(rs.getString("name"));
                item.setQuantity(rs.getInt("quantity"));
                item.setPriceAtOrder(rs.getDouble("price_at_order"));
                items.add(item);
            }
        }
        return items;
    }

    // Метод обновления (updateQuantity)
    public void updateQuantity(UUID orderId, UUID productId, int newQuantity) throws SQLException {
        String sql = "UPDATE order_items SET quantity = ? WHERE order_id = ? AND product_id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, newQuantity);
            pstmt.setObject(2, orderId);
            pstmt.setObject(3, productId);
            pstmt.executeUpdate();
        }
    }

    // Метод удаления (removeItemFromOrder)
    public void removeItemFromOrder(UUID orderId, UUID productId) throws SQLException {
        String sql = "DELETE FROM order_items WHERE order_id = ? AND product_id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setObject(1, orderId);
            pstmt.setObject(2, productId);
            pstmt.executeUpdate();
        }
    }
}