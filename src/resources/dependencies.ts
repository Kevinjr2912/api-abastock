import { CommandBus } from "../core/shared/interfaces/bus/CommandBus";
import { QueryBus } from "../core/shared/interfaces/bus/QueryBus";
import { AuthController } from "./authentication/infraestructure/controllers/auth_controller";
import { refreshTokenQueryHandler, signInQueryHandler, signUpCommandHandler } from "./authentication/infraestructure/dependencies";

// buses
export const commandBus = new CommandBus();
export const queryBus = new QueryBus()

// Registrar handlers
// commands
commandBus.register("SignUpCommand", signUpCommandHandler);

// queries
queryBus.register("SignInQuery", signInQueryHandler);
queryBus.register("RefreshTokenQuery", refreshTokenQueryHandler);

// Crear controllers con el bus
export const authController = new AuthController(commandBus, queryBus);