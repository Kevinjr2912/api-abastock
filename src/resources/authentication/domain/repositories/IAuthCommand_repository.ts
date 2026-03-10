import { User } from "../../../users/domain/entities/User";

export interface AuthCommandRepository {
    save(user: User): Promise<void>;
    existsByEmail(email: string): Promise<boolean>;
}