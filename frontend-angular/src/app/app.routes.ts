import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/products/product-list.component';
import { WarehouseListComponent } from './pages/warehouses/warehouse-list.component';
import { OrderListComponent } from './pages/orders/order-list.component';
import { EmployeeListComponent } from './pages/employees/employee-list.component';
import { SupplierListComponent } from './pages/suppliers/supplier-list.component';
import { InventoryListComponent } from './pages/inventory/inventory-list.component';

export const routes: Routes = [
  { 
    path: 'products', 
    component: ProductListComponent, 
    title: 'WMS - Товары' 
  },
  { path: 'inventory',
     component: InventoryListComponent,
      title: 'WMS - Остатки' },
  { 
    path: 'warehouses', 
    component: WarehouseListComponent, 
    title: 'WMS - Склады' 
  },
  { 
    path: 'orders', 
    component: OrderListComponent, 
    title: 'WMS - Заказы' 
  },
  { 
    path: 'employees', 
    component: EmployeeListComponent, 
    title: 'WMS - Персонал' 
  },
  { 
    path: 'suppliers', 
    component: SupplierListComponent, 
    title: 'WMS - Поставщики' 
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];