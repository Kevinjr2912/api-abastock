import { NextFunction, Request, Response } from "express";
import { CreatePurchaseCommand } from "../../application/commands/CreatePurchaseCommand";

export class PurchaseController {
    constructor (private readonly commandBus: ICommandBus){}

    // POST /purchases/
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const command = new CreatePurchaseCommand(req.body);
            await this.commandBus.dispatch(command);
            res.status(201).json({ message: "Purchase created successfully" });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}