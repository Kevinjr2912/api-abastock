import { UnauthorizedUserError } from "../../../../../core/shared/errors/UnauthorizedUser_error";
import { BcryptService } from "../../services/Bcrypt_service";
import { JWTService } from "../../services/JWT_service";
import { AuthQueryRepository } from "../../ports/IAuthQuery_repository";
import { SignInQuery } from "../SignInQuery";
import { AuthCommandRepository } from "../../../domain/repositories/IAuthCommand_repository";
import { SHA256Service } from "../../services/SHA256_service";

export class SignInQueryHandler implements IQueryHandler<SignInQuery, { accessToken: string; refreshToken: string }> {

    constructor(
        private readonly authCommandRepository: AuthCommandRepository,
        private readonly authQueryRepository: AuthQueryRepository,
        private readonly bcryptService: BcryptService,
        private readonly sha256Service: SHA256Service,
        private readonly jwtService: JWTService
    ) {}

    async handle(command: SignInQuery): Promise<{ accessToken: string; refreshToken: string }> {
        const { field, value } = this.resolveCredentials(command);
        const user = await this.findUser(field, value);
        await this.validatePassword(command.payload.password, user.password);
        return this.generateTokens(user);
    }


    private resolveCredentials(command: SignInQuery) {
        if (command.payload.email) {
            return { field: 'email' as const, value: command.payload.email };
        }

        if (command.payload.phoneNumber) {
            return { field: 'phone_number' as const, value: command.payload.phoneNumber };
        }

        throw new Error("Email or phone number required");
    }

    private async findUser(field: 'email' | 'phone_number', value: string) {
        const user =
            field === "email"
                ? await this.authQueryRepository.findByEmail(value)
                : await this.authQueryRepository.findByPhone(value)

        if (!user) throw new UnauthorizedUserError("Invalid credentials")

        return user
    }

    private async validatePassword(password: string, hashed: string) {
        const isValid = await this.bcryptService.comparePassword(password, hashed)
        if (!isValid) throw new UnauthorizedUserError("Invalid credentials")
    }

     private async generateTokens(user: any) {
        const payload = {
            userId: user.userId,
            email: user.email,
            name: `${user.firstName} ${user.firstSurname}`,
            storeId: user.storeId,
            storeName: user.storeName
        };

        const accessToken = await this.jwtService.generateToken(payload);
        const refreshToken = await this.jwtService.generateRefreshToken({ userId: user.userId });

        // Hashear antes de guardar
        const tokenHash = await this.sha256Service.hash(refreshToken);
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await this.authCommandRepository.saveRefreshToken(user.userId, tokenHash, expiresAt);

        return { accessToken, refreshToken };
    }
}