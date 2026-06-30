import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderItemsMap: { [orderId: string]: OrderItem[] } = {};
  itemColumns: string[] = ['sku', 'name', 'qty', 'price', 'total', 'delete'];

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.zone.run(() => {
          this.orders = res;
          this.cdr.detectChanges();
        });
      },
      error: (err) => console.error('Error', err)
    });
  }

  loadItems(orderId: string) {
    if (!this.orderItemsMap[orderId]) {
      this.orderService.getOrderItems(orderId).subscribe(items => {
        this.zone.run(() => {
          this.orderItemsMap[orderId] = items;
          this.cdr.detectChanges();
        });
      });
    }
  }

  createNewOrder() {
    const dialogRef = this.dialog.open(OrderDialogComponent, { width: '450px' });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  deleteOrder(id: string) {
    if (confirm('Вы уверены, что хотите удалить заказ целиком?')) {
      this.orderService.deleteOrder(id).subscribe(() => this.loadOrders());
    }
  }

  removeItem(orderId: string, item: any) {
    if (confirm(`Удалить ${item.product.name} из заказа?`)) {
      this.orderService.removeItemFromOrder(orderId, item.product.id).subscribe(() => {
        delete this.orderItemsMap[orderId];
        this.loadItems(orderId);
      });
    }
  }

  editOrder(order: any) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadOrders();
    });
  }

  addItem(orderId: string) {
    const dialogRef = this.dialog.open(OrderItemDialogComponent, {
      width: '450px',
      data: { orderId: orderId }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        delete this.orderItemsMap[orderId];
        this.loadItems(orderId);
      }
    });
  }
}