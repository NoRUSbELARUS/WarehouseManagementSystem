package com.wms.controller;

import com.wms.entity.Employee;
import com.wms.service.WmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final WmsService wmsService;

    @GetMapping
    public List<Employee> getEmployees() { return wmsService.getAllEmployees(); }
}