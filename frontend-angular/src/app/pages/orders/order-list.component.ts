import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem } from '../../models/order.model';
import { OrderDialogComponent } from '../../components/dialogs/order-dialog/order-dialog.component';
import { OrderItemDialogComponent } from '../../components/dialogs/order-dialog/order-item-dialog.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatExpansionModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './order-list.component.html',
  styles: [`.full-width { width: 100%; } .mat-chip { font-size: 10px; }`]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderItemsMap: { [orderId: string]: OrderItem[] } = {};
  
  itemColumns: string[] = ['sku', 'name', 'qty', 'price', 'total'];

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (res) => this.orders = res,
      error: (err) => console.error('Ошибка загрузки заказов', err)
    });
  }

  loadItems(orderId: string) {
    if (!this.orderItemsMap[orderId]) {
      this.orderService.getOrderItems(orderId).subscribe({
        next: (items) => this.orderItemsMap[orderId] = items,
        error: (err) => console.error('Ошибка загрузки позиций', err)
      });
    }
  }

  createNewOrder() {
    const dialogRef = this.dialog.open(OrderDialogComponent, { width: '400px' });
    
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  addItem(orderId: string) {
    const dialogRef = this.dialog.open(OrderItemDialogComponent, {
      width: '400px',
      data: { orderId }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        delete this.orderItemsMap[orderId];
        this.loadItems(orderId);
      }
    });
  }
}