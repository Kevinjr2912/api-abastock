import { config } from "../../../core/Config";
import { SignUpCommandHandler } from "../application/commands/handlers/SignUpCommandHandler";
import { RefreshTokenQueryHandler } from "../application/queries/handlers/RefreshTokenQueryHandler";
import { SignInQueryHandler } from "../application/queries/handlers/SignInQueryHandler";
import { BcryptService } from "../application/services/Bcrypt_service";
import { JWTService } from "../application/services/JWT_service";
import { SHA256Service } from "../application/services/SHA256_service";
import { AuthCommandPostgreSQL } from "./adapters/AuthCommandPostgreSQL_adapter";
import { AuthQueryPostgreSQL } from "./adapters/AuthQueryPostgreSQL_adapter";
import { Bcrypt } from "./adapters/Bcrypt_adapter";
import { JWT } from "./adapters/Jwt_adapter";
import { SHA256 } from "./adapters/Sha256_adapter";

// adapters
const bcrypt = new Bcrypt();
const jwt = new JWT(config.SECRET_KEY, config.REFRESH_SECRET);
const sha256 = new SHA256();

const authCommandPostgreSQL = new AuthCommandPostgreSQL();
const authQueryPostgreSQL = new AuthQueryPostgreSQL();
 
// services
const bcryptService = new BcryptService(bcrypt);
const jwtService = new JWTService(jwt);
const sha256Service = new SHA256Service(sha256);

// handlers
export const signUpCommandHandler = new SignUpCommandHandler(
    authCommandPostgreSQL,
    bcryptService
);

export const signInQueryHandler = new SignInQueryHandler(
    authCommandPostgreSQL,
    authQueryPostgreSQL,
    bcryptService,
    sha256Service,
    jwtService,
);

export const refreshTokenQueryHandler = new RefreshTokenQueryHandler(
    authCommandPostgreSQL,
    authQueryPostgreSQL,
    jwtService,
    sha256Service
)
