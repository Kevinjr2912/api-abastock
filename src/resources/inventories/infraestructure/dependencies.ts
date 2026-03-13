import { FindProductByBarcodeQueryHandler } from "../application/queries/handlers/FindProductByBarcodeQueryHandler";
import { InventoryCommandPostgreSQL } from "./adapters/InventoryCommandPostgreSQL";
import { InventoryQueryPostgreSQL } from "./adapters/InventoryQueryPostgreSQL";

// adapters
const inventoryQueryPostgreSQL = new InventoryQueryPostgreSQL();
export const inventoryCommandPostgreSQL = new InventoryCommandPostgreSQL();
export { inventoryQueryPostgreSQL };

// handlers
export const findProductByBarcodeQueryHandler = new FindProductByBarcodeQueryHandler(inventoryQueryPostgreSQL);