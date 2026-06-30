import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier, SupplierDTO } from '../models/supplier.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private apiUrl = `${environment.apiUrl}/suppliers`; 

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  createSupplier(dto: SupplierDTO): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, dto);
  }

  updateSupplier(id: string, dto: SupplierDTO): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${id}`, dto);
  }

  deleteSupplier(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}