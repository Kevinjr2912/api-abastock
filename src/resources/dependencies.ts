import { CommandBus } from "../core/shared/interfaces/bus/CommandBus";
import { QueryBus } from "../core/shared/interfaces/bus/QueryBus";
import { AuthController } from "./authentication/infraestructure/controllers/auth_controller";
import { refreshTokenQueryHandler, signInQueryHandler, signUpCommandHandler } from "./authentication/infraestructure/dependencies";
import { createStoreCommandHandler } from "./stores/infraestructure/dependencies";
import { StoreController } from "./stores/infraestructure/controllers/stores_controller";
import { ProductController } from "./products/infraestructure/controllers/Product_controller";
import { createProductCommandHandler, getBrandsQueryHandler, getCategoriesQueryHandler } from "./products/infraestructure/dependencies";
import { InventoryController } from "./inventories/infraestructure/controllers/Inventory_controller";
import { findProductByBarcodeQueryHandler } from "./inventories/infraestructure/dependencies";
import { createPurchaseCommandHandler } from "./purchases/infraestructure/dependencies";
import { PurchaseController } from "./purchases/infraestructure/controllers/Purchase_controller";

// buses
export const commandBus = new CommandBus();
export const queryBus = new QueryBus()

// Registrar handlers
// commands
commandBus.register("SignUpCommand", signUpCommandHandler);
commandBus.register("CreateStoreCommand", createStoreCommandHandler);
commandBus.register("CreateProductCommand", createProductCommandHandler);
commandBus.register("CreatePurchaseCommand", createPurchaseCommandHandler);

// queries
queryBus.register("SignInQuery", signInQueryHandler);
queryBus.register("RefreshTokenQuery", refreshTokenQueryHandler);
queryBus.register("GetCategoriesQuery", getCategoriesQueryHandler);
queryBus.register("GetBrandsQuery", getBrandsQueryHandler);
queryBus.register("FindProductByBarcodeQuery", findProductByBarcodeQueryHandler);

// Crear controllers con el bus
export const authController = new AuthController(commandBus, queryBus);
export const storeController = new StoreController(commandBus);
export const productController = new ProductController(commandBus, queryBus);
export const inventoryController = new InventoryController(queryBus);
export const purchaseController = new PurchaseController(commandBus);