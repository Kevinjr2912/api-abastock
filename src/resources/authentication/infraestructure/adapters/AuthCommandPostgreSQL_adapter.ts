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
}