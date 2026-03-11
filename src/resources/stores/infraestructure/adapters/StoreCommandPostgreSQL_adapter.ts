import { Postgresql } from "../../../../core/database/PostgreSQL";
import { Store } from "../../domain/entities/Store";
import { IStoreCommandRepository } from "../../domain/repositories/IStoreCommand_repository";

export class StoreCommandPostgreSQL implements IStoreCommandRepository {
    private readonly conn = Postgresql.getInstance();

    async save(store: Store): Promise<void> {
        const sql = `
            INSERT INTO stores (
                store_id,
                user_id,
                name
            )
            VALUES ($1, $2, $3)
        `;

        const params = [
            store.getId(),
            store.getUserId(),
            store.getName()
        ];

        const result = await this.conn.query(sql, params);

        if (result.rowCount === 0) throw new Error("Error inserting store");
    }

    async existsByName(userId: string, name: string): Promise<boolean> {
        const sql = "SELECT EXISTS (SELECT 1 FROM stores WHERE user_id = $1 AND name = $2)";
        const result = await this.conn.query(sql, [userId, name]);
        return result.rows[0].exists;
    }
}
