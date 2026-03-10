export interface JwtPort {
  generateToken(payload: object): Promise<string>;
  verifyToken(token: string): Promise<any>;
}