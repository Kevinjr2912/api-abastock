import { FindProductByBarcodeQueryHandler } from "../application/queries/handlers/FindProductByBarcodeQueryHandler";
import { ListInventoryProductsQueryHandler } from "../application/queries/handlers/ListInventoryProductsQueryHandler";
import { InventoryCommandPostgreSQL } from "./adapters/InventoryCommandPostgreSQL";
import { InventoryQueryPostgreSQL } from "./adapters/InventoryQueryPostgreSQL";

// adapters
const inventoryQueryPostgreSQL = new InventoryQueryPostgreSQL();
export const inventoryCommandPostgreSQL = new InventoryCommandPostgreSQL();
export { inventoryQueryPostgreSQL };

// handlers
export const findProductByBarcodeQueryHandler = new FindProductByBarcodeQueryHandler(inventoryQueryPostgreSQL);
export const listInventoryProductsQueryHandler = new ListInventoryProductsQueryHandler(inventoryQueryPostgreSQL);