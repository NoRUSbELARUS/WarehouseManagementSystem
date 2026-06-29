import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductDTO } from '../models/product.model';
import { Category } from '../models/category.model';
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  createProduct(dto: ProductDTO): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  updateProduct(id: string, dto: ProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}