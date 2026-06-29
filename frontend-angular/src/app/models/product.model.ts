import { Category } from './category.model';
import { Supplier } from './supplier.model';

export type { Category, Supplier }; 

export interface Product {
  id: string;
  sku: string;
  name: string;
  unitPrice: number;
  category?: Category;
  supplier?: Supplier;
}

export interface ProductDTO {
  sku: string;
  name: string;
  unitPrice: number;
  categoryId: string;
  supplierId: string;
}