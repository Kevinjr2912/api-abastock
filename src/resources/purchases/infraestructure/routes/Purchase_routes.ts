import express from 'express';
import { purchaseController } from '../../../dependencies';

export const purchaseRouter = express.Router();

purchaseRouter.post("/", purchaseController.create.bind(purchaseController));