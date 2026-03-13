import { InventoryProductDto } from "../dtos/outputs/InventoryProduct_dto";

export interface InventoryQueryRepository {
  findByBarcode(storeId: string, barcode: string): Promise<InventoryProductDto | null>;
  findByStore(storeId: string): Promise<InventoryProductDto[]>;
  findInventoryByStoreAndPresentation(storeId: string, presentationId: string): Promise<{inventoryId: string, currentStock: number, minStockAlert: number} | null>;
}