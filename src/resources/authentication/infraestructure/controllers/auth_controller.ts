import { NextFunction, Request, Response } from "express";
import { SignUpCommand } from "../../application/commands/SignUpCommand";
import { SignInQuery } from "../../application/queries/SignInQuery";

export class AuthController {
    constructor (
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    // Post /auth/sign-up
    async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
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
            const query = new SignInQuery(req.body);
            const token = await this.queryBus.ask(query);
            res.status(200).json({ "Token": token });
        } catch (error) {
            next(error);
        }
    }

}