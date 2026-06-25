package com.wms.service;

import com.wms.entity.Product;
import com.wms.repository.ProductRepository;
import com.wms.repository.CategoryRepository;
import com.wms.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Transactional
    public Product saveFromDto(Product product, UUID categoryId, UUID supplierId) {
        if (categoryId != null) {
            product.setCategory(categoryRepository.findById(categoryId).orElse(null));
        }
        if (supplierId != null) {
            product.setSupplier(supplierRepository.findById(supplierId).orElse(null));
        }
        return productRepository.save(product);
    }

    public void delete(UUID id) {
        productRepository.deleteById(id);
    }
}