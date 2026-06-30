import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { WarehouseService } from '../../../services/warehouse.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Warehouse } from '../../../models/warehouse.model';
import { StorageBin } from '../../../models/storage-bin.model';

@Component({
  selector: 'app-inventory-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './inventory-dialog.component.html',
  styleUrls: ['./inventory-dialog.component.scss']
})
export class InventoryDialogComponent implements OnInit {
  form: FormGroup;
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  bins: StorageBin[] = [];

  constructor(
    private fb: FormBuilder,
    private whService: WarehouseService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<InventoryDialogComponent>
  ) {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      warehouseId: ['', Validators.required],
      binId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => this.products = res);
    this.whService.getWarehouses().subscribe(res => this.warehouses = res);
  }

  onWarehouseChange(whId: string) {
    this.whService.getBinsByWarehouse(whId).subscribe(res => {
      this.bins = res;
      this.form.get('binId')?.setValue('');
    });
  }

  save() {
    if (this.form.valid) {
      this.whService.createInventory(this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}