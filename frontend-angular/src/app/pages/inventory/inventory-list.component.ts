import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/shared/confirm-dialog/confirm-dialog.component';
import { WarehouseService } from '../../services/warehouse.service';
import { InventoryBalance } from '../../models/inventory-balance.model';
import { InventoryDialogComponent } from '../../components/dialogs/inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  balances: InventoryBalance[] = [];
  displayedColumns: string[] = ['product', 'warehouse', 'bin', 'qty', 'actions'];

  constructor(
    private whService: WarehouseService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.whService.getAllInventory().subscribe({
      next: (data: InventoryBalance[]) => {
        this.zone.run(() => {
          this.balances = data;
          this.cdr.detectChanges();
          console.log('Остатки успешно загружены:', this.balances);
        });
      },
      error: (err) => {
        console.error('Ошибка при загрузке остатков в компоненте:', err);
      }
    });
  }

  getQuantityColor(qty: number): string {
    if (qty <= 0) return 'red';
    if (qty <= 5) return 'orange';
    return 'inherit';
  }

  deleteItem(balance: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: `Списать товар ${balance.product.name} из ячейки ${balance.storageBin.binCode}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.whService.deleteInventory(balance.storageBin.id, balance.product.id).subscribe({
          next: () => this.loadInventory(),
          error: (err) => alert('Ошибка списания: ' + err.message)
        });
      }
    });
  }
  addStock() {
    const dialogRef = this.dialog.open(InventoryDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInventory();
      }
    });
  }
}