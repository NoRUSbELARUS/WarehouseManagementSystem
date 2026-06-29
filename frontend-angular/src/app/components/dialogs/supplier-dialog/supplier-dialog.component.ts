import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SupplierService } from '../../../services/supplier.service';
import { Supplier } from '../../../models/supplier.model';

@Component({
  selector: 'app-supplier-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Редактировать поставщика' : 'Новый поставщик' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 10px; padding-top: 10px;">
        <mat-form-field appearance="outline">
          <mat-label>Название компании</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="contactEmail" type="email">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Отмена</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">Сохранить</button>
    </mat-dialog-actions>
  `
})
export class SupplierDialogComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: SupplierService,
    public dialogRef: MatDialogRef<SupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Supplier
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      contactEmail: [data?.contactEmail || '', [Validators.required, Validators.email]]
    });
  }
  save() {
    if (this.form.valid) {
      const req = this.data ? this.service.updateSupplier(this.data.id, this.form.value) : this.service.createSupplier(this.form.value);
      req.subscribe(() => this.dialogRef.close(true));
    }
  }
}