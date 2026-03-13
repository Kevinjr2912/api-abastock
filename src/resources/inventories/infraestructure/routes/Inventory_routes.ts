import express from "express";
import { inventoryController } from "../../../dependencies";

export const inventoryRouter = express.Router();

inventoryRouter.get("/scan", inventoryController.scanByBarcode.bind(inventoryController));