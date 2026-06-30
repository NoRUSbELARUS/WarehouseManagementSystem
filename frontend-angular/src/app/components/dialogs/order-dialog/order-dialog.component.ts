import { Component, Inject, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { OrderService } from '../../../services/order.service';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-order-dialog',
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
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  employees: Employee[] = [];
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      orderType: [data?.orderType || 'INBOUND', Validators.required],
      status: [data?.status || 'DRAFT', Validators.required],
      employeeId: [data?.employee?.id || '', Validators.required]
    });
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Ошибка загрузки сотрудников:', err)
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  save() {
    if (this.form.invalid) return;

    const request = this.isEdit
      ? this.orderService.updateOrder(this.data.id, this.form.value)
      : this.orderService.createOrder(this.form.value);

    request.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => alert('Ошибка при сохранении: ' + err.message)
    });
  }
}