import { JwtPort } from '../ports/IJwt_port';

export class JWTService{
  constructor(private readonly JwtPort: JwtPort){}

  async generateToken(payload: object): Promise<string> {
    return await this.JwtPort.generateToken(payload);
  }

  async generateRefreshToken(payload: object): Promise<string> {
    return await this.JwtPort.generateRefreshToken(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return await this.JwtPort.verifyToken(token);
  }

  async verifyRefreshToken(token: string): Promise<any> {
    return await this.JwtPort.verifyRefreshToken(token);
  }

} 