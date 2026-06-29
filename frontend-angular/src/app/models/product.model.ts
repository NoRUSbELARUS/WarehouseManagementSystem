export interface Category { id: string; name: string; }
export interface Supplier { id: string; name: string; }

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