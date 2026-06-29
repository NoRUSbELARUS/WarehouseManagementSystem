import { Product } from './product.model';
import { StorageBin } from './storage-bin.model';

export interface InventoryBalance {
  id: string;
  product: Product;
  storageBin: StorageBin;
  quantity: number;
}

export interface InventoryBalanceDTO {
  productId: string;
  binId: string;
  quantity: number;
}