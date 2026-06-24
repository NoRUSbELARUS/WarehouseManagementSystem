package com.wms.controller;

import com.wms.entity.Employee;
import com.wms.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
@CrossOrigin
public class EmployeeController {
    private final EmployeeService service;

    @GetMapping
    public List<Employee> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return service.save(employee);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable UUID id, @RequestBody Employee employee) {
        employee.setId(id);
        return service.save(employee);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
