import { UnauthorizedUserError } from "../../../../../core/shared/errors/UnauthorizedUser_error";
import { BcryptService } from "../../services/Bcrypt_service";
import { JWTService } from "../../services/JWT_service";
import { AuthQueryRepository } from "../../ports/IAuthQuery_repository";
import { SignInQuery } from "../SignInQuery";

export class SignInQueryHandler implements IQueryHandler<SignInQuery, string> {

    constructor(
        private readonly authRepository: AuthQueryRepository,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JWTService
    ) {}

    async handle(command: SignInQuery): Promise<string> {
        const { field, value } = this.resolveCredentials(command);
        const user = await this.findUser(field, value);
        await this.validatePassword(command.payload.password, user.password);
        return this.generateToken(user);
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
                ? await this.authRepository.findByEmail(value)
                : await this.authRepository.findByPhone(value)

        if (!user) throw new UnauthorizedUserError("Invalid credentials")

        return user
    }

    private async validatePassword(password: string, hashed: string) {

        const isValid = await this.bcryptService.comparePassword(password, hashed)

        if (!isValid) throw new UnauthorizedUserError("Invalid credentials")
    }

    private generateToken(user: any) {
        return this.jwtService.generateToken({
            userId: user.userId,
            email: user.email,
            name: `${user.firstName} ${user.firstSurname}`,
            storeId: user.storeId,
            storeName: user.storeName
        })
    }
}