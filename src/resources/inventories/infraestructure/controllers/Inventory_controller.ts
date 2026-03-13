import { Request, Response, NextFunction } from "express";
import { FindProductByBarcodeQuery } from "../../application/queries/FindProductByBarcodeQuery";

export class InventoryController {
  constructor(private readonly queryBus: IQueryBus) {}

  // GET /inventories/scan?storeId=xxx&barcode=yyy
  async scanByBarcode(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, barcode } = req.query;

      if (!storeId || !barcode) {
        return res.status(400).json({ error: "storeId and barcode are required" });
      }

      const query = new FindProductByBarcodeQuery(storeId as string, barcode as string);
      const product = await this.queryBus.ask(query);

      if (!product) return res.status(404).json({ message: "Product not found in this store" });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}