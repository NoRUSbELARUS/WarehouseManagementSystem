import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../../services/order.service';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Создать новый заказ</h2>
    <mat-dialog-content>
      <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 10px; padding-top: 10px;">
        <mat-form-field appearance="outline">
          <mat-label>Тип заказа</mat-label>
          <mat-select formControlName="orderType">
            <mat-option value="INBOUND">Приход (Inbound)</mat-option>
            <mat-option value="OUTBOUND">Расход (Outbound)</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Ответственный сотрудник</mat-label>
          <mat-select formControlName="employeeId">
            @for (emp of employees; track emp.id) {
              <mat-option [value]="emp.id">{{emp.firstName}} {{emp.lastName}}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Отмена</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Создать</button>
    </mat-dialog-actions>
  `
})
export class OrderDialogComponent implements OnInit {
  form: FormGroup;
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<OrderDialogComponent>
  ) {
    this.form = this.fb.group({
      orderType: ['INBOUND', Validators.required],
      status: ['DRAFT'],
      employeeId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(res => this.employees = res);
  }

  save() {
    if (this.form.valid) {
      this.orderService.createOrder(this.form.value).subscribe(() => this.dialogRef.close(true));
    }
  }
}