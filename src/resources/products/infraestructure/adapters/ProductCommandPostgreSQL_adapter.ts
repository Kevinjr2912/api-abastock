import { Postgresql } from "../../../../core/database/PostgreSQL";
import { Product } from "../../domain/entities/Product";
import { ProductPresentation } from "../../domain/entities/ProductPresentation";
import { ProductCommandRepository } from "../../domain/repositories/IProductCommand_repository";

export class ProductCommandPostgreSQL implements ProductCommandRepository {
    private readonly conn = Postgresql.getInstance();

    async save(product: Product): Promise<void> {
        const client = await this.conn.getClient();

        try {
            await client.query("BEGIN");
            await this.insertProduct(client, product);
            await this.insertPresentations(client, product);
            await client.query("COMMIT");
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    async addPresentation(productId: string, pres: ProductPresentation) {
        const client = await this.conn.getClient();
        try {
            await client.query("BEGIN");
            await this.insertPresentation(client, pres, productId);
            await client.query("COMMIT");
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    private async insertProduct(client: any, product: Product) {
        const sql = `
            INSERT INTO products 
                (product_id, category_id, brand_id, name)
            VALUES ($1, $2, $3, $4)
        `;
        await client.query(sql, [
            product.getId(),
            product.categoryId,
            product.brandId,
            product.name
        ]);
    }

    private async insertPresentations(client: any, product: Product) {
        for (const pres of product.getPresentations()) {
            await this.insertPresentation(client, pres, product.getId());
        }
    }

    private async insertPresentation(client: any, pres: ProductPresentation, productId: string) {
        const sql = `
            INSERT INTO 
                product_presentations (presentation_id, product_id, image_uri, value, unit, sale_price)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await client.query(sql, [
            pres.getId(),
            productId,
            pres.imageUri,
            pres.value,
            pres.unit,
            pres.salePrice
        ]);

        await this.insertBarcodes(client, pres);
    }

    private async insertBarcodes(client: any, pres: ProductPresentation) {
        for (const barcode of pres.getBarcodes()) {
            const sql = `
                INSERT INTO 
                    product_barcodes (product_barcode_id, presentation_id, barcode, is_active)
                VALUES ($1, $2, $3, $4)
            `;
            await client.query(sql, [
                barcode.getId(),
                pres.getId(),
                barcode.barcode,
                barcode.isActive
            ]);
        }
    }
}