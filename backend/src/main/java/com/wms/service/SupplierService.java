package com.wms.service;

import com.wms.entity.Supplier;
import com.wms.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository supplierRepository;

    public List<Supplier> findAll() {
        return supplierRepository.findAll();
    }

    public Supplier save(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public void delete(UUID id) {
        supplierRepository.deleteById(id);
    }
}
