import { Postgresql } from "../../../../core/database/PostgreSQL";
import { User } from "../../../users/domain/entities/User";
import { AuthCommandRepository } from "../../domain/repositories/IAuthCommand_repository";

export class AuthCommandPostgreSQL implements AuthCommandRepository {
    private readonly conn = Postgresql.getInstance();

    async save(user: User): Promise<void> {

        const sql = `
            INSERT INTO users (
                user_id,
                first_name,
                middle_name,
                first_surname,
                second_last_name,
                phone_number,
                email,
                password
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        const params = [
            user.getId(),
            user.getFirstName(),
            user.getMiddleName(),
            user.getFirstSurname(),
            user.getSecondLastName(),
            user.getPhoneNumber(),
            user.getEmail(),
            user.getPassword()
        ];

        const result = await this.conn.query(sql, params);

        if (result.rowCount === 0) throw new Error("Error inserting user");

    }

    async existsByEmail(email: string): Promise<boolean> {
        const sql = "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)";
        const result = await this.conn.query(sql, [email]);
        return result.rows[0].exists;
    }

    async saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
        const sql = `
            INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
            VALUES ($1, $2, $3)
        `;
        await this.conn.query(sql, [userId, tokenHash, expiresAt]);
    }

    async revokeRefreshToken(id: string): Promise<void> {
        const sql = `UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = $1`;
        await this.conn.query(sql, [id]);
    }

    async revokeAllUserTokens(userId: string): Promise<void> {
        const sql = `UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = $1 AND revoked_at IS NULL`;
        await this.conn.query(sql, [userId]);
    }
    
}