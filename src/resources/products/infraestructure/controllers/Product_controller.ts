import { NextFunction, Request, Response } from "express";
import { upload } from "../../../../core/shared/middlewares/Multer_middleware";
import { CreateProductCommand } from "../../application/commands/CreateProductCommand";

export class ProductController {
    constructor(private readonly commandBus: ICommandBus) {}

    // POST /products
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        upload(req, res, async (err) => {
            if (err) {
                return next(err);
            }

            try {
                if (!req.file) {
                    res.status(400).json({ error: "No file uploaded" });
                    return;
                }

                const data = JSON.parse(req.body.data);
                const command = new CreateProductCommand(data, req.file.path);

                await this.commandBus.dispatch(command);

                res.status(201).json({ message: "Product created successfully" });

            } catch (error) {
                console.log(error)
                next(error);
            }
        });
    }
}