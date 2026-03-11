import crypto from 'crypto';
import { HashPort } from '../../application/ports/IHash_port';

export class SHA256 implements HashPort {

    async hash(value: string): Promise<string> {
        return crypto.createHash('sha256').update(value).digest('hex');
    }

    async compare(value: string, hashed: string): Promise<boolean> {
        return this.hash(value).then(h => h === hashed);
    }
}