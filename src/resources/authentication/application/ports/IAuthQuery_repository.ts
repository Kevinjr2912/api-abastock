import { User } from "../../../users/domain/entities/User"
import { AuthUserDto } from "../dtos/outputs/AuthUser_dto"

export interface AuthQueryRepository {
  findByEmail(email: string): Promise<AuthUserDto | null>
  findByPhone(phone: string): Promise<AuthUserDto | null>
  findById(id: string): Promise<User | null>
  findRefreshToken(userId: string, tokenHash: string): Promise<{ id: string; revokedAt: Date | null } | null>
}