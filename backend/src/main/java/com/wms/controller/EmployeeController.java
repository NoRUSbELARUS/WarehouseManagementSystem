package com.wms.controller;

import com.wms.dto.EmployeeDTO;
import com.wms.entity.Employee;
import com.wms.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService service;

    @GetMapping
    public List<Employee> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Employee create(@RequestBody EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setFirstName(dto.firstName());
        emp.setLastName(dto.lastName());
        emp.setRole(dto.role());
        return service.save(emp);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable UUID id, @RequestBody EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setId(id);
        emp.setFirstName(dto.firstName());
        emp.setLastName(dto.lastName());
        emp.setRole(dto.role());
        return service.save(emp);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}