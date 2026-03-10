import bcrypt from "bcrypt";
import { BcryptPort } from "../../application/ports/IBcrypt_port";
import { config } from "../../../../core/Config";

export class Bcrypt implements BcryptPort {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(Number(config.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword)
    }
}