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

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{data ? 'Редактировать' : 'Новый товар'}}</h2>
    <mat-dialog-content>
      <form [formGroup]="productForm" class="form-container">
        <mat-form-field appearance="outline">
          <mat-label>SKU</mat-label>
          <input matInput formControlName="sku">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Название</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Цена</mat-label>
          <input matInput type="number" formControlName="unitPrice">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Категория</mat-label>
          <mat-select formControlName="categoryId">
            @for (cat of categories; track cat.id) { <mat-option [value]="cat.id">{{cat.name}}</mat-option> }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Поставщик</mat-label>
          <mat-select formControlName="supplierId">
            @for (sup of suppliers; track sup.id) { <mat-option [value]="sup.id">{{sup.name}}</mat-option> }
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Отмена</button>
      <button mat-raised-button color="primary" [disabled]="productForm.invalid" (click)="save()">Сохранить</button>
    </mat-dialog-actions>
  `,
  styles: [`.form-container { display: flex; flex-direction: column; padding-top: 10px; }`]
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  suppliers: Supplier[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null
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
    this.productService.getCategories().subscribe(res => this.categories = res);
    this.productService.getSuppliers().subscribe(res => this.suppliers = res);
  }

  onNoClick(): void { this.dialogRef.close(); }

  save() {
    if (this.productForm.valid) {
      const obs = this.data 
        ? this.productService.updateProduct(this.data.id, this.productForm.value)
        : this.productService.createProduct(this.productForm.value);
      
      obs.subscribe(() => this.dialogRef.close(true));
    }
  }
}