import { JwtPort } from "../../application/ports/IJwt_port";
import jwt from 'jsonwebtoken';

export class JWT implements JwtPort {

  constructor(private jwtSecret: string) {}

  async generateToken(payload: object): Promise<string> {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "2h" });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecret);
  }

}