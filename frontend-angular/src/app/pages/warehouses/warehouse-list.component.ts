import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
import { StorageBinDialogComponent } from '../../components/dialogs/warehouse-dialog/storage-bin-dialog.component';
import { ConfirmDialogComponent } from '../../components/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[] = [];
  selectedWh: Warehouse | null = null;
  bins: StorageBin[] = [];

  displayedColumns: string[] = ['name', 'address', 'actions'];
  binColumns: string[] = ['code', 'zone', 'binActions'];

  constructor(
    private whService: WarehouseService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.whService.getWarehouses().subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.warehouses = res;
          this.cdr.detectChanges();
        });
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
    dialogRef.afterClosed().subscribe(result => { if (result) this.loadWarehouses(); });
  }

  deleteWh(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Удалить склад? Все ячейки будут удалены автоматически.' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.whService.deleteWarehouse(id).subscribe(() => {
          this.loadWarehouses();
          if (this.selectedWh?.id === id) this.selectedWh = null;
        });
      }
    });
  }

  openBinDialog(bin?: StorageBin): void {
    if (!this.selectedWh) return;
    const dialogRef = this.dialog.open(StorageBinDialogComponent, {
      width: '350px',
      data: { bin: bin, warehouseId: this.selectedWh.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedWh) this.loadBins(this.selectedWh);
    });
  }

  deleteBin(id: string): void {
    if (confirm('Удалить ячейку?')) {
      this.whService.deleteBin(id).subscribe(() => {
        if (this.selectedWh) this.loadBins(this.selectedWh);
      });
    }
  }
}