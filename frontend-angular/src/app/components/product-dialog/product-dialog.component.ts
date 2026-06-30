import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { Category, Supplier, Product } from '../../models/product.model';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  suppliers: Supplier[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      sku: [data?.sku || '', Validators.required],
      name: [data?.name || '', Validators.required],
      unitPrice: [data?.unitPrice || 0, [Validators.required, Validators.min(0)]],
      categoryId: [data?.category?.id || '', Validators.required],
      supplierId: [data?.supplier?.id || '', Validators.required]
    });
  }

  ngOnInit() {
    this.productService.getCategories().subscribe((res: Category[]) => this.categories = res);
    this.supplierService.getSuppliers().subscribe((res: Supplier[]) => this.suppliers = res);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.productForm.valid) {
      const obs = this.data
        ? this.productService.updateProduct(this.data.id, this.productForm.value)
        : this.productService.createProduct(this.productForm.value);

      obs.subscribe(() => this.dialogRef.close(true));
    }
  }
}