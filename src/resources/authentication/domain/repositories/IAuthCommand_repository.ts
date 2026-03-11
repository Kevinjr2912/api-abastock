import { User } from "../../../users/domain/entities/User";

export interface AuthCommandRepository {
    save(user: User): Promise<void>;
    existsByEmail(email: string): Promise<boolean>;
    saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>;
    revokeRefreshToken(id: string): Promise<void>;
    revokeAllUserTokens(userId: string): Promise<void>; 
}