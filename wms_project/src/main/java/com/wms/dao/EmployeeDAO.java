package com.wms.dao;

import com.wms.model.Employee;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class EmployeeDAO {
    private Connection conn;
    public EmployeeDAO(Connection conn) { this.conn = conn; }

    public List<Employee> getAll() throws SQLException {
        List<Employee> list = new ArrayList<>();
        String sql = "SELECT id, first_name, last_name, role FROM employees";
        try (Statement st = conn.createStatement(); ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) list.add(new Employee((UUID)rs.getObject("id"), rs.getString("first_name"), rs.getString("last_name"), rs.getString("role")));
        }
        return list;
    }
}
