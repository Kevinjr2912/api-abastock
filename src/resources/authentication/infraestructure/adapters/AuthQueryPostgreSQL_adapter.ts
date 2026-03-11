import { Postgresql } from "../../../../core/database/PostgreSQL"
import { User } from "../../../users/domain/entities/User"
import { AuthUserDto } from "../../application/dtos/outputs/AuthUser_dto"
import { AuthQueryRepository } from "../../application/ports/IAuthQuery_repository"

export class AuthQueryPostgreSQL implements AuthQueryRepository {

  private readonly conn = Postgresql.getInstance()

  async findByEmail(email: string): Promise<AuthUserDto | null> {
    return this.findByField("email", email)
  }

  async findByPhone(phone: string): Promise<AuthUserDto | null> {
    return this.findByField("phone_number", phone)
  }

  private async findByField(field: "email" | "phone_number", value: string): Promise<AuthUserDto | null> {

    const sql = `
      SELECT
        u.user_id,
        u.first_name,
        u.middle_name,
        u.first_surname,
        u.second_last_name,
        u.phone_number,
        u.email,
        u.password,
        s.store_id,
        s.name AS store_name
      FROM users u
      LEFT JOIN stores s ON s.user_id = u.user_id
      WHERE u.${field} = $1
      LIMIT 1
    `;

    const result = await this.conn.query(sql, [value]);

    if (result.rows.length === 0) return null

    const row = result.rows[0];

    return {
      userId: row.user_id,
      firstName: row.first_name,
      middleName: row.middle_name,
      firstSurname: row.first_surname,
      secondLastName: row.second_last_name,
      phoneNumber: row.phone_number,
      email: row.email,
      password: row.password,
      storeId: row.store_id,
      storeName: row.store_name
    }
  }

  async findById(userId: string): Promise<any> {
    const sql = `
        SELECT 
            u.user_id,
            u.first_name,
            u.middle_name,
            u.first_surname,
            u.second_last_name,
            u.phone_number,
            u.email
        FROM users u
        WHERE u.user_id = $1
    `;
    
    const result = await this.conn.query(sql, [userId]);
    if (result.rowCount === 0) return null;
    return result.rows[0];
  }

  async findRefreshToken(userId: string, tokenHash: string): Promise<{ id: string; revokedAt: Date | null } | null> {
    const sql = `
        SELECT 
            id, revoked_at
        FROM refresh_tokens
        WHERE user_id = $1 
        AND token_hash = $2
        AND expires_at > NOW()
    `;

    const result = await this.conn.query(sql, [userId, tokenHash]);
    if (result.rowCount === 0) return null;

    return {
        id: result.rows[0].id,
        revokedAt: result.rows[0].revoked_at
    };
  }
}