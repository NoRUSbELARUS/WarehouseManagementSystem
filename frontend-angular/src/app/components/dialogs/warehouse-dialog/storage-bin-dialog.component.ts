import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WarehouseService } from '../../../services/warehouse.service';
import { StorageBin } from '../../../models/storage-bin.model';

@Component({
  selector: 'app-storage-bin-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './storage-bin-dialog.component.html',
  styleUrls: ['./storage-bin-dialog.component.scss']
})
export class StorageBinDialogComponent {
  binForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private whService: WarehouseService,
    public dialogRef: MatDialogRef<StorageBinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bin?: StorageBin, warehouseId: string }
  ) {
    this.isEdit = !!data.bin;
    this.binForm = this.fb.group({
      binCode: [data.bin?.binCode || '', Validators.required],
      zone: [data.bin?.zone || '', Validators.required],
      warehouseId: [data.warehouseId]
    });
  }

  save() {
    if (this.binForm.valid) {
      const request = this.isEdit 
        ? this.whService.updateBin(this.data.bin!.id, this.binForm.value)
        : this.whService.createBin(this.binForm.value);

      request.subscribe(() => this.dialogRef.close(true));
    }
  }
}