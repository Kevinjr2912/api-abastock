import { Postgresql } from "../../../../core/database/PostgreSQL";
import { Inventory } from "../../domain/entities/Inventory";
import { InventoryCommandRepository } from "../../domain/repositories/IInventoryCommand_repository";

export class InventoryCommandPostgreSQL implements InventoryCommandRepository {
    private readonly conn = Postgresql.getInstance();

    async addInventory(storeId: string, presentationId: string, currentStock: number, minStockAlert: number): Promise<string> {
        const sql = `
            INSERT INTO inventory (inventory_id, store_id, presentation_id, current_stock, min_stock_alert)
            VALUES (gen_random_uuid(), $1, $2, $3, $4)
            RETURNING inventory_id
        `;
        
        const result = await this.conn.query(sql, [
            storeId,
            presentationId,
            currentStock,
            minStockAlert
        ]);

        return result.rows[0].inventory_id;
    }

    async updateInventory(inventory: Inventory): Promise<void> {
        console.log("Updating inventory:", inventory);
        const sql = `
            UPDATE inventory
            SET current_stock = current_stock + $1
            WHERE inventory_id = $2
        `;
        
        await this.conn.query(sql, [
            inventory.getCurrentStock(),
            inventory.getId()
        ]);
    }
}