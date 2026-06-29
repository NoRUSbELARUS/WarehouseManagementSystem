import { Warehouse } from './warehouse.model';

export interface StorageBin {
  id: string;
  binCode: string;
  zone: string;
  warehouse?: Warehouse;
}

export interface StorageBinDTO {
  binCode: string;
  zone: string;
  warehouseId: string;
}