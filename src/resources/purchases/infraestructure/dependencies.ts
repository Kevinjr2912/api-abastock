import { PurchaseCommandPostgreSQL } from "./adapters/PurchaseCommandPostgreSQL_adapter";
import { CreatePurchaseCommandHandler } from "../application/commands/handlers/CreatePurchaseCommandHandler";
import { inventoryCommandPostgreSQL } from "../../inventories/infraestructure/dependencies";
import { productCommandPostgreSQL } from "../../products/infraestructure/dependencies";

// adapters
export const purchaseCommandPostgreSQL = new PurchaseCommandPostgreSQL();

// handlers
export const createPurchaseCommandHandler = new CreatePurchaseCommandHandler(
    purchaseCommandPostgreSQL,
    productCommandPostgreSQL,
    inventoryCommandPostgreSQL
);