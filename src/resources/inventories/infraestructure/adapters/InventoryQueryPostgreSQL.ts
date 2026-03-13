import { Postgresql } from "../../../../core/database/PostgreSQL";
import { InventoryProductDto } from "../../application/dtos/InventoryProduct_dto";
import { InventoryQueryRepository } from "../../application/ports/IInventory_repository";

export class InventoryQueryPostgreSQL implements InventoryQueryRepository {
  private readonly conn = Postgresql.getInstance();

  async findByBarcode(storeId: string,barcode: string): Promise<InventoryProductDto | null> {
    const sql = `
      SELECT 
        i.inventory_id,
        p.name AS product_name,
        b.name AS brand_name,
        c.name AS category_name,
        pp.image_uri,
        pp.value,
        pp.unit,
        pp.sale_price
      FROM inventory i
      JOIN product_presentations pp ON pp.presentation_id = i.presentation_id
      JOIN products p ON p.product_id = pp.product_id
      JOIN brands b ON b.brand_id = p.brand_id
      JOIN categories c ON c.category_id = p.category_id
      JOIN product_barcodes pb ON pb.presentation_id = pp.presentation_id
      WHERE i.store_id = $1
        AND pb.barcode = $2
        AND pb.is_active = true
      LIMIT 1
    `;
    const result = await this.conn.query(sql, [storeId, barcode]);
    return result.rowCount ? result.rows[0] : null;
  }
}