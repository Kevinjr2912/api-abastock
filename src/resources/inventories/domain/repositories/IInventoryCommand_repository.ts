import { Inventory } from "../entities/Inventory";

export interface InventoryCommandRepository {
    addInventory(storeId: string, presentationId: string, currentStock: number, minStockAlert: number): Promise<string>;
    updateInventory(inventory: Inventory): Promise<void>;
}