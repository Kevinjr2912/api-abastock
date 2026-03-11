import { NextFunction, Request, Response } from "express";
import { SignUpCommand } from "../../application/commands/SignUpCommand";
import { SignInQuery } from "../../application/queries/SignInQuery";
import { RefreshTokenQuery } from "../../application/queries/RefreshTokenQuery";

export class AuthController {
    constructor (
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    // Post /auth/sign-up
    async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("Hola desde registro", req.body)
            const command = new SignUpCommand(req.body);
            await this.commandBus.dispatch(command);
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            next(error);
        }
    }

    // Post /auth/sign-in
    async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("Hola desde login", req.body);
            const query = new SignInQuery(req.body);
            const token = await this.queryBus.ask(query);
            res.status(200).json({ "Token": token });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    // POST /auth/refresh-token
    async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("Hola desde refresh")
            const { refreshToken } = req.body;

            if (!refreshToken) {
                res.status(401).json({ error: "Refresh token not provided" });
                return;
            }

            const query = new RefreshTokenQuery(refreshToken);
            const tokens = await this.queryBus.ask(query);
            res.status(200).json(tokens);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

}