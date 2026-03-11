import { NextFunction, Request, Response } from "express";
import { CreateStoreCommand } from "../../application/commands/CreateStoreCommand";

export class StoreController {
    constructor(
        private readonly commandBus: ICommandBus
    ) {}

    // POST /stores
    async createStore(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const command = new CreateStoreCommand(req.body);
            await this.commandBus.dispatch(command);
            res.status(201).json({ message: "Store created successfully" });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}
