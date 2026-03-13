import { Postgresql } from "../../../../core/database/PostgreSQL";
import { Product } from "../../domain/entities/Product";
import { ProductQueryRepository } from "../../application/ports/IProductQuery_repository";
import { BrandDto } from "../../application/dtos/outputs/Brand_dto";
import { CategoryDto } from "../../application/dtos/outputs/Category_dto";

export class ProductQueryPostgreSQL implements ProductQueryRepository {
    private readonly conn = Postgresql.getInstance();

    async findByNameBrandCategory(name: string, brandId: string, categoryId: string): Promise<Product | null> {
        const sql = `
            SELECT product_id, category_id, brand_id, name
            FROM products
            WHERE name = $1 AND brand_id = $2 AND category_id = $3
        `;

        const result = await this.conn.query(sql, [name, brandId, categoryId]);

        if (result.rowCount === 0) return null;

        const row = result.rows[0];
        return new Product(row.product_id, row.category_id, row.brand_id, row.name);
    }

    async findPresentation(productId: string, value: number, unit: string): Promise<boolean> {
        const sql = `
            SELECT EXISTS (
            SELECT 1
            FROM product_presentations
            WHERE product_id = $1
            AND value = $2
            AND unit = $3
            ) as exists
        `;

        const result = await this.conn.query(sql, [productId, value, unit]);

        return result.rows[0].exists;
    }

    async getCategories(): Promise<CategoryDto[]> {
        const sql = `
            SELECT category_id, name
            FROM categories
            ORDER BY name
        `;

        const result = await this.conn.query(sql);

        return result.rows.map(row => ({
            categoryId: row.category_id,
            name: row.name
        }));
    }


    async getBrands(): Promise<BrandDto[]> {
        const sql = `
            SELECT brand_id, name
            FROM brands
            ORDER BY name
        `;

        const result = await this.conn.query(sql);

        return result.rows.map(row => ({
            brandId: row.brand_id,
            name: row.name
        }));
    }
}