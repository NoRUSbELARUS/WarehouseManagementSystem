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
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
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