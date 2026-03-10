import { AuthUserDto } from "../dtos/outputs/AuthUser_dto"

export interface AuthQueryRepository {
  findByEmail(email: string): Promise<AuthUserDto | null>
  findByPhone(phone: string): Promise<AuthUserDto | null>
}