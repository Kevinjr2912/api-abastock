import { NextFunction, Request, Response } from "express";
import { ExistingEmailError } from "../errors/ExistingEmail_error";
import multer from "multer";
import { ExistingStoreError } from "../errors/ExistingStore_error";
import { ExistingProductPresentationError } from "../../../resources/products/domain/errors/ExistingProductPresentation_error";
import { InventoryNotFoundError } from "../../../resources/purchases/domain/errors/InventoryNotFound_error";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {

    if (error instanceof ExistingEmailError) {
        res.status(409).json({ message: error.message });
        return;
    }

    if (error instanceof ExistingStoreError) {
        res.status(409).json({ message: error.message });
        return;
    }

    if (error instanceof ExistingProductPresentationError) {
        res.status(409).json({ message: error.message });
        return;
    }

    if (error instanceof multer.MulterError) {
        res.status(400).json({ message: error.message });
        return;
    }

    if (error instanceof InventoryNotFoundError) {
        res.status(404).json({ message: error.message });
        return;
    }

    res.status(500).json({ message: "Internal server error" });
}