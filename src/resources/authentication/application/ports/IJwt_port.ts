export interface JwtPort {
  generateToken(payload: object): Promise<string>;
  generateRefreshToken(payload: object): Promise<string>;
  verifyToken(token: string): Promise<any>;
  verifyRefreshToken(token: string): Promise<any>;
}