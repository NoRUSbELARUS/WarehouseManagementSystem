package com.wms.dao;

import com.wms.model.Warehouse;
import com.wms.model.StorageBin;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class WarehouseDAO {
    private Connection conn;
    public WarehouseDAO(Connection conn) { this.conn = conn; }

    public List<Warehouse> getAll() throws SQLException {
        List<Warehouse> list = new ArrayList<>();
        String sql = "SELECT id, name FROM warehouses";
        try (Statement st = conn.createStatement(); ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) list.add(new Warehouse((UUID)rs.getObject("id"), rs.getString("name")));
        }
        return list;
    }

    public List<StorageBin> getBinsByWarehouse(UUID warehouseId) throws SQLException {
        List<StorageBin> list = new ArrayList<>();
        String sql = "SELECT id, bin_code, zone FROM storage_bins WHERE warehouse_id = ?";
        try (PreparedStatement pst = conn.prepareStatement(sql)) {
            pst.setObject(1, warehouseId);
            ResultSet rs = pst.executeQuery();
            while (rs.next()) list.add(new StorageBin((UUID)rs.getObject("id"), rs.getString("bin_code"), rs.getString("zone")));
        }
        return list;
    }
}
