import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderDTO, OrderItem } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  createOrder(dto: OrderDTO): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, dto);
  }

  updateOrder(id: string, dto: OrderDTO): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, dto);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOrderItems(orderId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/${orderId}/items`);
  }

  addItemToOrder(orderId: string, productId: string, quantity: number): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.apiUrl}/${orderId}/items`, null, {
      params: { productId, quantity: quantity.toString() }
    });
  }
}