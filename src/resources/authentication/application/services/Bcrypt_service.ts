import { BcryptPort } from "../ports/IBcrypt_port";

export class BcryptService {
  constructor(private readonly bcryptPort: BcryptPort) {}

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return this.bcryptPort.compare(plainPassword, hashedPassword);
  }

  async hashPassword(plainPassword: string): Promise<string> {
    return this.bcryptPort.hash(plainPassword);
  }
}