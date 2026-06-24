package com.wms.repository;

import com.wms.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
}