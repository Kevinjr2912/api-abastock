import { JwtPort } from "../../application/ports/IJwt_port";
import jwt, { SignOptions } from 'jsonwebtoken';

export class JWT implements JwtPort {
  constructor(
    private jwtSecret: string,
    private refreshSecret: string
  ) {}

  async generateToken(payload: object, expiresIn: SignOptions['expiresIn'] = "0.5h"): Promise<string> {
    return jwt.sign(payload, this.jwtSecret, { expiresIn });
  }

  async generateRefreshToken(payload: object): Promise<string> {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "30d" });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecret);
  }

  async verifyRefreshToken(token: string): Promise<any> {
    return jwt.verify(token, this.refreshSecret);
  }
}