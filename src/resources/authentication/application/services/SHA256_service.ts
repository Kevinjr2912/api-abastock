import { HashPort } from "../ports/IHash_port";

export class SHA256Service {
    constructor(private readonly hashPort: HashPort) {}

    async hash(value: string): Promise<string> {
        return this.hashPort.hash(value);
    }

    async compare(value: string, hashed: string): Promise<boolean> {
        return this.hashPort.compare(value, hashed);
    }
}