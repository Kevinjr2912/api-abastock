import { UnauthorizedUserError } from "../../../../../core/shared/errors/UnauthorizedUser_error";
import { AuthCommandRepository } from "../../../domain/repositories/IAuthCommand_repository";
import { JWTService } from "../../services/JWT_service";
import { SHA256Service } from "../../services/SHA256_service";
import { AuthQueryRepository } from '../../ports/IAuthQuery_repository';
import { RefreshTokenQuery } from "../RefreshTokenQuery";

export class RefreshTokenQueryHandler {

    constructor(
        private readonly authCommandRepository: AuthCommandRepository,
        private readonly authQueryRepository: AuthQueryRepository,
        private readonly jwtService: JWTService,
        private readonly sha256: SHA256Service
    ) {}

    async handle(query: RefreshTokenQuery): Promise<{ accessToken: string; newRefreshToken: string }> {
        const payload = await this.verifyToken(query.refreshToken);
        const stored = await this.validateStoredToken(payload.userId, query.refreshToken);
        await this.rotateToken(stored.id, payload.userId);
        const newRefreshToken = await this.issueNewRefreshToken(payload.userId);
        const accessToken = await this.issueAccessToken(payload.userId);
        return { accessToken, newRefreshToken };
    }

    private async verifyToken(refreshToken: string) {
        return this.jwtService.verifyRefreshToken(refreshToken)
            .catch((err) => { throw new UnauthorizedUserError("Invalid token") });
    }

    private async validateStoredToken(userId: string, refreshToken: string) {
        const tokenHash = await this.sha256.hash(refreshToken);
        const stored = await this.authQueryRepository.findRefreshToken(userId, tokenHash);

        if (!stored) throw new UnauthorizedUserError("Invalid token");
        if (stored.revokedAt) {
            await this.authCommandRepository.revokeAllUserTokens(userId);
            throw new UnauthorizedUserError("Token reuse detected");
        }

        return stored;
    }

    private async rotateToken(tokenId: string, userId: string) {
        await this.authCommandRepository.revokeRefreshToken(tokenId);
    } 

    private async issueNewRefreshToken(userId: string): Promise<string> {
        const newRefreshToken = await this.jwtService.generateRefreshToken({ userId });
        const newHash = await this.sha256.hash(newRefreshToken);
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await this.authCommandRepository.saveRefreshToken(userId, newHash, expiresAt);
        return newRefreshToken;
    }

    private async issueAccessToken(userId: string): Promise<string> {
        const user = await this.authQueryRepository.findById(userId);
        return this.jwtService.generateToken({ ...user });
    }
}