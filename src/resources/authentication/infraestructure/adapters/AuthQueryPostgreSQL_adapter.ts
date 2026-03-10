import { Postgresql } from "../../../../core/database/PostgreSQL"
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
}