import bcrypt from "bcrypt";
import { HashPort } from "../../application/ports/IHash_port";
import { config } from "../../../../core/configs/Config";

export class Bcrypt implements HashPort {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(Number(config.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword)
    }
}