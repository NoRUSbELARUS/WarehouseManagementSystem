import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';
import { SupplierDialogComponent } from '../../components/dialogs/supplier-dialog/supplier-dialog.component';
import { ConfirmDialogComponent } from '../../components/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.cdr.detectChanges();
      }
    });
  }

  openDialog(supplier?: Supplier): void {
    const dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '400px',
      data: supplier
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadSuppliers();
    });
  }

  deleteSupplier(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Удалить этого поставщика?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.deleteSupplier(id).subscribe(() => this.loadSuppliers());
      }
    });
  }
}