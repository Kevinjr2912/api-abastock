export interface InventoryCommandRepository {
    addInventory(storeId: string, presentationId: string, currentStock: number, minStockAlert: number): Promise<string>;
}