import { CommandBus } from "../core/shared/interfaces/bus/CommandBus";
import { QueryBus } from "../core/shared/interfaces/bus/QueryBus";
import { AuthController } from "./authentication/infraestructure/controllers/auth_controller";
import { refreshTokenQueryHandler, signInQueryHandler, signUpCommandHandler } from "./authentication/infraestructure/dependencies";
import { createStoreCommandHandler } from "./stores/infraestructure/dependencies";
import { StoreController } from "./stores/infraestructure/controllers/stores_controller";
import { ProductController } from "./products/infraestructure/controllers/Product_controller";
import { createProductCommandHandler } from "./products/infraestructure/dependencies";

// buses
export const commandBus = new CommandBus();
export const queryBus = new QueryBus()

// Registrar handlers
// commands
commandBus.register("SignUpCommand", signUpCommandHandler);
commandBus.register("CreateStoreCommand", createStoreCommandHandler);
commandBus.register("CreateProductCommand", createProductCommandHandler);

// queries
queryBus.register("SignInQuery", signInQueryHandler);
queryBus.register("RefreshTokenQuery", refreshTokenQueryHandler);

// Crear controllers con el bus
export const authController = new AuthController(commandBus, queryBus);
export const storeController = new StoreController(commandBus);
export const productController = new ProductController(commandBus);