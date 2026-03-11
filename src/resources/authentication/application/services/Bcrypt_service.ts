import { HashPort } from "../ports/IHash_port";

export class BcryptService {
  constructor(private readonly hashPort: HashPort) {}

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return this.hashPort.compare(plainPassword, hashedPassword);
  }

  async hashPassword(plainPassword: string): Promise<string> {
    return this.hashPort.hash(plainPassword);
  }
}