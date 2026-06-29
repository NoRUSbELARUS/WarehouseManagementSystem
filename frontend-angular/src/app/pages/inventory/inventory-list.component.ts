import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <div style="padding: 20px;">
      <h1>Текущие остатки (Inventory)</h1>
      <table mat-table [dataSource]="balances" class="mat-elevation-z8">
        <ng-container matColumnDef="product">
          <th mat-header-cell *matHeaderCellDef> Товар </th>
          <td mat-cell *matCellDef="let b"> {{b.product.name}} ({{b.product.sku}}) </td>
        </ng-container>

        <ng-container matColumnDef="warehouse">
          <th mat-header-cell *matHeaderCellDef> Склад </th>
          <td mat-cell *matCellDef="let b"> {{b.storageBin.warehouse.name}} </td>
        </ng-container>

        <ng-container matColumnDef="bin">
          <th mat-header-cell *matHeaderCellDef> Ячейка </th>
          <td mat-cell *matCellDef="let b"> {{b.storageBin.binCode}} </td>
        </ng-container>

        <ng-container matColumnDef="qty">
          <th mat-header-cell *matHeaderCellDef> Количество </th>
          <td mat-cell *matCellDef="let b"> <strong>{{b.quantity}}</strong> </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['product', 'warehouse', 'bin', 'qty']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['product', 'warehouse', 'bin', 'qty'];"></tr>
      </table>
    </div>
  `
})
export class InventoryListComponent implements OnInit {
  balances: any[] = [];
  constructor(private whService: WarehouseService) {}
  ngOnInit() {
    // В реальности здесь нужен метод getAllInventory, но для теста 
    // можно загрузить содержимое первой попавшейся ячейки или расширить сервис
  }
}