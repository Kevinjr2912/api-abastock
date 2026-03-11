import express from "express";
import { storeController } from "../../../dependencies";

export const storesRouter = express.Router();

storesRouter.post("/", storeController.createStore.bind(storeController));