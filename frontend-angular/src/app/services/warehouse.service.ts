import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warehouse, WarehouseDTO } from '../models/warehouse.model';
import { StorageBin, StorageBinDTO } from '../models/storage-bin.model';
import { InventoryBalance } from '../models/inventory-balance.model';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.apiUrl}/warehouses`);
  }

  createWarehouse(dto: WarehouseDTO): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.apiUrl}/warehouses`, dto);
  }

  updateWarehouse(id: string, dto: WarehouseDTO): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.apiUrl}/warehouses/${id}`, dto);
  }

  deleteWarehouse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/warehouses/${id}`);
  }

  getBins(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bins`);
  }

  getBinsByWarehouse(whId: string): Observable<StorageBin[]> {
    return this.http.get<StorageBin[]>(`${this.apiUrl}/warehouses/${whId}/bins`);
  }

  createBin(dto: StorageBinDTO): Observable<StorageBin> {
    return this.http.post<StorageBin>(`${this.apiUrl}/bins`, dto);
  }

  getBinContents(binId: string): Observable<InventoryBalance[]> {
    return this.http.get<InventoryBalance[]>(`${this.apiUrl}/bins/${binId}/contents`);
  }
}