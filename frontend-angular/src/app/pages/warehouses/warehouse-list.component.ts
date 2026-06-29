import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WarehouseService } from '../../services/warehouse.service';
import { Warehouse } from '../../models/warehouse.model';
import { StorageBin } from '../../models/storage-bin.model';
import { WarehouseDialogComponent } from '../../components/dialogs/warehouse-dialog/warehouse-dialog.component';
import { ConfirmDialogComponent } from '../../components/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './warehouse-list.component.html'
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  selectedWh: Warehouse | null = null;
  bins: StorageBin[] = [];
  displayedColumns: string[] = ['name', 'address', 'actions'];

  constructor(
    private whService: WarehouseService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.whService.getWarehouses().subscribe({
      next: (res) => {
        this.warehouses = res;
        this.cdr.detectChanges();
      }
    });
  }

  loadBins(wh: Warehouse): void {
    this.selectedWh = wh;
    this.whService.getBinsByWarehouse(wh.id).subscribe({
      next: (res) => {
        this.bins = res;
        this.cdr.detectChanges();
      }
    });
  }

  openWhDialog(wh?: Warehouse): void {
    const dialogRef = this.dialog.open(WarehouseDialogComponent, { width: '400px', data: wh });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadWarehouses();
    });
  }

  deleteWh(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Удалить склад и все его ячейки?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.whService.deleteWarehouse(id).subscribe(() => this.loadWarehouses());
      }
    });
  }
}