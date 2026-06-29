import { Employee } from './employee.model';
import { Product } from './product.model';

export type OrderType = 'INBOUND' | 'OUTBOUND';
export type OrderStatus = 'DRAFT' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  orderType: OrderType;
  status: OrderStatus;
  createdAt: string;
  employee?: Employee;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  priceAtOrder: number;
}

export interface OrderDTO {
  orderType: OrderType;
  status: OrderStatus;
  employeeId: string;
}

export interface OrderItemDTO {
  productId: string;
  quantity: number;
}