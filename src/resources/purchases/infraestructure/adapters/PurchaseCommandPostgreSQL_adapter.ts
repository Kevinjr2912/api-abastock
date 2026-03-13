
import { Postgresql } from "../../../../core/database/PostgreSQL";
import { Purchase } from "../../domain/entities/Purchase";

export class PurchaseCommandPostgreSQL {
    private readonly conn = Postgresql.getInstance();

    async createPurchase(purchase: Purchase): Promise<void> {
        const client = await this.conn.getClient();

        const purchaseSql = `
            INSERT INTO 
                purchases (purchase_id, store_id, purchase_date, total_cost)
            VALUES ($1,$2,$3,$4)
        `;

        await client.query(purchaseSql, [
            purchase.getId(),
            purchase.getStoreId(),
            purchase.getPurchaseDate(),
            purchase.getTotalCost()
        ]);

        const itemSql = `
            INSERT INTO 
                purchase_items 
                    (purchase_item_id, 
                    purchase_id, 
                    presentation_id, 
                    quantity, 
                    cost_price)
            VALUES ($1,$2,$3,$4,$5)
        `;

        for (const item of purchase.getPurchaseItems()) {

            await client.query(itemSql, [
                item.getId(),
                purchase.getId(),
                item.getPresentationId(),
                item.getQuantity(),
                item.getCostPrice()
            ]);
        }
    }
}