import { FindProductByBarcodeQueryHandler } from "../application/queries/handlers/FindProductByBarcodeQueryHandler";
import { InventoryCommandPostgreSQL } from "./adapters/InventoryCommandPostgreSQL";
import { InventoryQueryPostgreSQL } from "./adapters/InventoryQueryPostgreSQL";

// adapters
const inventoryQueryPostgtreSQL = new InventoryQueryPostgreSQL();
export const inventoryCommandPostgreSQL = new InventoryCommandPostgreSQL();

// handlers
export const findProductByBarcodeQueryHandler = new FindProductByBarcodeQueryHandler(inventoryQueryPostgtreSQL);