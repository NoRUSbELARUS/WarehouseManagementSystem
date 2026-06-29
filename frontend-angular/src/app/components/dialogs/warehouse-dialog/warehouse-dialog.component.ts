import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WarehouseService } from '../../../services/warehouse.service';
import { Warehouse } from '../../../models/warehouse.model';

@Component({
  selector: 'app-warehouse-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Редактировать склад' : 'Добавить склад' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="whForm" style="display: flex; flex-direction: column; gap: 10px; padding-top: 10px;">
        <mat-form-field appearance="outline">
          <mat-label>Название склада</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Адрес</mat-label>
          <input matInput formControlName="address">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Отмена</button>
      <button mat-raised-button color="primary" [disabled]="whForm.invalid" (click)="save()">Сохранить</button>
    </mat-dialog-actions>
  `
})
export class WarehouseDialogComponent {
  whForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: WarehouseService,
    public dialogRef: MatDialogRef<WarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warehouse
  ) {
    this.whForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      address: [data?.address || '', Validators.required]
    });
  }
  save() {
    if (this.whForm.valid) {
      const req = this.data ? this.service.updateWarehouse(this.data.id, this.whForm.value) : this.service.createWarehouse(this.whForm.value);
      req.subscribe(() => this.dialogRef.close(true));
    }
  }
}