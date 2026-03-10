import { NextFunction, Request, Response } from "express";
import { ExistingEmailError } from "../errors/ExistingEmail_error";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof ExistingEmailError) {
        res.status(409).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: "Internal server error" });
}