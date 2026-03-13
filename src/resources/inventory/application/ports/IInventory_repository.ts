import { InventoryProductDto } from "../dtos/InventoryProduct_dto";

export interface InventoryQueryRepository {
  findByBarcode(storeId: string, barcode: string): Promise<InventoryProductDto | null>;
}