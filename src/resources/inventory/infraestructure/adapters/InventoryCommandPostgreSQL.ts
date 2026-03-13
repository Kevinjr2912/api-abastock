import { Postgresql } from "../../../../core/database/PostgreSQL";
import { InventoryCommandRepository } from "../../application/domain/repositories/IInventoryCommand_repository";

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
}