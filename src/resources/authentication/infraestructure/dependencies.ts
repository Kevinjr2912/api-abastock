import { config } from "../../../core/Config";
import { SignUpCommandHandler } from "../application/commands/handlers/SignUpCommandHandler";
import { SignInQueryHandler } from "../application/queries/handlers/SignInQueryHandler";
import { BcryptService } from "../application/services/Bcrypt_service";
import { JWTService } from "../application/services/JWT_service";
import { AuthCommandPostgreSQL } from "./adapters/AuthCommandPostgreSQL_adapter";
import { AuthQueryPostgreSQL } from "./adapters/AuthQueryPostgreSQL_adapter";
import { Bcrypt } from "./adapters/Bcrypt_adapter";
import { JWT } from "./adapters/Jwt_adapter";

// adapters
const bcrypt = new Bcrypt();
const jwt = new JWT(config.SECRET_KEY);
const authWritePostgreSQL = new AuthCommandPostgreSQL();
const authReadPosgreSQL = new AuthQueryPostgreSQL();
 
// services
const bcryptService = new BcryptService(bcrypt);
const jwtService = new JWTService(jwt);

// handlers
export const signUpCommandHandler = new SignUpCommandHandler(
    authWritePostgreSQL,
    bcryptService
);

export const signInQueryHandler = new SignInQueryHandler(
    authReadPosgreSQL,
    bcryptService,
    jwtService,
);
