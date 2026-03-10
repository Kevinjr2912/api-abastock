import express from 'express'
import { authController } from '../../../dependencies';

export const authRouter = express.Router();

authRouter.post("/sign-up", authController.signUp.bind(authController));
authRouter.post("/sign-in", authController.signIn.bind(authController));