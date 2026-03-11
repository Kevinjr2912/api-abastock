import { CreateStoreCommandHandler } from "../application/commands/handlers/CreateStoreCommandHandler";
import { StoreCommandPostgreSQL } from "./adapters/StoreCommandPostgreSQL_adapter";

// Adapters
const storeCommandPostgreSQL = new StoreCommandPostgreSQL();

// Handlers
export const createStoreCommandHandler = new CreateStoreCommandHandler(
    storeCommandPostgreSQL
);
