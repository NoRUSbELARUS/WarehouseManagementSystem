package com.wms.dao;

import com.wms.model.Order;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class OrderDAO {
    private Connection conn;

    public OrderDAO(Connection conn) {
        this.conn = conn;
    }

    public List<Order> getAllOrders() throws SQLException {
        List<Order> list = new ArrayList<>();
        String sql = "SELECT id, order_type, status, created_at FROM orders ORDER BY created_at DESC";
        try (Statement st = conn.createStatement(); ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                list.add(new Order(
                    (UUID) rs.getObject("id"),
                    rs.getString("order_type"),
                    rs.getString("status"),
                    rs.getString("created_at")
                ));
            }
        }
        return list;
    }
}
