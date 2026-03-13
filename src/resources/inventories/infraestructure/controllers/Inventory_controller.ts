import { Request, Response, NextFunction } from "express";
import { FindProductByBarcodeQuery } from "../../application/queries/FindProductByBarcodeQuery";
import { ListInventoryProductsQuery } from "../../application/queries/ListInventoryProductsQuery";

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
      console.log(error)
      next(error);
    }
  }

  // GET /inventories?storeId=xxx
  async listByStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.query;

      if (!storeId) {
        return res.status(400).json({ error: "storeId is required" });
      }

      const query = new ListInventoryProductsQuery(storeId as string);
      const products = await this.queryBus.ask(query);

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}