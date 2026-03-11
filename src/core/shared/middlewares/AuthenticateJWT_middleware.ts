import { NextFunction, Request, Response } from "express";
import { JWTService } from "../../../resources/authentication/application/services/JWT_service";

export const authenticateJWT = (authService: JWTService) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      await authService.verifyToken(token);
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

  }
}