import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-order-item-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Добавить товар в заказ</h2>
    <mat-dialog-content>
      <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 10px; padding-top: 10px;">
        <mat-form-field appearance="outline">
          <mat-label>Выберите товар</mat-label>
          <mat-select formControlName="productId">
            @for (prod of products; track prod.id) {
              <mat-option [value]="prod.id">{{prod.sku}} - {{prod.name}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Количество</mat-label>
          <input matInput type="number" formControlName="quantity">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Отмена</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Добавить</button>
    </mat-dialog-actions>
  `
})
export class OrderItemDialogComponent implements OnInit {
  form: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<OrderItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string }
  ) {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => this.products = res);
  }

  save() {
    if (this.form.valid) {
      const { productId, quantity } = this.form.value;
      this.orderService.addItemToOrder(this.data.orderId, productId, quantity)
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}