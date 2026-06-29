import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Редактировать сотрудника' : 'Новый сотрудник' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="empForm" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
        <mat-form-field appearance="outline">
          <mat-label>Имя</mat-label>
          <input matInput formControlName="firstName">
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Фамилия</mat-label>
          <input matInput formControlName="lastName">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Роль / Должность</mat-label>
          <input matInput formControlName="role" placeholder="Например: Кладовщик">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Отмена</button>
      <button mat-raised-button color="primary" [disabled]="empForm.invalid" (click)="save()">Сохранить</button>
    </mat-dialog-actions>
  `
})
export class EmployeeDialogComponent {
  empForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.empForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      role: [data?.role || '', Validators.required]
    });
  }

  save() {
    if (this.empForm.valid) {
      const request = this.data 
        ? this.service.updateEmployee(this.data.id, this.empForm.value)
        : this.service.createEmployee(this.empForm.value);

      request.subscribe(() => this.dialogRef.close(true));
    }
  }
}