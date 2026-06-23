package com.wms.dao;

import com.wms.model.Category;
import com.wms.model.Product;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CatalogDAO {
    private Connection conn;
    public CatalogDAO(Connection conn) { this.conn = conn; }

    public List<Product> getAllProducts() throws SQLException {
        List<Product> list = new ArrayList<>();
        String sql = "SELECT id, sku, name, unit_price FROM products";
        try (Statement st = conn.createStatement(); ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) list.add(new Product((UUID)rs.getObject("id"), rs.getString("sku"), rs.getString("name"), rs.getDouble("unit_price")));
        }
        return list;
    }

    public List<Category> getAllCategories() throws SQLException {
        List<Category> list = new ArrayList<>();
        String sql = "SELECT id, name FROM categories";
        try (Statement st = conn.createStatement(); ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) list.add(new Category((UUID)rs.getObject("id"), rs.getString("name")));
        }
        return list;
    }
}
